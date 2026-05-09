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

// Background shader tuned to match monopo.london's actual look —
// three perlin samples are bilinearly mixed by the cursor (just
// like gotohiroki/three-monopo-london's reference) but the colour
// mapping is a 3-stop smooth ramp on the noise field instead of
// the reference's lines() pattern. That swap is what produces
// monopo's regional duotone blobs (large orange / blue regions
// framed by pure black voids) rather than narrow striped ribbons.
//
// Stop layout, with col1 = accent ribbon, col2 = dominant field,
// col3 = pure void:
//   nFinal < ~-0.05  -> col3 (void)
//   nFinal ~  0.20   -> col2 (field, occupies most of the screen)
//   nFinal >  ~0.55  -> col1 (accent regions where noise peaks)
const fragmentShader = `
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColorAccent;
uniform vec2 uPlaneRes;
uniform vec2 uMouse2D;
uniform float uNoise;
uniform float uOffsetX;
uniform float uOffsetY;
uniform float uBackgroundScale;
uniform float uTime;
uniform float uSeed;
uniform float uScrollProgress;

varying vec2 vUv;

${classic2d}

float random(vec2 p) {
  vec2 k1 = vec2(23.14069263277926, 2.665144142690225);
  return fract(cos(dot(p, k1)) * 12345.6789);
}

// Three perlin samples, bilinearly mixed by the cursor — this is
// the same mouse pipeline as the reference repo so the gradient
// reshapes (not just shifts) as the mouse moves. nFinal is then
// fed into a 3-stop colour ramp that mirrors monopo.london's
// regional blob look.
vec3 fadeRegion(vec2 uv, vec2 mouse2D, vec3 col1, vec3 col2, vec3 col3) {
  mouse2D = (mouse2D + 1.0) * 0.5;

  float t = uTime * 0.04;
  float seed = uSeed * 0.21;

  // Pull the field gently toward the cursor so the bright accent
  // (col1) tracks the pointer like monopo's hero does.
  vec2 nuv = uv * uBackgroundScale + (mouse2D - 0.5) * 0.6;

  float n1 = cnoise2(nuv * 1.05 + vec2(t, -t * 0.5) + seed);
  float n2 = cnoise2(nuv * 0.55 + vec2(-t * 0.4 + 4.7, t * 0.32) + seed * 1.7);
  float n3 = cnoise2(nuv * 1.85 + vec2(t * 0.2 + 9.3, t * 0.18 - 3.4));
  float nFinal = mix(mix(n1, n2, mouse2D.x), n3, mouse2D.y);

  // 3-stop ramp tuned for monopo.london's actual hero balance —
  // roughly a third black voids, half dominant field, the rest
  // accent blobs. Symmetric thresholds around 0 keep the field
  // colour at the centre of the noise distribution (where pixels
  // cluster most densely) while col1 and col3 occupy the tails.
  float toField = smoothstep(-0.32, 0.02, nFinal);
  float toAccent = smoothstep(0.10, 0.40, nFinal);

  vec3 color = mix(col3, col2, toField);
  color = mix(color, col1, toAccent);
  return color;
}

void main() {
  vec2 uv = vUv;
  uv.y += uOffsetY + uScrollProgress * 0.42;
  uv.x += uOffsetX + uSeed * 0.05;
  uv.x *= uPlaneRes.x / uPlaneRes.y;

  vec3 finalCol = fadeRegion(uv, uMouse2D, uColor1, uColor2, uColor3);

  vec2 uvRandom = vUv;
  uvRandom.y *= random(vec2(uvRandom.y, 0.5));
  finalCol.rgb += random(uvRandom) * uNoise;

  // Three.js Color() linearises hex inputs but the renderer in
  // this setup writes the linear value straight to the canvas
  // (no automatic sRGB encoding), so the displayed colours come
  // out roughly two stops darker than the palette intends.
  // Encoding linear -> sRGB here restores the source palette.
  finalCol = mix(
    finalCol * 12.92,
    1.055 * pow(max(finalCol, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055,
    step(vec3(0.0031308), finalCol)
  );

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
        uNoise: { value: 0.075 },
        uOffsetX: { value: 0.34 },
        uOffsetY: { value: 0.0 },
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

      // Tighter noise scale on phones so the regional blobs stay
      // varied across the smaller viewport and don't smear into
      // a single tone.
      const isMobile = width < 768;
      material.uniforms.uBackgroundScale.value = isMobile ? 1.45 : 1.0;
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
