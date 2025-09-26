"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

export function WebGLShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const sceneRef = useRef<{
    scene: THREE.Scene | null
    camera: THREE.OrthographicCamera | null
    renderer: THREE.WebGLRenderer | null
    mesh: THREE.Mesh | null
    uniforms: any
    animationId: number | null
  }>({
    scene: null,
    camera: null,
    renderer: null,
    mesh: null,
    uniforms: null,
    animationId: null,
  })

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const { current: refs } = sceneRef

    const vertexShader = `
      attribute vec3 position;
      attribute vec2 uv;
      varying vec2 v_uv;
      void main() {
        v_uv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      precision mediump float;
      #define GLSLIFY 1

      uniform float u_time;
      uniform vec2 u_mouse;
      uniform vec2 u_resolution;
      varying vec2 v_uv;

      vec3 rainbow(float t) {
          vec3 a = vec3(0.5, 0.5, 0.5);
          vec3 b = vec3(0.5, 0.5, 0.5);
          vec3 c = vec3(1.0, 1.0, 1.0);
          vec3 d = vec3(0.0, 0.33, 0.67);

          return a + b * cos(6.28318 * (c * t + d));
      }

      void main() {
          vec2 uv = v_uv;
          vec2 mouse = u_mouse - 0.5;
          
          float aspect = u_resolution.x/u_resolution.y;
          uv.x *= aspect;
          
          float dist = length(uv - mouse * vec2(aspect, 1.0));
          float distortionAmount = smoothstep(0.5, 0.0, dist) * 0.2;
          
          float t = uv.x * 0.5 + uv.y * 0.5 + u_time * 0.2;
          t += sin(dist * 5.0 - u_time) * distortionAmount;
          
          vec3 color = rainbow(t);
          color = mix(color, color * 1.2, distortionAmount);
          
          gl_FragColor = vec4(color, 1.0);
      }
    `

    const initScene = () => {
      refs.scene = new THREE.Scene()
      refs.renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
      refs.renderer.setPixelRatio(window.devicePixelRatio)
      refs.renderer.setClearColor(0x000000, 0)

      refs.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1)

      refs.uniforms = {
        u_resolution: { value: [window.innerWidth, window.innerHeight] },
        u_time: { value: 0.0 },
        u_mouse: { value: [0.5, 0.5] },
      }

      const position = [
        -1.0, -1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0,  1.0, 0.0,
      ]

      const uvs = [
        0.0, 0.0,
        1.0, 0.0,
        0.0, 1.0,
        1.0, 0.0,
        0.0, 1.0,
        1.0, 1.0,
      ]

      const positions = new THREE.BufferAttribute(new Float32Array(position), 3)
      const uvAttribute = new THREE.BufferAttribute(new Float32Array(uvs), 2)
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute("position", positions)
      geometry.setAttribute("uv", uvAttribute)

      const material = new THREE.RawShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: refs.uniforms,
        side: THREE.DoubleSide,
        transparent: true, 
      })

      refs.mesh = new THREE.Mesh(geometry, material)
      refs.scene.add(refs.mesh)

      handleResize()
    }

    const animate = () => {
      if (refs.uniforms) {
        refs.uniforms.u_time.value += 0.01
        refs.uniforms.u_mouse.value = [mousePos.x, mousePos.y]
      }
      if (refs.renderer && refs.scene && refs.camera) {
        refs.renderer.render(refs.scene, refs.camera)
      }
      refs.animationId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      if (!refs.renderer || !refs.uniforms) return
      const width = window.innerWidth
      const height = window.innerHeight
      refs.renderer.setSize(width, height, false)
      refs.uniforms.u_resolution.value = [width, height]
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = 1.0 - (event.clientY - rect.top) / rect.height
      setMousePos({ x, y })
    }

    initScene()
    animate()
    window.addEventListener("resize", handleResize)
    canvas.addEventListener("mousemove", handleMouseMove)

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId)
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      if (refs.mesh) {
        refs.scene?.remove(refs.mesh)
        refs.mesh.geometry.dispose()
        if (refs.mesh.material instanceof THREE.Material) {
          refs.mesh.material.dispose()
        }
      }
      refs.renderer?.dispose()
    }
  }, [mousePos.x, mousePos.y])

  return (
    <canvas
      ref={canvasRef}
      className="top-0 left-0 w-full h-full block"
    />
  )
}