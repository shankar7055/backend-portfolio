'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import { cn } from "@/lib/utils"

export const Pointer = ({
  children,
  className,
  name
}: {
  children: React.ReactNode
  className?: string
  name: string
}) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const ref = React.useRef<HTMLDivElement>(null)
  const [rect, setRect] = useState<DOMRect | null>(null)
  const [isInside, setIsInside] = useState<boolean>(false)

  useEffect(() => {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect())
    }
  }, [])

  return (
    <div
      onMouseLeave={() => setIsInside(false)}
      onMouseEnter={() => setIsInside(true)}
      onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
        if (rect) {
          const scrollX = window.scrollX
          const scrollY = window.scrollY
          x.set(e.clientX - rect.left + scrollX)
          y.set(e.clientY - rect.top + scrollY)
        }
      }}
      style={{
        cursor: 'none'
      }}
      ref={ref}
      className={cn('relative', className)}>
      <AnimatePresence>{isInside && <FollowPointer x={x} y={y} name={name} />}</AnimatePresence>
      {children}
    </div>
  )
}

export const FollowPointer = ({ x, y, name, style, ...props }: { x: any; y: any; name: string; style?: React.CSSProperties } & Omit<React.HTMLAttributes<HTMLDivElement>, 'style'>) => {
  const isStaticPosition = typeof x === 'number' && typeof y === 'number';

  return (
    <>
      <motion.div
        className="absolute z-50 h-4 w-4 rounded-full"
        style={{
          top: !isStaticPosition ? y : undefined,
          left: !isStaticPosition ? x : undefined,
          pointerEvents: 'none',
          ...style
        }}
        initial={{
          scale: 1,
          opacity: 1,
          x: isStaticPosition ? x : 0,
          y: isStaticPosition ? y : 0
        }}
        animate={{
          scale: 1,
          opacity: 1,
          x: isStaticPosition ? [
            x,
            x + 120,
            x + 80,
            x - 50,
            x - 150,
            x + 30,
            x + 200,
            x - 80,
            x + 40,
            x
          ] : 0,
          y: isStaticPosition ? [
            y,
            y - 60,
            y + 30,
            y - 90,
            y + 20,
            y + 80,
            y - 40,
            y + 60,
            y - 20,
            y
          ] : 0,
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: [0.25, 0.46, 0.45, 0.94], // Custom bezier curve for human-like movement
          times: [0, 0.1, 0.25, 0.35, 0.5, 0.6, 0.75, 0.85, 0.95, 1] // Non-uniform timing
        }}
        exit={{
          scale: 0,
          opacity: 0
        }}>
        <svg width="22" height="25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#a)">
            <path d="M7.5 18 5 5l11 6.5-5.5 1.5-3 5Z" fill="#007FFF"></path>
            <path d="M5.254 4.57 4.3 4.005l.209 1.09 2.5 13 .247 1.284.673-1.122 2.896-4.828 5.307-1.447 1.14-.31-1.018-.603-11-6.5Z" stroke="#fff" strokeLinecap="square">

            </path>
          </g>

        </svg>
        <div className="w-fit rounded-full bg-sky-500 px-2 py-1 text-white">{name || 'Andre'}</div>
      </motion.div>
    </>
  )
}
