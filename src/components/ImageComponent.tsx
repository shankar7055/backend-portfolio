"use client"
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'


export default function ImageComponent({ src, alt, className, width, height, priority, ...attributes }: {
    src: string;
    alt?: string;
    className?: string;
    width: number;
    height: number;
    priority?: boolean;
}) {
  const [isZoomedIn, setIsZoomedIn] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const [transform, setTransform] = useState({
    left: 0,
    top: 0,
    scale: 1
  })

  const [zIndex, setZIndex] = useState('')
  const [showOverlay, setShowOverlay] = useState(false)
  const [overlayExiting, setOverlayExiting] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', zoomOut)

    return () => {
      window.removeEventListener('scroll', zoomOut)
    }
  }, [])

  function toggleZoom() {
    if (isZoomedIn) {
      zoomOut()
      return
    }

    if (!imageRef.current) return

    const rect = imageRef.current.getBoundingClientRect()

    const targetWidth = Math.min(
      window.innerWidth * 0.85,
      imageRef.current.naturalWidth
    )
    const targetHeight = Math.min(
      window.innerHeight * 0.85,
      imageRef.current.naturalHeight
    )

    const scaleX = targetWidth / imageRef.current.clientWidth
    const scaleY = targetHeight / imageRef.current.clientHeight
    const scale = Math.min(scaleX, scaleY)
    const newWidth = imageRef.current.clientWidth * scale
    const newHeight = imageRef.current.clientHeight * scale

    setTransform({
      left: -rect.left + window.innerWidth / 2 - newWidth / 2,
      top: -rect.top + window.innerHeight / 2 - newHeight / 2,
      scale
    })
    setZIndex('50')
    setIsZoomedIn(true)
    setShowOverlay(true)
  }

  function zoomOut() {
    setTransform({
      left: 0,
      top: 0,
      scale: 1
    })
    setIsZoomedIn(false)
    setOverlayExiting(true)

    // Hide overlay after exit animation completes
    setTimeout(() => {
      setShowOverlay(false)
      setOverlayExiting(false)
    }, 400)
  }

  if (!src) return null;

  return (
    <>
      {showOverlay && (
        <div
          className="fixed inset-0 z-40"
          onClick={zoomOut}
          style={{
            animation: overlayExiting
              ? 'overlayFadeOut 0.3s ease-out forwards'
              : 'overlayFadeIn 0.4s ease-out 0.1s forwards',
            opacity: 0,
            backdropFilter: 'blur(0px)'
          }}
        />
      )}
      <style jsx>{`
        @keyframes overlayFadeIn {
          from {
            opacity: 0;
            backdrop-filter: blur(0px);
          }
          to {
            opacity: 1;
            backdrop-filter: blur(8px);
          }
        }
        @keyframes overlayFadeOut {
          from {
            opacity: 1;
            backdrop-filter: blur(8px);
          }
          to {
            opacity: 0;
            backdrop-filter: blur(0px);
          }
        }
      `}</style>
    <img
      ref={imageRef}
      src={src}
      alt={alt || ''}
      className={className}
      width={width}
      height={height}
      onClick={toggleZoom}
      style={{
        transition: '0.4s ease-in-out transform',
        transformOrigin: 'left top',
        cursor: isZoomedIn ? 'zoom-out' : 'zoom-in',
        transform: `translate(${transform.left}px, ${transform.top}px) scale(${transform.scale})`,
        position: 'relative',
        zIndex
      }}
      onTransitionEnd={() => {
        if (!isZoomedIn) {
          setZIndex('')
        }
      }}
    />
    </>
  )
}