import { motion, PanInfo, useDragControls, useMotionValue } from "framer-motion";
import React, { forwardRef, useImperativeHandle, useState, useEffect, useRef } from "react";

export interface DraggableWrapperRef {
  startDrag: (event: React.PointerEvent<HTMLDivElement>) => void;
}

interface DraggableWrapperProps {
  children: React.ReactNode;
  constraintsRef: React.RefObject<HTMLElement>;
  onFirstDrag?: () => void;
  initialX?: number;
  initialY?: number;
}

const DraggableWrapper = forwardRef<DraggableWrapperRef, DraggableWrapperProps>(
  ({ children, constraintsRef, onFirstDrag, initialX = 0, initialY = 0 }, ref) => {
    const [hasBeenDragged, setHasBeenDragged] = useState(false);
    const dragControls = useDragControls();

    // Motion values for trackpad & mouse panning
    const x = useMotionValue(initialX);
    const y = useMotionValue(initialY);
    const containerRef = useRef<HTMLDivElement>(null);

    // Cache bounds once — recomputed only on resize, not on every drag frame
    const cachedBounds = useRef<{ left: number; right: number; top: number; bottom: number } | null>(null);

    const computeBounds = () => {
      if (constraintsRef.current && containerRef.current) {
        const cW = constraintsRef.current.offsetWidth;
        const cH = constraintsRef.current.offsetHeight;
        const dW = containerRef.current.offsetWidth;
        const dH = containerRef.current.offsetHeight;
        cachedBounds.current = {
          left:   -(cW - dW) / 2,
          right:   (cW - dW) / 2,
          top:    -(cH - dH) / 2,
          bottom:  (cH - dH) / 2,
        };
      }
    };

    const clampToBounds = (nx: number, ny: number) => {
      const b = cachedBounds.current;
      if (!b) return;
      x.set(Math.max(b.left, Math.min(b.right, nx)));
      y.set(Math.max(b.top,  Math.min(b.bottom, ny)));
    };

    const handleDragStart = () => {
      computeBounds(); // compute once at start of each drag gesture
      if (!hasBeenDragged) {
        setHasBeenDragged(true);
        onFirstDrag?.();
      }
    };

    // Handle wheel and trackpad two-finger scroll
    useEffect(() => {
      computeBounds();

      const container = containerRef.current;
      if (!container) return;

      const handleWheel = (event: WheelEvent) => {
        const target = event.target as HTMLElement | null;
        if (target) {
          const hasNoDrag  = target.closest('[data-no-drag]');
          const isCard     = target.closest('[data-draggable-card]');
          const isScrollable = target.closest('.overflow-y-auto, .overflow-auto, .overflow-scroll');
          if (hasNoDrag || isCard || isScrollable) return;
        }

        event.preventDefault();

        const sensitivity = 0.8;
        const newX = x.get() + -event.deltaX * sensitivity;
        const newY = y.get() + -event.deltaY * sensitivity;
        clampToBounds(newX, newY);

        if (!hasBeenDragged) {
          setHasBeenDragged(true);
          onFirstDrag?.();
        }
      };

      const handleResize = () => computeBounds();

      container.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('resize', handleResize, { passive: true });

      return () => {
        container.removeEventListener('wheel', handleWheel);
        window.removeEventListener('resize', handleResize);
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasBeenDragged, onFirstDrag]);

    const handleDrag = (
      _event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ) => {
      clampToBounds(x.get() + info.delta.x, y.get() + info.delta.y);
    };

    const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement;
      const isCanvas = target.tagName === 'CANVAS';
      const hasNoDrag = target.closest('[data-no-drag]');
      const isDraggableCard = target.closest('[data-draggable-card]');
      const isButton = target.closest('button, a, input, select, textarea');

      if (isCanvas || hasNoDrag || isDraggableCard || isButton) return;

      dragControls.start(event.nativeEvent);
    };

    useImperativeHandle(ref, () => ({
      startDrag: (event: React.PointerEvent<HTMLDivElement>) => {
        dragControls.start(event.nativeEvent);
      },
    }));

    return (
      <motion.div
        ref={containerRef}
        drag
        dragListener={false}
        dragControls={dragControls}
        dragConstraints={constraintsRef}
        dragElastic={0}
        dragMomentum={false}
        dragTransition={{ power: 0, timeConstant: 0 }}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onPointerDown={handlePointerDown}
        className="cursor-move touch-none w-dvw h-dvh"
        style={{ x, y, willChange: 'transform' }}
      >
        {children}
      </motion.div>
    );
  }
);

DraggableWrapper.displayName = 'DraggableWrapper';

export default DraggableWrapper;