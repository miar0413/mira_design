'use client';

import { useEffect, useRef } from 'react';
import {
  CanvasTexture,
  CircleGeometry,
  Color,
  LinearFilter,
  Mesh,
  MeshBasicMaterial,
  OrthographicCamera,
  PlaneGeometry,
  Raycaster,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const textCutoutFragmentShader = `
uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform float uAspect;
uniform float uLensRadius;
uniform float uLensFeather;
uniform bool uEnable;

varying vec2 vUv;

float lensMask(vec2 mouse, vec2 uv, float aspect, float radius, float feather) {
  vec2 aspectRatio = vec2(aspect, 1.0);
  float dist = distance(mouse * aspectRatio, uv * aspectRatio);
  return 1.0 - smoothstep(radius - feather, radius + feather, dist);
}

void main() {
  vec4 tex = texture2D(uTexture, vUv);
  float mask = lensMask(uMouse, vUv, uAspect, uLensRadius, uLensFeather);

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
uniform float uLensRadius;
uniform float uLensFeather;
uniform bool uEnable;

varying vec2 vUv;

void main() {
  vec2 aspectRatio = vec2(uAspect, 1.0);
  float dist = distance(uMouse * aspectRatio, vUv * aspectRatio);
  float radius = uLensRadius;
  float edge = smoothstep(radius - uLensFeather, radius + uLensFeather, dist);
  float rim = smoothstep(radius * 0.965, radius * 0.99, dist) - edge;

  vec2 sub = (uMouse - vUv) * aspectRatio;
  vec2 uv = vUv - sub * pow(dist * 0.7, 0.7) + rim * 0.008;
  vec4 texR = texture2D(uTexture, uv - sub * 0.012);
  vec4 texG = texture2D(uTexture, uv + sub * 0.01);
  vec4 texB = texture2D(uTexture, uv + sub * 0.02);
  float alpha = max(max(texR.a, texG.a), texB.a);
  vec4 tex = vec4(texR.r, texG.g, texB.b, alpha);

  tex.a = mix(tex.a, 0.0, edge);
  tex.rgb = mix(tex.rgb, vec3(tex.r * 0.65, tex.g * 0.92, tex.b * 1.18), 0.55);

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
  family: string;
  opacity?: number;
  canvasWidth?: number;
  canvasHeight?: number;
};

const createHeroTextTexture = ({
  lines,
  fontSize,
  lineHeight,
  offsets,
  family,
  opacity = 1,
  canvasWidth = 2048,
  canvasHeight = 1180,
}: HeroTextTextureOptions) => {
  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

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

type HeroLensTextProps = {
  className?: string;
  reducedMotion?: boolean;
};

const HeroLensText: React.FC<HeroLensTextProps> = ({
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
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(new Color(0x000000), 0);

    let englishTexture = createHeroTextTexture({
      lines: ['Designing clarity', 'for complex', 'digital systems'],
      fontSize: 122,
      lineHeight: 24,
      offsets: [-0.01, 0.04, -0.03, 0.02, 0, -0.01],
      family: '"Lato", "Helvetica Neue", sans-serif',
      opacity: 0.72,
    });
    let accentTexture = createHeroTextTexture({
      lines: ['为复杂系统', '设计更清晰的', '数字体验'],
      fontSize: 96,
      lineHeight: 22,
      offsets: [-0.1, 0.04, -0.02, -0.03, 0.01, 0.06],
      family: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", sans-serif',
      opacity: 0.98,
    });

    const textGeometry = new PlaneGeometry(2, 2);
    const textCutoutMaterial = new ShaderMaterial({
      uniforms: {
        uTexture: { value: englishTexture },
        uMouse: { value: new Vector2(0.5, 0.5) },
        uAspect: { value: 1 },
        uLensRadius: { value: 0.115 },
        uLensFeather: { value: 0.004 },
        uEnable: { value: false },
      },
      vertexShader,
      fragmentShader: textCutoutFragmentShader,
      transparent: true,
      depthWrite: false,
    });
    const textLensMaterial = new ShaderMaterial({
      uniforms: {
        uTexture: { value: accentTexture },
        uMouse: { value: new Vector2(0.5, 0.5) },
        uAspect: { value: 1 },
        uLensRadius: { value: 0.115 },
        uLensFeather: { value: 0.004 },
        uEnable: { value: false },
      },
      vertexShader,
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

    const lensGeometry = new CircleGeometry(0.23, 96);
    const lensMaterial = new MeshBasicMaterial({
      color: 0xffffff,
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
    const textTarget = new Vector2(0.5, 0.5);
    const lensTarget = new Vector3(0, 0, 0.003);
    let animationFrame = 0;
    let resizeObserver: ResizeObserver | null = null;
    let pointerInside = false;
    let isMobileText: boolean | null = null;

    const setTextTextures = (isMobile: boolean) => {
      if (isMobile === isMobileText) {
        return;
      }

      const nextEnglishTexture = createHeroTextTexture({
        lines: ['Designing clarity', 'for complex', 'digital systems'],
        fontSize: isMobile ? 82 : 122,
        lineHeight: isMobile ? 22 : 24,
        offsets: isMobile
          ? [0, 0, 0, -0.86, -0.86, -0.86]
          : [-0.01, 0.04, -0.03, 0.02, 0, -0.01],
        family: '"Lato", "Helvetica Neue", sans-serif',
        opacity: 0.72,
        canvasWidth: isMobile ? 900 : 2048,
        canvasHeight: isMobile ? 1947 : 1180,
      });
      const nextAccentTexture = createHeroTextTexture({
        lines: ['为复杂系统', '设计更清晰的', '数字体验'],
        fontSize: isMobile ? 36 : 96,
        lineHeight: isMobile ? 12 : 22,
        offsets: isMobile
          ? [0, 0, 0, -0.9, -0.84, -0.78]
          : [-0.1, 0.04, -0.02, -0.03, 0.01, 0.06],
        family: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", sans-serif',
        opacity: 0.98,
        canvasWidth: isMobile ? 900 : 2048,
        canvasHeight: isMobile ? 1947 : 1180,
      });

      englishTexture.dispose();
      accentTexture.dispose();
      englishTexture = nextEnglishTexture;
      accentTexture = nextAccentTexture;
      textCutoutMaterial.uniforms.uTexture.value = englishTexture;
      textLensMaterial.uniforms.uTexture.value = accentTexture;
      isMobileText = isMobile;
    };

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      const aspect = width / height;
      const isMobile = width < 768;

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height, false);
      setTextTextures(isMobile);

      camera.left = -1;
      camera.right = 1;
      camera.top = 1;
      camera.bottom = -1;
      camera.updateProjectionMatrix();

      const lensScale = isMobile ? 0.38 : 1;

      lensMesh.scale.set(lensScale / aspect, lensScale, 1);
      textCutoutMaterial.uniforms.uAspect.value = aspect;
      textLensMaterial.uniforms.uAspect.value = aspect;
      textCutoutMaterial.uniforms.uLensRadius.value = isMobile ? 0.062 : 0.115;
      textLensMaterial.uniforms.uLensRadius.value = isMobile ? 0.062 : 0.115;
      textCutoutMaterial.uniforms.uLensFeather.value = isMobile ? 0.018 : 0.004;
      textLensMaterial.uniforms.uLensFeather.value = isMobile ? 0.018 : 0.004;
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

      lensTarget.set(mouseCurrent.x, mouseCurrent.y, 0.003);
      lensMesh.position.lerp(lensTarget, reducedMotion ? 0.2 : 0.1);
      lensMaterial.opacity +=
        ((pointerInside ? 0.12 : 0) - lensMaterial.opacity) *
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
      textGeometry.dispose();
      textCutoutMaterial.dispose();
      textLensMaterial.dispose();
      englishTexture.dispose();
      accentTexture.dispose();
      lensGeometry.dispose();
      lensMaterial.dispose();
      renderer.dispose();
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

export default HeroLensText;
