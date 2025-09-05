"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  /** Canvas size in CSS pixels (it will auto-scale to devicePixelRatio) */
  width?: number;
  height?: number;
  /** Props to tweak the shader without editing GLSL (optional) */
  waveSpeed?: number;
  waveFrequency?: number;
  waveAmplitude?: number;
  waveColor?: [number, number, number]; // 0..1
  colorNum?: number;
  pixelSize?: number;
  /** Pause animation (optional) */
  paused?: boolean;
};

export default function WebGLWaves({
  width,
  height,
  waveSpeed = 0.05,
  waveFrequency = 3.0,
  waveAmplitude = 0.3,
  waveColor = [0.5, 0.5, 0.5],
  colorNum = 4.0,
  pixelSize = 2.0,
  paused = false,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    // Renderer with alpha for transparent background
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
    });
    renderer.setClearColor(0x000000, 0); // fully transparent
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Basic scene/camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);

    // Geometry (screen-filling plane with UVs)
    const geometry = new THREE.PlaneGeometry(2, 2);

    // Vertex + Fragment shaders
    const vertexShader = /* glsl */ `
      varying vec2 v_uv;
      void main() {
        v_uv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = /* glsl */ `
      precision mediump float;

      uniform float u_time;
      uniform vec2 u_resolution;
      varying vec2 v_uv;

      // Noise helpers
      vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

      float cnoise(vec2 P) {
        vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);
        vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);
        Pi = mod289(Pi);
        vec4 ix = Pi.xzxz;
        vec4 iy = Pi.yyww;
        vec4 fx = Pf.xzxz;
        vec4 fy = Pf.yyww;
        vec4 i = permute(permute(ix) + iy);
        vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;
        vec4 gy = abs(gx) - 0.5;
        vec4 tx = floor(gx + 0.5);
        gx = gx - tx;
        vec2 g00 = vec2(gx.x, gy.x);
        vec2 g10 = vec2(gx.y, gy.y);
        vec2 g01 = vec2(gx.z, gy.z);
        vec2 g11 = vec2(gx.w, gy.w);
        vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));
        g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;
        float n00 = dot(g00, vec2(fx.x, fy.x));
        float n10 = dot(g10, vec2(fx.y, fy.y));
        float n01 = dot(g01, vec2(fx.z, fy.z));
        float n11 = dot(g11, vec2(fx.w, fy.w));
        vec2 fade_xy = fade(Pf.xy);
        vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
        return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);
      }

      const int OCTAVES = 8;
      float fbm(vec2 p, float waveFrequency, float waveAmplitude) {
        float value = 0.0;
        float amp = 1.0;
        float freq = waveFrequency;
        for (int i = 0; i < OCTAVES; i++) {
          value += amp * abs(cnoise(p));
          p *= freq;
          amp *= waveAmplitude;
        }
        return value;
      }

      float pattern(vec2 p, float time, float waveSpeed, float waveFrequency, float waveAmplitude) {
        vec2 p2 = p - time * waveSpeed;
        return fbm(p - fbm(p + fbm(p2, waveFrequency, waveAmplitude), waveFrequency, waveAmplitude), waveFrequency, waveAmplitude);
      }

      // Dithering
      float bayerDither8x8(vec2 position) {
        const float bayerMatrix8x8[64] = float[64](
          0.0/64.0, 48.0/64.0, 12.0/64.0, 60.0/64.0, 3.0/64.0, 51.0/64.0, 15.0/64.0, 63.0/64.0,
          32.0/64.0, 16.0/64.0, 44.0/64.0, 28.0/64.0, 35.0/64.0, 19.0/64.0, 47.0/64.0, 31.0/64.0,
          8.0/64.0, 56.0/64.0, 4.0/64.0, 52.0/64.0, 11.0/64.0, 59.0/64.0, 7.0/64.0, 55.0/64.0,
          40.0/64.0, 24.0/64.0, 36.0/64.0, 20.0/64.0, 43.0/64.0, 27.0/64.0, 39.0/64.0, 23.0/64.0,
          2.0/64.0, 50.0/64.0, 14.0/64.0, 62.0/64.0, 1.0/64.0, 49.0/64.0, 13.0/64.0, 61.0/64.0,
          34.0/64.0, 18.0/64.0, 46.0/64.0, 30.0/64.0, 33.0/64.0, 17.0/64.0, 45.0/64.0, 29.0/64.0,
          10.0/64.0, 58.0/64.0, 6.0/64.0, 54.0/64.0, 9.0/64.0, 57.0/64.0, 5.0/64.0, 53.0/64.0,
          42.0/64.0, 26.0/64.0, 38.0/64.0, 22.0/64.0, 41.0/64.0, 25.0/64.0, 37.0/64.0, 21.0/64.0
        );
        int x = int(mod(position.x, 8.0));
        int y = int(mod(position.y, 8.0));
        return bayerMatrix8x8[y * 8 + x] - 0.25;
      }

      vec3 dither(vec2 uv, vec3 color, float colorNum, float pixelSize, vec2 res) {
        vec2 pixelPos = floor(uv * res / pixelSize) * pixelSize;
        float threshold = bayerDither8x8(pixelPos);
        color += threshold;
        return floor(color * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);
      }

      // Uniforms to tweak from React
      uniform float u_waveSpeed;
      uniform float u_waveFrequency;
      uniform float u_waveAmplitude;
      uniform vec3  u_waveColor;
      uniform float u_colorNum;
      uniform float u_pixelSize;

      void main() {
        // aspect-corrected coordinates centered at 0
        vec2 uv = v_uv - 0.5;
        uv.x *= u_resolution.x / u_resolution.y;

        float f = pattern(uv, u_time, u_waveSpeed, u_waveFrequency, u_waveAmplitude);
        vec3 col = mix(vec3(0.0), u_waveColor, f);

        col = dither(v_uv, col, u_colorNum, u_pixelSize, u_resolution);

        gl_FragColor = vec4(col, 1.0);

        #include <colorspace_fragment>
      }
    `;

    // Uniforms (also expose props via uniforms)
    const uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(1, 1) },
      u_waveSpeed: { value: waveSpeed },
      u_waveFrequency: { value: waveFrequency },
      u_waveAmplitude: { value: waveAmplitude },
      u_waveColor: { value: new THREE.Color().fromArray(waveColor) },
      u_colorNum: { value: colorNum },
      u_pixelSize: { value: pixelSize },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true, // allow alpha to show through
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Size & DPR
    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap for perf
      const w = canvas.clientWidth || width || 800;
      const h = canvas.clientHeight || height || 450;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      renderer.setSize(w, h, false);
      uniforms.u_resolution.value.set(canvas.width, canvas.height);
    };

    // Initial CSS size - only set if width/height provided
    if (width) canvas.style.width = `${width}px`;
    if (height) canvas.style.height = `${height}px`;
    canvas.style.display = "block"; // remove inline gaps
    canvas.style.background = "transparent";

    setSize();
    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(canvas);

    let rafId = 0;
    const start = performance.now();

    const tick = () => {
      if (!paused) {
        uniforms.u_time.value = (performance.now() - start) * 0.001; // seconds
        renderer.render(scene, camera);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, [
    width,
    height,
    waveSpeed,
    waveFrequency,
    waveAmplitude,
    waveColor,
    colorNum,
    pixelSize,
    paused,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      aria-label="Waves shader"
    />
  );
}
