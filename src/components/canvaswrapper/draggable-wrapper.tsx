import { motion, PanInfo, useAnimation, useDragControls } from "framer-motion";
import React, { forwardRef, useImperativeHandle, useState } from "react";

export interface DraggableWrapperRef {
  startDrag: (event: React.PointerEvent<HTMLDivElement>) => void;
}

interface DraggableWrapperProps {
  children: React.ReactNode;
  constraintsRef: React.RefObject<HTMLElement>;
}

const DraggableWrapper = forwardRef<DraggableWrapperRef, DraggableWrapperProps>(
  ({ children, constraintsRef }, ref) => {
    const [isDragging, setIsDragging] = useState(false);
    const controls = useAnimation();
    const dragControls = useDragControls();
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

    const handleDragStart = () => {
      setIsDragging(true);      
    };

    const handleDragEnd = (
      event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ) => {
      setIsDragging(false);
    };

    const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
      // Check if the clicked element is interactive
      const target = event.target as HTMLElement;
      const isCanvas = target.tagName === 'CANVAS';
      const hasNoDrag = target.closest('[data-no-drag]');
      const isDraggableCard = target.closest('[data-draggable-card]');
      const isInteractive = isCanvas || hasNoDrag || isDraggableCard;
      
      if (isInteractive) {
        
        return; // Don't start drag
      }
      
      
      dragControls.start(event);
    };

    return (
      <motion.div
        drag
        dragListener={false} // Disable automatic drag listener
        dragControls={dragControls} // Use manual drag controls
        dragConstraints={constraintsRef}
        dragElastic={0}
        dragMomentum={false}
        dragTransition={{ power: 0.2, timeConstant: 100 }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onPointerDown={handlePointerDown}
        className="cursor-move touch-none w-dvw h-dvh"
        whileTap={{ cursor: 'grabbing' }}
        whileHover={{ cursor: 'auto' }}
        
      >
        {children}
      </motion.div>
    );
  }
);

DraggableWrapper.displayName = 'DraggableWrapper';

export default DraggableWrapper;