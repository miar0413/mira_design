'use client';

import { useEffect, useRef } from 'react';
import {
  CanvasTexture,
  CircleGeometry,
  Color,
  DoubleSide,
  LinearFilter,
  Mesh,
  MeshBasicMaterial,
  OrthographicCamera,
  PlaneGeometry,
  Raycaster,
  Scene,
  ShaderMaterial,
  TextureLoader,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';

const backgroundVertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const textVertexShader = `
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

const backgroundFragmentShader = `
uniform vec2 uMouse;
uniform vec3 uBlack;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uUvScale;
uniform float uMouseLine;
uniform float uLengthLine;
uniform float uNoiseAmount;

varying vec2 vUv;

${classic2d}

float random(vec2 p) {
  vec2 k1 = vec2(23.14069263277926, 2.665144142690225);
  return fract(cos(dot(p, k1)) * 12345.6789);
}

void main() {
  vec2 seed = vUv * uUvScale * (uMouse + uMouseLine * (length(uMouse) + uLengthLine));
  float noise = cnoise2(seed) + length(uMouse) * uNoiseAmount;

  float ml = pow(length(uMouse), 2.5) * 0.15;

  float n1 = smoothstep(0.0, 0.2, noise);
  vec3 color = mix(uBlack, uColor1, n1);

  float n2 = smoothstep(0.1 + ml, 0.3 + ml, noise);
  color = mix(color, uColor2, n2);

  float n3 = smoothstep(0.2 + ml, 0.4 + ml, noise);
  color = mix(color, uColor3, n3);

  float n4 = smoothstep(0.3 + ml, 0.5 + ml, noise);
  color = mix(color, uBlack, n4);

  vec2 uvRandom = vUv;
  uvRandom.y *= random(vec2(uvRandom.y, 0.4));
  color.rgb += random(uvRandom) * 0.05;

  gl_FragColor = vec4(color, 1.0);
}
`;

const textCutoutFragmentShader = `
uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform float uAspect;
uniform bool uEnable;

varying vec2 vUv;

float lensMask(vec2 mouse, vec2 uv, float aspect, float radius, float feather) {
  vec2 aspectRatio = vec2(aspect, 1.0);
  float dist = distance(mouse * aspectRatio, uv * aspectRatio);
  return 1.0 - smoothstep(radius - feather, radius + feather, dist);
}

void main() {
  vec4 tex = texture2D(uTexture, vUv);
  float mask = lensMask(uMouse, vUv, uAspect, 0.115, 0.004);

  if (uEnable) {
    tex.a *= 1.0 - mask;
  }

  gl_FragColor = tex;
}
`;

const textLensFragmentShader = `
uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform float uAspect;
uniform bool uEnable;

varying vec2 vUv;

float lensMask(vec2 mouse, vec2 uv, float aspect, float radius, float feather) {
  vec2 aspectRatio = vec2(aspect, 1.0);
  float dist = distance(mouse * aspectRatio, uv * aspectRatio);
  return 1.0 - smoothstep(radius - feather, radius + feather, dist);
}

vec3 hueShift(vec3 color, float hue) {
  const vec3 k = vec3(0.57735, 0.57735, 0.57735);
  float cosAngle = cos(hue);
  return vec3(
    color * cosAngle +
    cross(k, color) * sin(hue) +
    k * dot(k, color) * (1.0 - cosAngle)
  );
}

void main() {
  vec2 aspectRatio = vec2(uAspect, 1.0);
  float dist = distance(uMouse * aspectRatio, vUv * aspectRatio);
  float radius = 0.115;
  float d1 = smoothstep(radius * 0.975, radius, dist);
  float d2 = smoothstep(radius * (1.0 - 0.036) * 0.975, radius * (1.0 - 0.036), dist) - d1;

  vec2 sub = (uMouse - vUv) * aspectRatio;
  vec2 uv = vUv - sub * pow(dist * 0.7, 0.7) + d2 * 0.007;
  vec4 texR = texture2D(uTexture, uv - sub * 0.01);
  vec4 texG = texture2D(uTexture, uv + sub * 0.02);
  vec4 texB = texture2D(uTexture, uv + sub * 0.02);
  float alpha = max(max(texR.a, texG.a), texB.a);
  vec4 tex = vec4(texR.r, texG.g, texB.b, alpha);

  tex.a = mix(tex.a, 0.0, d1);
  tex.rgb = hueShift(tex.rgb, 3.292);

  if (!uEnable) {
    tex.a = 0.0;
  }

  gl_FragColor = tex;
}
`;

type HeroTextTextureOptions = {
  lines: [string, string, string];
  fontSize: number;
  lineHeight: number;
  offsets: [number, number, number, number, number, number];
  opacity?: number;
  family?: string;
};

const createHeroTextTexture = ({
  lines,
  fontSize,
  lineHeight,
  offsets,
  opacity = 1,
  family = '"Lato", "Helvetica Neue", sans-serif',
}: HeroTextTextureOptions) => {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1180;

  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Unable to create 2D canvas context for hero text');
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#f4f1ea';
  ctx.textBaseline = 'top';
  ctx.font = `400 ${fontSize}px ${family}`;
  ctx.globalAlpha = opacity;

  const [line1, line2, line3] = lines;
  const [offset1, offset2, offset3, offsetY1, offsetY2, offsetY3] = offsets;
  const text1Size = ctx.measureText(line1);
  const text2Size = ctx.measureText(line2);
  const text3Size = ctx.measureText(line3);
  const textHeight =
    text1Size.actualBoundingBoxAscent + text1Size.actualBoundingBoxDescent;
  const verticalOffset =
    canvas.height / 2 - (textHeight * 3 + lineHeight * 2) / 2;

  ctx.fillText(
    line1,
    canvas.width / 2 - text1Size.width / 2 + text1Size.width * offset1,
    verticalOffset + textHeight * offsetY1
  );
  ctx.fillText(
    line2,
    canvas.width / 2 - text2Size.width / 2 + text2Size.width * offset2,
    verticalOffset + textHeight + lineHeight + textHeight * offsetY2
  );
  ctx.fillText(
    line3,
    canvas.width / 2 - text3Size.width / 2 + text3Size.width * offset3,
    verticalOffset + textHeight * 2 + lineHeight * 2 + textHeight * offsetY3
  );

  const texture = new CanvasTexture(canvas);
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.needsUpdate = true;

  return texture;
};

type HeroShaderBackgroundProps = {
  className?: string;
  reducedMotion?: boolean;
};

const HeroShaderBackground: React.FC<HeroShaderBackgroundProps> = ({
  className,
  reducedMotion = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(new Color(0x000000), 0);

    const backgroundGeometry = new PlaneGeometry(2, 2, 32, 32);
    const backgroundMaterial = new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new Vector2() },
        uBlack: { value: new Color(0.0, 0.0, 0.0) },
        uColor1: { value: new Color(0.89, 0.34, 0.11) },
        uColor2: { value: new Color(0.56, 0.64, 0.64) },
        uColor3: { value: new Color(0.16, 0.26, 0.47) },
        uUvScale: { value: 1.5 },
        uMouseLine: { value: 0.3 },
        uLengthLine: { value: 0.5 },
        uNoiseAmount: { value: 0.9 },
      },
      vertexShader: backgroundVertexShader,
      fragmentShader: backgroundFragmentShader,
      side: DoubleSide,
      transparent: true,
    });
    const backgroundMesh = new Mesh(backgroundGeometry, backgroundMaterial);
    backgroundMesh.position.z = 0.0;
    scene.add(backgroundMesh);

    const englishTexture = createHeroTextTexture({
      lines: ['Designing clarity', 'for complex', 'digital systems'],
      fontSize: 122,
      lineHeight: 24,
      offsets: [-0.01, 0.04, -0.03, 0.02, 0, -0.01],
      family: '"Lato", "Helvetica Neue", sans-serif',
    });
    const accentTexture = createHeroTextTexture({
      lines: ['为复杂系统', '设计更清晰的', '数字体验'],
      fontSize: 96,
      lineHeight: 22,
      offsets: [-0.1, 0.04, -0.02, -0.03, 0.01, 0.06],
      opacity: 0.98,
      family: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", sans-serif',
    });
    const textGeometry = new PlaneGeometry(2, 2);
    const textCutoutMaterial = new ShaderMaterial({
      uniforms: {
        uTexture: { value: englishTexture },
        uMouse: { value: new Vector2(0.5, 0.5) },
        uAspect: { value: 1 },
        uEnable: { value: false },
      },
      vertexShader: textVertexShader,
      fragmentShader: textCutoutFragmentShader,
      transparent: true,
      depthWrite: false,
    });
    const textLensMaterial = new ShaderMaterial({
      uniforms: {
        uTexture: { value: accentTexture },
        uMouse: { value: new Vector2(0.5, 0.5) },
        uAspect: { value: 1 },
        uEnable: { value: false },
      },
      vertexShader: textVertexShader,
      fragmentShader: textLensFragmentShader,
      transparent: true,
      depthWrite: false,
    });
    const textCutoutMesh = new Mesh(textGeometry, textCutoutMaterial);
    textCutoutMesh.position.z = 0.001;
    scene.add(textCutoutMesh);

    const textLensMesh = new Mesh(textGeometry, textLensMaterial);
    textLensMesh.position.z = 0.002;
    scene.add(textLensMesh);

    const lensGeometry = new CircleGeometry(0.23, 64);
    const lensMaterial = new MeshBasicMaterial({
      transparent: true,
      depthWrite: false,
      opacity: 0,
    });
    const lensMesh = new Mesh(lensGeometry, lensMaterial);
    lensMesh.position.z = 0.003;
    scene.add(lensMesh);

    const raycaster = new Raycaster();
    const mouseCurrent = new Vector2(0, 0);
    const mouseTarget = new Vector2(0, 0);
    const backgroundTarget = new Vector2(0, 0);
    const textTarget = new Vector2(0.5, 0.5);
    const lensTarget = new Vector3(0, 0, 0.003);
    const textureLoader = new TextureLoader();

    let animationFrame = 0;
    let resizeObserver: ResizeObserver | null = null;
    let pointerInside = false;

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      const aspect = width / height;

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height, false);

      camera.left = -1;
      camera.right = 1;
      camera.top = 1;
      camera.bottom = -1;
      camera.updateProjectionMatrix();

      lensMesh.scale.set(1 / aspect, 1, 1);
      textCutoutMaterial.uniforms.uAspect.value = aspect;
      textLensMaterial.uniforms.uAspect.value = aspect;
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      const insideX =
        event.clientX >= bounds.left && event.clientX <= bounds.right;
      const insideY =
        event.clientY >= bounds.top && event.clientY <= bounds.bottom;

      if (!insideX || !insideY) {
        pointerInside = false;
        mouseTarget.set(0, 0);
        return;
      }

      pointerInside = true;

      if (reducedMotion) {
        return;
      }

      mouseTarget.set(
        ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
        -(((event.clientY - bounds.top) / bounds.height) * 2 - 1)
      );
    };

    const onPointerLeave = () => {
      pointerInside = false;
      mouseTarget.set(0, 0);
    };

    const renderFrame = () => {
      animationFrame = window.requestAnimationFrame(renderFrame);

      mouseCurrent.lerp(mouseTarget, reducedMotion ? 0.18 : 0.1);

      backgroundTarget.set(
        (mouseCurrent.x + 1) * 0.5,
        (mouseCurrent.y + 1) * 0.5
      );
      backgroundMaterial.uniforms.uMouse.value.lerp(backgroundTarget, 0.2);
      if (!reducedMotion) {
        backgroundMaterial.uniforms.uTime.value += 0.005;
      }

      lensTarget.set(mouseCurrent.x, mouseCurrent.y, 0.003);
      lensMesh.position.lerp(lensTarget, reducedMotion ? 0.2 : 0.1);
      lensMaterial.opacity +=
        (((pointerInside ? 0.86 : 0) as number) - lensMaterial.opacity) *
        (reducedMotion ? 0.2 : 0.12);

      raycaster.setFromCamera(mouseCurrent, camera);
      const textHit = pointerInside
        ? raycaster.intersectObject(textCutoutMesh, false)[0]
        : undefined;
      const textEnabled = Boolean(textHit?.uv) && !reducedMotion;

      if (textHit?.uv) {
        textTarget.copy(textHit.uv);
      }

      textCutoutMaterial.uniforms.uEnable.value = textEnabled;
      textLensMaterial.uniforms.uEnable.value = textEnabled;
      textCutoutMaterial.uniforms.uMouse.value.lerp(textTarget, 0.12);
      textLensMaterial.uniforms.uMouse.value.lerp(textTarget, 0.12);

      renderer.render(scene, camera);
    };

    textureLoader.load('/lense.png', (texture) => {
      texture.minFilter = LinearFilter;
      texture.magFilter = LinearFilter;
      lensMaterial.map = texture;
      lensMaterial.needsUpdate = true;
    });

    resize();
    renderFrame();

    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('blur', onPointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver?.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('blur', onPointerLeave);
      backgroundGeometry.dispose();
      backgroundMaterial.dispose();
      textGeometry.dispose();
      textCutoutMaterial.dispose();
      textLensMaterial.dispose();
      englishTexture.dispose();
      accentTexture.dispose();
      lensGeometry.dispose();
      lensMaterial.dispose();
      renderer.dispose();
      scene.remove(backgroundMesh);
      scene.remove(textCutoutMesh);
      scene.remove(textLensMesh);
      scene.remove(lensMesh);
    };
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className={className} aria-hidden>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};

export default HeroShaderBackground;
