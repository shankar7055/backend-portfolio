"use client";

import * as React from "react";
import Image from "next/image";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

interface BookProps {
  href: string;
  imageUrl: string;
  title: string;
  rotation?: number;
  alt?: string;
  width?: number;
  height?: number;
  backCoverColor?: string;
}

export function Book({
  imageUrl,
  title,
  rotation = 0,
  alt = "Book Cover",
  width = 140,
  height = 200,
  backCoverColor = "#01060f"
}: BookProps) {
  const pagesWidth = width * 0.20; // About 21.4% of book width
  const pagesOffset = width * 0.875;
  const pagesHeight = height * 0.95;

  return (
    <HoverCard openDelay={150} closeDelay={150}>
      <HoverCardTrigger asChild>
        <div
          className="relative [transform-style:preserve-3d] [transform:rotateY(0deg)] origin-left transition-transform duration-300 ease-out animate-[init_1s_ease_1] hover:[transform:rotateY(-20deg)_scale(1.03)_translateX(-2px)] focus:[transform:rotateY(-20deg)_scale(1.03)_translateX(-2px)]"
          style={{ width, height }}
        >
          <Image
            src={imageUrl}
            alt={alt}
            width={width}
            height={height}
            priority
            className="pointer-events-none absolute inset-0 rounded-r-sm rounded-l-[3px] [transform:translateZ(22.5px)] bg-[#01060f] [box-shadow:rgba(0,0,0,0.02)_0px_1px_1px_0px,rgba(0,0,0,0.1)_0px_4px_8px_-4px,rgba(0,0,0,0.03)_0px_16px_24px_-8px] object-cover"
          />

          {/* Book pages */}
          <div
            className="absolute left-0 top-[1px] mt-1 bg-gradient-to-r from-white via-[#f9f9f9] to-white"
            style={{
              width: pagesWidth,
              height: pagesHeight,
              transform: `translateX(${pagesOffset}px) rotateY(90deg)`
            }}
          />

          {/* Book back cover */}
          <div
            className={`absolute inset-0 rounded-r-sm [transform:translateZ(-22.5px)] ${backCoverColor} shadow-md`}
            style={{ width, height }}
          />
        </div>
      </HoverCardTrigger >

      <HoverCardContent
        sideOffset={20}
        className="[animation:none] transition-none !duration-0 [animation-duration:0s] [transition-duration:0s]"
        style={{ transform: `rotate(${rotation}deg)`, animationDuration: '0s', transitionDuration: '0s' }}
      >
        <p className="font-medium text-sm">{title}</p>
      </HoverCardContent>
    </HoverCard >
  );
}

Book.displayName = "Book";