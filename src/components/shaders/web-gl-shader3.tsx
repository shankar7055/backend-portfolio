"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
    /** Canvas size in CSS pixels (it will auto-scale to devicePixelRatio) */
    width?: number;
    height?: number;
    /** Pause animation (optional) */
    paused?: boolean;
};

export default function WebGLRaymarching({
    width,
    height,
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
            uniform vec2 u_mouse;
            uniform vec2 u_resolution;
            varying vec2 v_uv;

            #define MAX_STEPS 100
            #define MAX_DIST 100.0
            #define SURF_DIST 0.01
            #define PI 3.14159265359

            // Hash function for randomization
            float hash(float n) {
                return fract(sin(n) * 43758.5453);
            }

            float hash(vec2 p) {
                return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
            }

            // Noise functions
            float noise(vec2 p) {
                vec2 i = floor(p);
                vec2 f = fract(p);
                f = f * f * (3.0 - 2.0 * f);
                return mix(
                    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
                    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
                    f.y
                );
            }

            float noise(vec3 p) {
                vec3 i = floor(p);
                vec3 f = fract(p);
                f = f * f * (3.0 - 2.0 * f);
                
                float n = i.x + i.y * 157.0 + i.z * 113.0;
                return mix(
                    mix(
                        mix(hash(n + 0.0), hash(n + 1.0), f.x),
                        mix(hash(n + 157.0), hash(n + 158.0), f.x),
                        f.y
                    ),
                    mix(
                        mix(hash(n + 113.0), hash(n + 114.0), f.x),
                        mix(hash(n + 270.0), hash(n + 271.0), f.x),
                        f.y
                    ),
                    f.z
                );
            }

            // FBM (Fractal Brownian Motion)
            float fbm(vec3 p) {
                float f = 0.0;
                float amp = 0.5;
                float freq = 1.0;
                
                for(int i = 0; i < 5; i++) {
                    f += amp * noise(p * freq);
                    amp *= 0.5;
                    freq *= 2.0;
                }
                
                return f;
            }

            // Rotation matrix
            mat2 rot(float a) {
                float c = cos(a);
                float s = sin(a);
                return mat2(c, -s, s, c);
            }

            // SDF for a cube
            float sdBox(vec3 p, vec3 b) {
                vec3 q = abs(p) - b;
                return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
            }

            // Scene SDF
            float map(vec3 p) {
                float dist = MAX_DIST;
                
                // Create multiple cubes
                for(int i = 0; i < 10; i++) {
                    // Create unique position for each cube
                    float fi = float(i);
                    float t = u_time * 0.3;
                    
                    // Cube position with improved animation path
                    vec3 pos = vec3(
                        sin(fi * 0.9 + t) * 7.0 - 3.0,
                        cos(fi * 0.7 + t * 0.8) * 4.0 - 0.8,
                        sin(fi * 0.5 + cos(fi * 0.4)) * 2.0 - 5.0 + mod(fi + t * 1.5, 10.0)
                    );
                    
                    // Mouse influence on cube position
                    vec2 mouseOffset = (u_mouse - 0.5) * 2.0;
                    pos.xy += mouseOffset * (pos.z + 15.0) * 0.05;
                    
                    // Cube rotation
                    vec3 q = p - pos;
                    q.xy = rot(t * 0.2 + fi * 0.5) * q.xy;
                    q.yz = rot(t * 0.3 + fi * 0.4) * q.yz;
                    
                    // Cube size with time-based animation
                    float size = 0.4 + 0.2 * sin(fi * 0.8 + t);
                    
                    // Calculate distance to cube
                    float cubeDist = sdBox(q, vec3(size));
                    
                    // Combine with scene using smooth min
                    dist = min(dist, cubeDist);
                }
                
                return dist;
            }

            // Calculate normal
            vec3 getNormal(vec3 p) {
                vec2 e = vec2(0.01, 0.0);
                return normalize(vec3(
                    map(p + e.xyy) - map(p - e.xyy),
                    map(p + e.yxy) - map(p - e.yxy),
                    map(p + e.yyx) - map(p - e.yyx)
                ));
            }

            // Raymarching
            float raymarch(vec3 ro, vec3 rd) {
                float d = 0.0;
                
                for(int i = 0; i < MAX_STEPS; i++) {
                    vec3 p = ro + rd * d;
                    float dist = map(p);
                    d += dist;
                    
                    if(dist < SURF_DIST || d > MAX_DIST) break;
                }
                
                return d;
            }

            // Lighting calculation
            vec3 getLight(vec3 p, vec3 rd) {
                vec3 n = getNormal(p);
                vec3 lightPos = vec3(2.0, 4.0, -3.0);
                vec3 lightDir = normalize(lightPos - p);
                
                // Ambient
                float ambient = 0.2;
                
                // Diffuse
                float diff = max(dot(n, lightDir), 0.0);
                
                // Specular (Blinn-Phong)
                vec3 h = normalize(lightDir - rd);
                float spec = pow(max(dot(n, h), 0.0), 16.0);
                
                // Rim lighting
                float rim = 1.0 - max(dot(-rd, n), 0.0);
                rim = pow(rim, 4.0);
                
                // Combine
                vec3 col = vec3(1.0) * (ambient + diff * 0.6 + spec * 0.4 + rim * 0.3);
                
                // Distance fog for cubes
                float fogFactor = 1.0 - exp(-0.03 * length(p));
                col = mix(col, vec3(0.0), fogFactor);
                
                return col;
            }

            // Volumetric fog/nebula function
            vec3 nebula(vec3 ro, vec3 rd, float t) {
                vec3 col = vec3(0.0);
                float totalDensity = 0.0;
                
                // Navy to black gradient base
                vec3 baseColor = mix(
                    vec3(0.05, 0.05, 0.2),  // Deep navy
                    vec3(0.0, 0.0, 0.0),    // Black
                    smoothstep(0.0, 1.0, v_uv.y)
                );
                
                // Mouse influence on nebula
                vec2 mouseOffset = (u_mouse - 0.5) * 2.0;
                
                // Sample points along the ray for volumetric effect
                float stepSize = 0.3;
                for(int i = 0; i < 10; i++) {
                    float fi = float(i);
                    float depth = fi * stepSize;
                    vec3 pos = ro + rd * depth;
                    
                    // Warp position with time and mouse
                    pos.xy += mouseOffset * depth * 0.1;
                    pos.x += sin(u_time * 0.1) * 2.0;
                    pos.z += u_time * 0.2;
                    
                    // Sample noise at this position
                    float density = fbm(pos * 0.15);
                    density = smoothstep(0.3, 0.7, density) * 0.15;
                    
                    // Accumulate color and density
                    vec3 cloudColor = mix(
                        vec3(0.1, 0.1, 0.3),  // Dark blue
                        vec3(0.2, 0.2, 0.5),  // Light blue
                        density * 2.0
                    );
                    
                    col += cloudColor * density * exp(-totalDensity);
                    totalDensity += density;
                    
                    if(totalDensity > 0.95) break;
                }
                
                return baseColor + col;
            }

            void main() {
                // Adjust for aspect ratio
                vec2 uv = v_uv;
                uv.x *= u_resolution.x / u_resolution.y;
                uv = uv * 2.0 - 1.0;
                
                // Camera setup (reduced field of view for less distortion)
                vec3 ro = vec3(0.0, 0.0, -5.0);
                vec3 rd = normalize(vec3(uv * 0.8, 1.0));
                
                // Mouse influence on camera
                vec2 mouseOffset = (u_mouse - 0.5) * 0.5;
                rd.xy = rot(mouseOffset.x * 0.2) * rd.xy;
                rd.yz = rot(mouseOffset.y * 0.2) * rd.yz;
                
                // Raymarch the scene
                float d = raymarch(ro, rd);
                
                // Final color
                vec3 col;
                
                if(d < MAX_DIST) {
                    // We hit a cube
                    vec3 p = ro + rd * d;
                    col = getLight(p, rd);
                } else {
                    // Background nebula
                    col = nebula(ro, rd, d);
                }
                
                // Apply some subtle dithering for retro feel
                float dither = hash(v_uv + u_time * 0.01) * 0.05 - 0.025;
                col += dither;
                
                // Output final color
                gl_FragColor = vec4(col, 1.0);
            }
        `;

        // Uniforms
        const uniforms = {
            u_time: { value: 0 },
            u_resolution: { value: new THREE.Vector2(1, 1) },
            u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        };

        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms,
            transparent: true,
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Mouse tracking


        // Size & DPR
        const setSize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const w = canvas.clientWidth || width || 800;
            const h = canvas.clientHeight || height || 450;
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            renderer.setSize(w, h, false);
            uniforms.u_resolution.value.set(canvas.width, canvas.height);
        };

        // Initial CSS size
        if (width) canvas.style.width = `${width}px`;
        if (height) canvas.style.height = `${height}px`;
        canvas.style.display = "block";
        canvas.style.background = "transparent";

        setSize();
        const resizeObserver = new ResizeObserver(setSize);
        resizeObserver.observe(canvas);


        let rafId = 0;
        const start = performance.now();

        const tick = () => {
            if (!paused) {
                uniforms.u_time.value = (performance.now() - start) * 0.001;
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
    }, [width, height, paused]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            aria-label="3D Raymarching shader"
        />
    );
}