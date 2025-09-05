"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { ReactNode } from "react";

interface AnimatedElementProps {
  children: ReactNode;
  className?: string;
  animationType?: 'fade-in' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale' | 'rotate-in' | 'float';
  delay?: number;
  threshold?: number;
}

export function AnimatedElement({
  children,
  className = "",
  animationType = 'fade-in',
  delay = 0,
  threshold = 0.1
}: AnimatedElementProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold });

  const animationClass = `animate-${animationType}`;
  const visibleClass = isVisible ? 'visible' : '';
  
  return (
    <div
      ref={ref}
      className={`${animationClass} ${visibleClass} ${className}`}
      style={{ 
        transitionDelay: delay ? `${delay}ms` : undefined 
      }}
    >
      {children}
    </div>
  );
}