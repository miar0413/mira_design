'use client';

import { useEffect, useRef } from 'react';
import {
  Color,
  FrontSide,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from 'three';

type GradientPalette = {
  a: string;
  b: string;
  c: string;
  d: string;
};

type FullscreenGradientBackgroundProps = {
  className?: string;
  heroPalette: GradientPalette;
  projectPalette: GradientPalette;
  transitionProgress: number;
  activeSeed: number;
  reducedMotion?: boolean;
};

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const classic2d = `
vec2 fade(vec2 t){return t*t*t*(t*(t*6.0-15.0)+10.0);}
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}

float cnoise2(vec2 P){
  vec4 Pi=floor(P.xyxy)+vec4(0.0,0.0,1.0,1.0);
  vec4 Pf=fract(P.xyxy)-vec4(0.0,0.0,1.0,1.0);
  Pi=mod(Pi,289.0);
  vec4 ix=Pi.xzxz;
  vec4 iy=Pi.yyww;
  vec4 fx=Pf.xzxz;
  vec4 fy=Pf.yyww;
  vec4 i=permute(permute(ix)+iy);
  vec4 gx=2.0*fract(i*0.0243902439)-1.0;
  vec4 gy=abs(gx)-0.5;
  vec4 tx=floor(gx+0.5);
  gx=gx-tx;
  vec2 g00=vec2(gx.x,gy.x);
  vec2 g10=vec2(gx.y,gy.y);
  vec2 g01=vec2(gx.z,gy.z);
  vec2 g11=vec2(gx.w,gy.w);
  vec4 norm=1.79284291400159-0.85373472095314*vec4(dot(g00,g00),dot(g01,g01),dot(g10,g10),dot(g11,g11));
  g00*=norm.x;
  g01*=norm.y;
  g10*=norm.z;
  g11*=norm.w;
  float n00=dot(g00,vec2(fx.x,fy.x));
  float n10=dot(g10,vec2(fx.y,fy.y));
  float n01=dot(g01,vec2(fx.z,fy.z));
  float n11=dot(g11,vec2(fx.w,fy.w));
  vec2 fadeXY=fade(Pf.xy);
  vec2 nX=mix(vec2(n00,n01),vec2(n10,n11),fadeXY.x);
  float nXY=mix(nX.x,nX.y,fadeXY.y);
  return 2.3*nXY;
}
`;

// Faithful port of the monopo.london background shader, mirroring
// gotohiroki/three-monopo-london's reference fragment.glsl: three
// perlin samples bilinearly mixed by the cursor drive a sin-based
// "lines" pattern that produces monopo's signature flowing ribbons.
// The only additions on top are uSeed (for per-project pattern
// reshuffles) and uScrollProgress (for slow vertical drift between
// the hero and the recent-work slots).
const fragmentShader = `
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColorAccent;
uniform vec2 uPlaneRes;
uniform vec2 uMouse2D;
uniform float uLinesBlur;
uniform float uNoise;
uniform float uOffsetX;
uniform float uOffsetY;
uniform float uLinesAmount;
uniform float uBackgroundScale;
uniform float uTime;
uniform float uSeed;
uniform float uScrollProgress;

varying vec2 vUv;

${classic2d}

float lines(vec2 uv, float offset) {
  float a = abs(0.5 * sin(uv.y * uLinesAmount) + offset * uLinesBlur);
  return smoothstep(0.0, uLinesBlur + offset * uLinesBlur, a);
}

float random(vec2 p) {
  vec2 k1 = vec2(23.14069263277926, 2.665144142690225);
  return fract(cos(dot(p, k1)) * 12345.6789);
}

// Three noise samples mixed by the cursor bilinearly — the topology
// reshapes as the mouse moves, not just shifts. Time and per-slot
// seed offsets give the field a slow living drift.
vec3 fadeLine(vec2 uv, vec2 mouse2D, vec3 col1, vec3 col2, vec3 col3) {
  mouse2D = (mouse2D + 1.0) * 0.5;

  float t = uTime * 0.04;
  float seed = uSeed * 0.21;

  float n1 = cnoise2(uv + vec2(t, -t * 0.5) + seed);
  float n2 = cnoise2(uv + uOffsetX * 20.0 + vec2(seed * 1.7, t));
  float n3 = cnoise2(uv * 0.3 + uOffsetY * 10.0 + vec2(t * 0.4, seed));
  float nFinal = mix(mix(n1, n2, mouse2D.x), n3, mouse2D.y);

  vec2 baseUv = vec2(nFinal + 2.05) * uBackgroundScale;

  float basePattern = lines(baseUv, 0.1);
  float secondPattern = lines(baseUv, 1.0);

  vec3 baseColor = mix(col1, col2, basePattern);
  return mix(baseColor, col3, secondPattern);
}

void main() {
  vec2 uv = vUv;
  uv.y += uOffsetY + uScrollProgress * 0.42;
  uv.x += uOffsetX + uSeed * 0.05;
  uv.x *= uPlaneRes.x / uPlaneRes.y;

  vec3 finalCol = fadeLine(uv, uMouse2D, uColor1, uColor2, uColor3);

  vec2 uvRandom = vUv;
  uvRandom.y *= random(vec2(uvRandom.y, 0.5));
  finalCol.rgb += random(uvRandom) * uNoise;

  gl_FragColor = vec4(finalCol, 1.0);
}
`;

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);

