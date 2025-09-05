'use client'

import { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react'
import { Button } from '../ui/button'
import { EraserFilled } from '../icons/index'

interface Point {
  x: number
  y: number
  t: number
}

interface Stroke {
  points: Point[]
  color: string
  strokeWidth: number
}

interface TurbulenceCanvasProps {
  className?: string
  style?: React.CSSProperties
}

export interface TurbulenceCanvasRef {
  startHelloAnimation: () => void
  getElement: () => HTMLDivElement | null
  pauseAnimations?: () => void
  resumeAnimations?: () => void
}

const TurbulenceCanvas = forwardRef<TurbulenceCanvasRef, TurbulenceCanvasProps>(
  ({ className, style }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [strokeColor, setStrokeColor] = useState('#CC5DE8')
  const [strokeWidth, setStrokeWidth] = useState(8)

  const [isDrawing, setIsDrawing] = useState(false)
  const [points, setPoints] = useState<Point[]>([])
  const [allStrokes, setAllStrokes] = useState<Stroke[]>([
    {
      points: [
        { x: 8.69, y: 166.55, t: 0 },
        { x: 36.24, y: 151.24, t: 10 },
        { x: 61.34, y: 131.55, t: 20 },
        { x: 89.82, y: 98.03, t: 30 },
        { x: 109.20, y: 75.15, t: 40 },
        { x: 119.63, y: 49.02, t: 50 },
        { x: 120.12, y: 31.00, t: 60 },
        { x: 120.37, y: 17.60, t: 70 },
        { x: 113.84, y: 7.44, t: 80 },
        { x: 101.76, y: 7.44, t: 90 },
        { x: 88.36, y: 7.44, t: 100 },
        { x: 79.92, y: 17.60, t: 110 },
        { x: 74.71, y: 40.94, t: 120 },
        { x: 69.01, y: 66.58, t: 130 },
        { x: 64.79, y: 96.00, t: 140 },
        { x: 54.12, y: 190.36, t: 150 },
        { x: 55.16, y: 181.14, t: 0 },
        { x: 60.63, y: 133.11, t: 10 },
        { x: 81.41, y: 98.05, t: 20 },
        { x: 107.96, y: 98.05, t: 30 },
        { x: 123.84, y: 98.05, t: 40 },
        { x: 133.94, y: 110.70, t: 50 },
        { x: 131.07, y: 128.82, t: 60 },
        { x: 129.46, y: 139.49, t: 70 },
        { x: 127.59, y: 150.41, t: 80 },
        { x: 125.41, y: 163.06, t: 90 },
        { x: 122.87, y: 178.94, t: 100 },
        { x: 130.13, y: 191.35, t: 110 },
        { x: 152.12, y: 191.35, t: 120 },
        { x: 184.20, y: 191.35, t: 130 },
        { x: 219.19, y: 173.52, t: 140 },
        { x: 237.10, y: 145.92, t: 150 },
        { x: 243.20, y: 136.51, t: 160 },
        { x: 245.68, y: 128.07, t: 170 },
        { x: 245.93, y: 119.88, t: 180 },
        { x: 246.18, y: 105.00, t: 190 },
        { x: 237.74, y: 93.83, t: 200 },
        { x: 222.85, y: 93.83, t: 210 },
        { x: 203.99, y: 93.83, t: 220 },
        { x: 189.60, y: 115.17, t: 230 },
        { x: 189.60, y: 142.47, t: 240 },
        { x: 189.60, y: 171.75, t: 250 },
        { x: 205.48, y: 192.34, t: 260 },
        { x: 239.21, y: 192.34, t: 270 },
        { x: 285.07, y: 192.34, t: 280 },
        { x: 335.86, y: 137.29, t: 290 },
        { x: 359.20, y: 75.86, t: 300 },
        { x: 365.79, y: 58.51, t: 310 },
        { x: 368.26, y: 42.41, t: 320 },
        { x: 368.26, y: 31.15, t: 330 },
        { x: 368.26, y: 17.81, t: 340 },
        { x: 364.04, y: 7.56, t: 350 },
        { x: 352.13, y: 7.56, t: 360 },
        { x: 340.47, y: 7.56, t: 370 },
        { x: 332.78, y: 16.61, t: 380 },
        { x: 325.83, y: 30.91, t: 390 },
        { x: 317.69, y: 47.50, t: 400 },
        { x: 311.67, y: 71.42, t: 410 },
        { x: 309.20, y: 98.45, t: 420 },
        { x: 303.00, y: 166.30, t: 430 },
        { x: 316.90, y: 191.35, t: 440 },
        { x: 349.94, y: 191.35, t: 450 },
        { x: 390.00, y: 191.35, t: 460 },
        { x: 434.54, y: 135.53, t: 470 },
        { x: 457.29, y: 75.67, t: 480 },
        { x: 463.80, y: 58.51, t: 490 },
        { x: 466.28, y: 42.41, t: 500 },
        { x: 466.28, y: 31.15, t: 510 },
        { x: 466.28, y: 17.81, t: 520 },
        { x: 462.06, y: 7.56, t: 530 },
        { x: 450.15, y: 7.56, t: 540 },
        { x: 438.48, y: 7.56, t: 550 },
        { x: 430.79, y: 16.61, t: 560 },
        { x: 423.84, y: 30.91, t: 570 },
        { x: 415.70, y: 47.50, t: 580 },
        { x: 409.68, y: 71.42, t: 590 },
        { x: 407.22, y: 98.45, t: 600 },
        { x: 401.02, y: 166.30, t: 610 },
        { x: 414.91, y: 191.35, t: 620 },
        { x: 444.42, y: 191.35, t: 630 },
        { x: 473.87, y: 191.35, t: 640 },
        { x: 489.88, y: 165.67, t: 650 },
        { x: 499.47, y: 138.40, t: 660 },
        { x: 508.96, y: 111.45, t: 670 },
        { x: 520.62, y: 94.82, t: 680 },
        { x: 544.94, y: 94.82, t: 690 },
        { x: 565.04, y: 94.82, t: 700 },
        { x: 580.92, y: 109.71, t: 710 },
        { x: 580.92, y: 137.75, t: 720 },
        { x: 580.92, y: 168.77, t: 730 },
        { x: 560.79, y: 192.09, t: 740 },
        { x: 535.36, y: 192.34, t: 750 },
        { x: 512.98, y: 192.59, t: 760 },
        { x: 498.29, y: 174.48, t: 770 },
        { x: 499.77, y: 147.18, t: 780 },
        { x: 501.51, y: 116.91, t: 790 },
        { x: 519.87, y: 94.82, t: 800 },
        { x: 543.94, y: 94.82, t: 810 },
        { x: 557.84, y: 94.82, t: 820 },
        { x: 569.51, y: 101.00, t: 830 },
        { x: 578.68, y: 107.73, t: 840 },
        { x: 603.55, y: 125.87, t: 850 },
        { x: 622.71, y: 114.66, t: 860 },
        { x: 630.05, y: 96.72, t: 870 }
      ].map(p => ({ x: p.x * 0.4 + 55, y: p.y * 0.4 + 130, t: p.t })),
      color: '#597BD5',
      strokeWidth: 8
    }
  ])
  const [startTime, setStartTime] = useState(0)



  // Turbulence configuration
  const [turbulenceAmount, setTurbulenceAmount] = useState(0.65)
  const [turbulenceFrequency, setTurbulenceFrequency] = useState(50)
  const [turbulenceTime, setTurbulenceTime] = useState(20)
  const animationIdRef = useRef<number>()

  // Color options
  const colors = ['#69DB7C', '#4DABF7', '#CC5DE8', '#FF6B6B', '#FFD43B', '#51CF66', '#F59E0B']

  const [colorPanelVisible, setColorPanelVisible] = useState(false)
  const [controlsDepressed, setControlsDepressed] = useState(false)
  const [animatedPoints, setAnimatedPoints] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const animationIntervalRef = useRef<NodeJS.Timeout>()
  const [isPaused, setIsPaused] = useState(false)

  // Turbulence effect function
  const applyTurbulence = useCallback((x: number, y: number, t: number) => {
    if (turbulenceAmount <= 0) return { x, y }

    const offsetX =
      Math.sin(x * turbulenceFrequency + t * 0.01) *
      Math.sin(y * turbulenceFrequency * 0.5 + t * 0.02) *
      turbulenceAmount

    const offsetY =
      Math.sin(y * turbulenceFrequency + t * 0.015) *
      Math.sin(x * turbulenceFrequency * 0.5 + t * 0.025) *
      turbulenceAmount

    return {
      x: x + offsetX,
      y: y + offsetY
    }
  }, [turbulenceAmount, turbulenceFrequency])

  // Get coordinates from mouse/touch event
  const getCoordinates = useCallback((event: MouseEvent | TouchEvent): Point => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0, t: 0 }

    const rect = canvas.getBoundingClientRect()
    let clientX: number, clientY: number

    if ('touches' in event && event.touches.length > 0) {
      clientX = event.touches[0].clientX
      clientY = event.touches[0].clientY
    } else if ('clientX' in event) {
      clientX = event.clientX
      clientY = event.clientY
    } else {
      return { x: 0, y: 0, t: 0 }
    }

    // Get mouse position relative to canvas
    const rawX = clientX - rect.left
    const rawY = clientY - rect.top

    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const angle = 2 * Math.PI / 180
    
    // Translate to origin, rotate, then translate back
    const translatedX = rawX - centerX
    const translatedY = rawY - centerY
    
    const rotatedX = translatedX * Math.cos(angle) - translatedY * Math.sin(angle)
    const rotatedY = translatedX * Math.sin(angle) + translatedY * Math.cos(angle)
    
    const finalX = rotatedX + centerX  // Adjust for right shift
    const finalY = rotatedY + centerY // Adjust for bottom shift

    return {
      x: finalX,
      y: finalY,
      t: Date.now() - startTime
    }
  }, [startTime])

  // Drawing functions
  const startDrawing = useCallback((event: MouseEvent | TouchEvent) => {
    
    setPoints([])
    setStartTime(Date.now())

    const coords = getCoordinates(event)
    setPoints([{ ...coords, t: 0 }])
    setIsDrawing(true)

    event.preventDefault()
    event.stopPropagation()
    
  }, [getCoordinates])

  const draw = useCallback((event: MouseEvent | TouchEvent) => {
    if (!isDrawing) return

    const coords = getCoordinates(event)
    setPoints(prev => [...prev, coords])

    event.preventDefault()
    event.stopPropagation()
  }, [isDrawing, getCoordinates])

  const finishDrawing = useCallback(() => {
    if (!isDrawing) return

    setIsDrawing(false)

    if (points.length > 0) {
      const newStroke: Stroke = {
        points: [...points],
        color: strokeColor,
        strokeWidth: strokeWidth
      }
      setAllStrokes(prev => [...prev, newStroke])
    }

    setPoints([])
  }, [isDrawing, points, strokeColor, strokeWidth])

  // Rendering functions
  const redrawCurrentStroke = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    // Redraw all strokes first
    redrawAllStrokes()

    if (points.length === 0) return

    context.save()
    context.strokeStyle = strokeColor
    context.lineWidth = strokeWidth
    context.lineCap = 'round'
    context.lineJoin = 'round'

    if (points.length === 1) {
      context.fillStyle = strokeColor
      context.beginPath()
      const point = points[0]
      const turbulent = applyTurbulence(point.x, point.y, turbulenceTime)
      context.arc(turbulent.x, turbulent.y, strokeWidth / 2, 0, Math.PI * 2)
      context.fill()
    } else {
      context.beginPath()
      const firstPoint = points[0]
      const firstTurbulent = applyTurbulence(firstPoint.x, firstPoint.y, turbulenceTime)
      context.moveTo(firstTurbulent.x, firstTurbulent.y)

      for (let i = 1; i < points.length; i++) {
        const point = points[i]
        const turbulent = applyTurbulence(point.x, point.y, turbulenceTime)
        context.lineTo(turbulent.x, turbulent.y)
      }

      context.stroke()
    }

    context.restore()
  }, [points, strokeColor, strokeWidth, applyTurbulence, turbulenceTime])

  const redrawAllStrokes = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    context.clearRect(0, 0, canvas.width, canvas.height)

    for (let strokeIndex = 0; strokeIndex < allStrokes.length; strokeIndex++) {
      const stroke = allStrokes[strokeIndex]

      // For the first stroke (hello animation), limit points based on animation
      const pointsToShow = strokeIndex === 0 ? Math.min(animatedPoints, stroke.points.length) : stroke.points.length

      if (pointsToShow <= 0) continue

      context.save()
      context.strokeStyle = stroke.color
      context.lineWidth = stroke.strokeWidth
      context.lineCap = 'round'
      context.lineJoin = 'round'

      if (pointsToShow === 1) {
        context.fillStyle = stroke.color
        context.beginPath()
        const point = stroke.points[0]
        const turbulent = applyTurbulence(point.x, point.y, turbulenceTime)
        context.arc(turbulent.x, turbulent.y, stroke.strokeWidth / 2, 0, Math.PI * 2)
        context.fill()
      } else if (pointsToShow > 1) {
        context.beginPath()
        const firstPoint = stroke.points[0]
        const firstTurbulent = applyTurbulence(firstPoint.x, firstPoint.y, turbulenceTime)
        context.moveTo(firstTurbulent.x, firstTurbulent.y)

        for (let i = 1; i < pointsToShow; i++) {
          const point = stroke.points[i]
          const turbulent = applyTurbulence(point.x, point.y, turbulenceTime)
          context.lineTo(turbulent.x, turbulent.y)
        }

        context.stroke()
      }

      context.restore()
    }
  }, [allStrokes, applyTurbulence, turbulenceTime, animatedPoints])

  // Animation loop for turbulence
  const startTurbulenceAnimation = useCallback(() => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current)
    }

    const animate = () => {
      if (!isPaused) {
        setTurbulenceTime(prev => prev + 25)

        if (allStrokes.length > 0 || isDrawing) {
          if (isDrawing) {
            redrawCurrentStroke()
          } else {
            redrawAllStrokes()
          }
        }
      }

      animationIdRef.current = requestAnimationFrame(animate)
    }

    animationIdRef.current = requestAnimationFrame(animate)
  }, [allStrokes.length, isDrawing, redrawCurrentStroke, redrawAllStrokes, isPaused])

  // Control handlers
  const handleColorSelect = (color: string) => {
    setStrokeColor(color)
    setColorPanelVisible(false)
    setControlsDepressed(false)
  } 
  const handleClearCanvas = () => {
    setAllStrokes([])
    setPoints([])
  }

  const toggleColorPanel = () => {
    setColorPanelVisible(!colorPanelVisible)
    setControlsDepressed(!colorPanelVisible)
  }

  const toggleStrokePanel = () => {
    setColorPanelVisible(false)
  }

  // Animation functions
  const startHelloAnimation = useCallback(() => {
    if (isAnimating) return

    setIsAnimating(true)
    setAnimatedPoints(0)

    const totalPoints = allStrokes[0]?.points.length || 0
    let currentPoint = 0

    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current)
    }

    animationIntervalRef.current = setInterval(() => {
      currentPoint++
      setAnimatedPoints(currentPoint)

      if (currentPoint >= totalPoints) {
        clearInterval(animationIntervalRef.current!)
        setIsAnimating(false)
      }
    }, 50) // 50ms per point for smooth animation
  }, [isAnimating, allStrokes])

  // Initialize canvas and event listeners
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    // Set up canvas dimensions and DPI scaling
    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    canvas.width = 360 * dpr
    canvas.height = 360 * dpr
    context.scale(dpr, dpr)

    canvas.style.width = '360px'
    canvas.style.height = '360px'

    // Mouse events
    const handleMouseDown = (e: MouseEvent) => {
      
      e.stopPropagation()
      
      startDrawing(e)
    }
    const handleMouseMove = (e: MouseEvent) => {
      e.stopPropagation()
      draw(e)
    }
    const handleMouseUp = () => finishDrawing()
    const handleMouseLeave = () => finishDrawing()

    // Touch events
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      e.stopPropagation()
      startDrawing(e)
    }
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      e.stopPropagation()
      draw(e)
    }
    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault()
      e.stopPropagation()
      finishDrawing()
    }

    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false })
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false })

    startTurbulenceAnimation()

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseup', handleMouseUp)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('touchstart', handleTouchStart)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchend', handleTouchEnd)

      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [startDrawing, draw, finishDrawing, startTurbulenceAnimation])

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    startHelloAnimation,
    getElement: () => containerRef.current
  }), [startHelloAnimation])

  return (
    <div ref={containerRef} className="w-full h-full">
      <div className="relative w-full h-full mx-auto border border-4 border-[#CEB990] bg-[#ECDDC0] rounded-lg ">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 cursor-crosshair w-full h-full"
          style={{ touchAction: 'none' }}
        />

        {/* Controls */}
        <div
          className={`absolute bottom-4 left-4 right-4 h-10 flex gap-2 justify-end pointer-events-none transition-all duration-300
            }`}
        >
          <div className="flex gap-2 items-center pointer-events-auto">
            <Button
              onClick={handleClearCanvas}
              variant={"ghost"}
              className='group size-10 p-1.5 bg-white hover:bg-white hover:scale-110 transition-transform"'
            >
              <EraserFilled className="text-black group-hover:text-gray-600"/>
            </Button>
          </div>


          <div className="flex gap-2 items-center pointer-events-auto">
            {/* Color Selector */}
            <Button
              onClick={toggleColorPanel}
              variant={"ghost"}
              className="border border-white border-4 hover:scale-110 transition-transform"
              style={{ backgroundColor: strokeColor }}
            />
          </div>
        </div>

        {/* Color Panel */}
        {colorPanelVisible && (
          <div className="absolute bottom-16 right-4 pointer-events-auto">
            <div className="flex flex-col gap-2 items-center">
              {colors.filter(color => color !== strokeColor).map((color, index) => (
                <button
                  key={color}
                  onClick={() => handleColorSelect(color)}
                  className="w-10 h-10 rounded-md border border-white border-4 cursor-pointer hover:scale-110 transition-all duration-300 animate-in slide-in-from-bottom opacity-0 ease-in"
                  style={{ 
                    backgroundColor: color,
                    animationDelay: `${(colors.length - 1 - index) * 60}ms`,
                    animationFillMode: 'forwards'
                  }}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
  }
)

TurbulenceCanvas.displayName = 'TurbulenceCanvas'

export default TurbulenceCanvas