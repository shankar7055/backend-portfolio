import { motion, PanInfo, useAnimation, useDragControls, useMotionValue, useTransform } from "framer-motion";
import React, { forwardRef, useImperativeHandle, useState, useEffect, useRef } from "react";

export interface DraggableWrapperRef {
  startDrag: (event: React.PointerEvent<HTMLDivElement>) => void;
}

interface DraggableWrapperProps {
  children: React.ReactNode;
  constraintsRef: React.RefObject<HTMLElement>;
  onFirstDrag?: () => void;
}

const DraggableWrapper = forwardRef<DraggableWrapperRef, DraggableWrapperProps>(
  ({ children, constraintsRef, onFirstDrag }, ref) => {
    const [isDragging, setIsDragging] = useState(false);
    const [hasBeenDragged, setHasBeenDragged] = useState(false);
    const controls = useAnimation();
    const dragControls = useDragControls();
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

    // Motion values for trackpad gestures
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleDragStart = () => {
      setIsDragging(true);
      if (!hasBeenDragged) {
        setHasBeenDragged(true);
        onFirstDrag?.();
      }
    };

    const handleDragEnd = (
      event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ) => {
      setIsDragging(false);
    };

    // Handle two-finger trackpad gestures
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const handleWheel = (event: WheelEvent) => {
        // Check if this is likely a trackpad gesture (has deltaX and smoother values)
        const isTrackpad = Math.abs(event.deltaX) > 0 || event.deltaMode === 0;

        if (isTrackpad) {
          event.preventDefault();

          const sensitivity = 0.8;
          const deltaX = -event.deltaX * sensitivity;
          const deltaY = -event.deltaY * sensitivity;

          // Get current position
          const currentX = x.get();
          const currentY = y.get();

          // Calculate new position
          const newX = currentX + deltaX;
          const newY = currentY + deltaY;

          // Apply constraints similar to drag constraints
          if (constraintsRef.current && containerRef.current) {
            const constraintsRect = constraintsRef.current.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();

            // Calculate the bounds based on the difference between constraint and draggable element
            const bounds = {
              left: -(constraintsRect.width - containerRect.width) / 2,
              right: (constraintsRect.width - containerRect.width) / 2,
              top: -(constraintsRect.height - containerRect.height) / 2,
              bottom: (constraintsRect.height - containerRect.height) / 2,
            };

            const constrainedX = Math.max(bounds.left, Math.min(bounds.right, newX));
            const constrainedY = Math.max(bounds.top, Math.min(bounds.bottom, newY));

            x.set(constrainedX);
            y.set(constrainedY);
          } else {
            x.set(newX);
            y.set(newY);
          }

          // Trigger first drag callback if needed
          if (!hasBeenDragged) {
            setHasBeenDragged(true);
            onFirstDrag?.();
          }
        }
      };

      container.addEventListener('wheel', handleWheel, { passive: false });

      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }, [x, y, constraintsRef, hasBeenDragged, onFirstDrag]);

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

    useImperativeHandle(ref, () => ({
      startDrag: (event: React.PointerEvent<HTMLDivElement>) => {
        dragControls.start(event);
      },
    }));

    return (
      <motion.div
        ref={containerRef}
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
        style={{ x, y }} // Use motion values for trackpad gestures
        whileHover={{ cursor: 'auto' }}

      >
        {children}
      </motion.div>
    );
  }
);

DraggableWrapper.displayName = 'DraggableWrapper';

export default DraggableWrapper;