const mixColor = (from: string, to: string, ratio: number) =>
  new Color(from).lerp(new Color(to), clamp01(ratio));

const FullscreenGradientBackground: React.FC<
  FullscreenGradientBackgroundProps
> = ({
  className,
  heroPalette,
  projectPalette,
  transitionProgress,
  activeSeed,
  reducedMotion = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const propsRef = useRef({
    heroPalette,
    projectPalette,
    transitionProgress,
    activeSeed,
    reducedMotion,
  });

  propsRef.current = {
    heroPalette,
    projectPalette,
    transitionProgress,
    activeSeed,
    reducedMotion,
  };

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) {
      return;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, -10, 10);
    camera.position.z = 1;

    const renderer = new WebGLRenderer({
      canvas,
      alpha: false,
      antialias: false,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(new Color(0x050505), 1);

    const geometry = new PlaneGeometry(2, 2, 1, 1);
    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: FrontSide,
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new Color(heroPalette.c) },
        uColor2: { value: new Color(heroPalette.b) },
        uColor3: { value: new Color(heroPalette.a) },
        uColorAccent: { value: new Color(heroPalette.d) },
        uPlaneRes: { value: new Vector2(1, 1) },
        uMouse2D: { value: new Vector2(0, 0) },
        // Defaults mirror gotohiroki/three-monopo-london exactly so
        // the ribbon density, blur and grain match monopo.london.
        uLinesBlur: { value: 0.25 },
        uNoise: { value: 0.075 },
        uOffsetX: { value: 0.34 },
        uOffsetY: { value: 0.0 },
        uLinesAmount: { value: 5.0 },
        uBackgroundScale: { value: 1.0 },
        uSeed: { value: 0 },
        uScrollProgress: { value: 0 },
      },
    });

    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    const pointerTarget = new Vector2(0, 0);
    const pointerCurrent = new Vector2(0, 0);
    let frame = 0;
    let resizeObserver: ResizeObserver | null = null;

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(width, height, false);
      material.uniforms.uPlaneRes.value.set(width, height);

      // Mirrors monopo's mobile breakpoint scaling — denser ribbons
      // on phones (×3.8) so the pattern stays readable below tablet.
      const isMobile = width < 768;
      material.uniforms.uLinesAmount.value = isMobile ? 5.0 * 3.8 : 5.0;
      material.uniforms.uBackgroundScale.value = isMobile
        ? width * 0.001 * 1.45
        : 1.0;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (propsRef.current.reducedMotion) {
        return;
      }

      pointerTarget.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -((event.clientY / window.innerHeight) * 2 - 1)
      );
    };

    const render = (now: number) => {
      frame = window.requestAnimationFrame(render);

      const {
        heroPalette: nextHeroPalette,
        projectPalette: nextProjectPalette,
        transitionProgress: nextProgress,
        activeSeed: nextSeed,
        reducedMotion: nextReducedMotion,
      } = propsRef.current;

      const progress = clamp01(nextProgress);
      const targetColor1 = mixColor(
        nextHeroPalette.c,
        nextProjectPalette.c,
        progress
      );
      const targetColor2 = mixColor(
        nextHeroPalette.b,
        nextProjectPalette.b,
        progress
      );
      const targetColor3 = mixColor(
        nextHeroPalette.a,
        nextProjectPalette.a,
        progress
      );
      const targetAccent = mixColor(
        nextHeroPalette.d,
        nextProjectPalette.d,
        progress
      );
      const lerpAmount = nextReducedMotion ? 1 : 0.045;

      material.uniforms.uColor1.value.lerp(targetColor1, lerpAmount);
      material.uniforms.uColor2.value.lerp(targetColor2, lerpAmount);
      material.uniforms.uColor3.value.lerp(targetColor3, lerpAmount);
      material.uniforms.uColorAccent.value.lerp(targetAccent, lerpAmount);
      material.uniforms.uSeed.value +=
        (nextSeed - material.uniforms.uSeed.value) *
        (nextReducedMotion ? 1 : 0.035);
      material.uniforms.uScrollProgress.value +=
        (progress - material.uniforms.uScrollProgress.value) *
        (nextReducedMotion ? 1 : 0.08);

      // Pointer ease matches the reference (0.07 * 1.2) so the
      // ribbons reshape at the same rate as monopo.london's.
      pointerCurrent.lerp(pointerTarget, nextReducedMotion ? 1 : 0.084);
      material.uniforms.uMouse2D.value.copy(pointerCurrent);

      if (!nextReducedMotion) {
        material.uniforms.uTime.value = now * 0.001;
      }

      renderer.render(scene, camera);
    };

    resize();
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      scene.remove(mesh);
    };
  }, [heroPalette]);

  return (
    <div ref={containerRef} className={className} aria-hidden>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};

export default FullscreenGradientBackground;
