"use client"
import { cn } from "@/lib/utils";
import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
 
interface ScratchToRevealProps {
  children: React.ReactNode;
  width: number;
  height: number;
  minScratchPercentage?: number; // Minimum percentage of scratched area to be considered as completed (Value between 0 and 100)
  className?: string;
  onComplete?: () => void;
}
 
const ScratchToReveal: React.FC<ScratchToRevealProps> = ({
  width,
  height,
  minScratchPercentage = 50,
  onComplete,
  children,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isComplete, setIsComplete] = useState(false); // New state to track completion
 
  const controls = useAnimation();
 
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      // Load and draw background image
      const image = new Image();
      image.onload = () => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      };
      image.src = "/about-me/chess-avatar/chess-cover.png"; // Update this path to your image
    }
  }, []);

  const checkCompletion = () => {
    if (isComplete) return; // Check if already completed
 
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      const totalPixels = pixels.length / 4;
      let clearPixels = 0;
 
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) clearPixels++;
      }
 
      const percentage = (clearPixels / totalPixels) * 100;
 
      if (percentage >= minScratchPercentage) {
        setIsComplete(true); // Set complete flag
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas to reveal everything
        
        // Hide the canvas to allow clicks to pass through
        if (canvas) {
          canvas.style.pointerEvents = 'none';
          canvas.style.opacity = '0';
        }
        
        startAnimation();
        if (onComplete) {
          onComplete();
        }
      }
    }
  };
  
 
  useEffect(() => {
    const handleDocumentMouseMove = (event: MouseEvent) => {
      if (!isScratching) return;
      scratch(event.clientX, event.clientY);
    };
 
    const handleDocumentTouchMove = (event: TouchEvent) => {
      if (!isScratching) return;
      const touch = event.touches[0];
      scratch(touch.clientX, touch.clientY);
    };
 
    const handleDocumentMouseUp = () => {
      setIsScratching(false);
      checkCompletion();
    };
 
    const handleDocumentTouchEnd = () => {
      setIsScratching(false);
      checkCompletion();
    };
 
    document.addEventListener("mousedown", handleDocumentMouseMove);
    document.addEventListener("mousemove", handleDocumentMouseMove);
    document.addEventListener("touchstart", handleDocumentTouchMove);
    document.addEventListener("touchmove", handleDocumentTouchMove);
    document.addEventListener("mouseup", handleDocumentMouseUp);
    document.addEventListener("touchend", handleDocumentTouchEnd);
    document.addEventListener("touchcancel", handleDocumentTouchEnd);
 
    return () => {
      document.removeEventListener("mousedown", handleDocumentMouseMove);
      document.removeEventListener("mousemove", handleDocumentMouseMove);
      document.removeEventListener("touchstart", handleDocumentTouchMove);
      document.removeEventListener("touchmove", handleDocumentTouchMove);
      document.removeEventListener("mouseup", handleDocumentMouseUp);
      document.removeEventListener("touchend", handleDocumentTouchEnd);
      document.removeEventListener("touchcancel", handleDocumentTouchEnd);
    };
  }, [isScratching, checkCompletion]);
 
  const handleMouseDown = () => setIsScratching(true);
 
  const handleTouchStart = () => setIsScratching(true);
 
  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left + 16; // offset to position the scratched circle with cursor
      const y = clientY - rect.top + 16;
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.fill();
    }
  };
 

 
  const startAnimation = () => {
    controls.start({
      scale: [1, 1.5, 1],
      rotate: [0, 10, -10, 10, -10, 0],
      transition: { duration: 0.5 },
    });
  };
 
  return (
    <motion.div
      className={cn("relative select-none ", className)}
      style={{
        width,
        height,
        cursor: "url('/about-me/cursor.svg'), auto",
      }}
      animate={controls}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="z-10 absolute left-0 top-0 rounded-lg"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      ></canvas>
      {children}
    </motion.div>
  );
};
 
export default ScratchToReveal;