import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { CursorState } from '../types';

interface CustomCursorProps {
  cursorState: CursorState;
}

export default function CustomCursor({ cursorState }: CustomCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  // Use MotionValues for high-performance coordinate tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Set up springs to create a smooth trailing effect for the OUTER ring
  const outerSpringConfig = { damping: 30, stiffness: 220, mass: 0.6 };
  const outerX = useSpring(mouseX, outerSpringConfig);
  const outerY = useSpring(mouseY, outerSpringConfig);

  // Snappy spring for the INNER dot
  const innerSpringConfig = { damping: 45, stiffness: 600, mass: 0.2 };
  const innerX = useSpring(mouseX, innerSpringConfig);
  const innerY = useSpring(mouseY, innerSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Only show after first movement and if on a screen with pointer input
      if (!isVisible && window.matchMedia('(pointer: fine)').matches) {
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  const isHovered = cursorState.type !== 'default';
  const isView = cursorState.type === 'view';

  return (
    <>
      {/* 1. Snappy Inner Dot */}
      <motion.div
        id="custom-cursor-inner-dot"
        className="pointer-events-none fixed top-0 left-0 z-50 mix-blend-difference hidden md:block rounded-full bg-white"
        style={{
          x: innerX,
          y: innerY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? (isView ? 0 : 8) : 6,
          height: isHovered ? (isView ? 0 : 8) : 6,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />

      {/* 2. Trailing Outer Circle Aura */}
      <motion.div
        id="custom-cursor-outer-ring"
        className="pointer-events-none fixed top-0 left-0 z-50 hidden md:flex items-center justify-center rounded-full border border-white"
        style={{
          x: outerX,
          y: outerY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? (isView ? 96 : 48) : 28,
          height: isHovered ? (isView ? 96 : 48) : 28,
          backgroundColor: isView ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0)',
          borderColor: isHovered ? (isView ? 'rgba(255, 255, 255, 1)' : '#D4A24C') : 'rgba(255, 255, 255, 0.4)',
          mixBlendMode: isView ? 'normal' : 'difference',
          color: '#000',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      >
        {isView && (
          <motion.span
            id="cursor-text"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-sans tracking-widest uppercase font-bold text-black text-center leading-none"
          >
            {cursorState.text || 'GO →'}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
