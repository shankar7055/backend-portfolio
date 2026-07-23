"use client";

import * as React from "react";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import DraggableWrapper, { type DraggableWrapperRef } from "@/components/canvaswrapper/draggable-wrapper";
import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/draggable-card";
import { Badge } from "@/components/ui/badge";
import Clock from "@/components/clock/clock";
import { FollowPointer } from "@/components/cursor/animated-cursor";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Linkedin, Github, Mail } from "@/components/icons";
import { Album } from "@/components/ui/album";
import TurbulenceCanvas, { type TurbulenceCanvasRef } from "@/components/canvas";
import dynamic from "next/dynamic";

const FolderWindowContent = dynamic(
  () => import("@/components/finder-window").then((mod) => mod.FolderWindowContent),
  { ssr: false }
);

const draggableImages = [
  {
    id: 1,
    src: "/about-me/image-1.jpg",
    alt: "Swans",
    className: "w-full max-w-[200px]",
    rotate: "rotate-[-12deg]",
    position: "col-start-1 row-start-1 left-[20px] top-[40px]",
  },
  {
    id: 2,
    src: "/about-me/image-2.jpg",
    alt: "View",
    className: "w-full max-w-[200px]",
    rotate: "rotate-[9deg]",
    position: "col-start-3 row-start-1 left-[48px] top-[40px]",
  },
  {
    id: 3,
    src: "/about-me/image-3.jpg",
    alt: "Snow",
    className: "w-full max-w-[200px]",
    rotate: "rotate-[-15deg]",
    position: "col-start-5 row-start-1 left-[8px] top-[40px]",
  },
  {
    id: 4,
    src: "/about-me/image-4.jpg",
    alt: "Me",
    className: "w-full max-w-[200px]",
    rotate: "rotate-[11deg]",
    position: "col-start-7 row-start-1 left-[4px] top-[40px]",
  },
];

export default function Home() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<DraggableWrapperRef>(null);
  const turbulenceRef = useRef<TurbulenceCanvasRef>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      turbulenceRef.current?.startHelloAnimation();
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="w-full h-full fixed select-none scrollbar-none">
      <div ref={constraintsRef} className="absolute flex items-center justify-center w-[3200px] h-[2760px] left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
        <DraggableWrapper
          ref={draggableRef}
          constraintsRef={constraintsRef as React.RefObject<HTMLElement>}
          initialX={816}
          initialY={540}
        >

          <div id="mat-texture" className="absolute overflow-hidden rounded-lg border-[4px] border-[#47bfa0] bg-[#0a966e] w-[3200px] h-[2760px] left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] shadow-lg bg-linear-grid bg-[size:16px_16px] bg-[position:12px_12px]">
            <div id="window" className=" z-10 opacity-[0.6] absolute w-full h-full left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] bg-cover bg-[url(/about-me/Layer-window.png)] pointer-events-none"></div>
            <div id="lines" className="absolute w-full h-full left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] bg-linear-big-grid bg-[size:80px_80px] bg-[position:-4px_-4px] pointer-events-none"></div>
            <div id="diagonal-lines" className="absolute w-full h-full left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] bg-diagonal-grid bg-[size:80px_80px] bg-[position:-2.5px_-2.5px] pointer-events-none"></div>
          </div>

          <div className="absolute orchestration grid gap-4 grid-cols-[repeat(8,360px)] grid-rows-[repeat(7,360px)] w-[2992px] h-[2620px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

            <FollowPointer style={{ "--stagger": 14 } as React.CSSProperties} x={900} y={200} name="Shankar"></FollowPointer>

            {/* CARD 1: Turbulence Canvas "Hello" Drawing Card (Restored 120px gap from Polaroid 1) */}
            <div style={{ "--stagger": 12 } as React.CSSProperties} className="select-none col-start-1 row-start-2 relative rounded-2xl w-[360px] h-[360px] left-[20px] top-[40px] shadow-lg overflow-hidden border border-stone-300/40" data-no-drag>
              <TurbulenceCanvas
                ref={turbulenceRef}
                className="!rounded-2xl bg-[#F5E6CA] cursor-pointer w-full h-full"
              />
            </div>

            {/* CARD 2: My Details Card */}
            <div className="orchestration select-none flex flex-col gap-2 relative rounded-lg col-start-2 row-start-2 col-span-2 row-span-2 left-[124px] top-[20px] sm:w-[568px] shadow-lg h-fit">
              <div style={{ "--stagger": 1 } as React.CSSProperties} className="select-none flex flex-col gap-2 sm:gap-4 bg-component relative rounded-lg w-full sm:w-[568px] shadow-lg p-6 h-fit">
                <div className="flex gap-3 items-center">
                  <Avatar className="size-12 sm:size-14">
                    <AvatarImage src="/profilePicture.png" alt="Profile Picture" />
                    <AvatarFallback>S</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-1 justify-between items-center">
                    <div className="flex flex-col">
                      <p className="text-base sm:text-xl font-medium"> Shankar </p>
                      <p className="text-base font-medium text-muted-foreground"> Backend Developer </p>
                    </div>

                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <span className="text-sm sm:text-base leading-relaxed">
                    Welcome to <em>my space on the internet.</em> Building software that coordinates, remembers, and reasons.
                  </span>

                  <p className="text-sm sm:text-base leading-relaxed">Have fun exploring my portfolio, and feel free to connect below.</p>

                  <div className="flex flex-row gap-4">
                    <Button asChild variant="secondary" size="sm" className="gap-2">
                      <Link href="https://www.linkedin.com/in/shankar70/" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-5 h-5" />
                        <span className="hidden sm:inline">Linkedin</span>
                      </Link>
                    </Button>
                    <Button asChild variant="secondary" size="sm" className="gap-2">
                      <Link href="https://github.com/shankar7055" target="_blank" rel="noopener noreferrer">
                        <Github className="w-5 h-5" />
                        <span className="hidden sm:inline">GitHub</span>
                      </Link>
                    </Button>
                    <Button asChild variant="secondary" size="sm" className="gap-2">
                      <Link href="mailto:work.shankar70@gmail.com" target="_blank" rel="noopener noreferrer">
                        <Mail className="w-5 h-5" />
                        <span className="hidden sm:inline">Mail</span>
                      </Link>
                    </Button>
                  </div>
                </div>

                <Separator className="grow my-1.5 sm:my-2 shrink mix-blend-multiply dark:mix-blend-lighten bg-transparent border-t-[1px] border-dashed"></Separator>

                <ul className="flex flex-col gap-4">
                  <li className="flex flex-row gap-4 inline-flex items-center justify-center">
                    <div className="hidden sm:block h-10 w-10 flex-none inline-flex items-center justify-center rounded-sm bg-[#1798D5]"></div>
                    <div className="flex flex-row w-full justify-between sm:items-center gap-4">
                      <div className="flex flex-col">
                        <span className="text-sm sm:text-base font-medium"> Atomic Media </span>
                        <span className="text-sm text-muted-foreground"> Backend Intern </span>
                      </div>
                      <Badge variant="secondary" className="tabular text-xs font-normal text-muted-foreground w-fit">May – Jul 2025</Badge>
                    </div>
                  </li>

                  <li className="flex flex-row gap-4 inline-flex items-center justify-center">
                    <div className="hidden sm:block size-10 flex-none inline-flex items-center justify-center rounded-sm bg-[#00A868]"></div>
                    <div className="flex flex-row w-full justify-between sm:items-center gap-4">
                      <div className="flex flex-col">
                        <span className="text-sm sm:text-base font-medium"> Axevron Digital Solutions </span>
                        <span className="text-sm text-muted-foreground"> Backend Intern </span>
                      </div>
                      <Badge variant="secondary" className="tabular text-xs font-normal text-muted-foreground w-fit">Apr – Jul 2024</Badge>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* CARD 3: Education Card */}
            <div style={{ "--stagger": 39 } as React.CSSProperties} className="select-none flex flex-col gap-2 relative rounded-lg col-start-5 row-start-2 col-span-2 row-span-2 left-[8px] top-[20px] sm:w-[568px] shadow-lg h-fit">
              <div className="select-none flex flex-col gap-4 bg-component relative rounded-lg w-full sm:w-[568px] shadow-lg p-6 h-fit">
                <p className="font-medium text-lg">Education</p>
                <ul className="flex flex-col gap-4">
                  <li className="flex flex-row gap-4 inline-flex items-center justify-center">
                    <div className="hidden sm:block h-10 w-10 flex-none inline-flex items-center justify-center rounded-sm bg-[#1474FF]"></div>
                    <div className="w-full flex flex-col gap-4">
                      <div className="flex flex-row w-full justify-between gap-8 items-center justify-center">
                        <div className="flex flex-col">
                          <span className="font-medium"> Amity University </span>
                          <span className="text-sm text-muted-foreground"> B.Tech Computer Science </span>
                        </div>
                        <Badge variant="secondary" className="shrink-0 tabular text-xs font-normal text-muted-foreground"></Badge>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* CARD 4: Projects (Mac Finder Window) */}
            <div style={{ "--stagger": 38 } as React.CSSProperties} className="select-none relative col-start-1 row-start-4 col-span-6 row-span-2 w-[1200px] h-[700px] top-[20px] left-[20px]">
              <FolderWindowContent />
            </div>

            {/* CLOCK / TIMER CARD */}
            <div style={{ "--stagger": 15 } as React.CSSProperties} className="select-none col-start-5 col-span-2 row-start-3 relative flex items-center justify-center p-4 rounded-2xl bg-component/90 border border-stone-300/40 shadow-lg w-[360px] h-[160px] left-[8px] top-[108px]">
              <Clock />
            </div>

            {/* POLAROID PHOTOS */}
            {draggableImages.map((item) => (
              <DraggableCardContainer
                key={item.id}
                className={`${item.className} ${item.rotate} ${item.position}`}
                style={{ "--stagger": item.id + 2 } as React.CSSProperties}
              >
                <DraggableCardBody>
                  <div className="select-none max-w-[190px] pb-10 bg-white p-2 shadow-lg">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={223}
                      height={254}
                      className="pointer-events-none"
                    />
                  </div>
                </DraggableCardBody>
              </DraggableCardContainer>
            ))}

            {/* STICKERS & STAMPS */}
            <Image draggable="false" loading="lazy" style={{ "--stagger": 10 } as React.CSSProperties} className="select-none relative w-36 col-start-1 row-start-1 left-[260px] top-[40px] rotate-[-18deg]" width={600} height={600} src="/about-me/stickers/Ken.png" alt="Ken Sticker" />

            {/* India Stamp (Moved to Zone 2 at x=760) */}
            <Image style={{ "--stagger": 36 } as React.CSSProperties} draggable="false" loading="lazy" className="shadow-lg select-none relative col-start-3 row-start-1 left-[8px] top-[40px] rotate-[9deg]" width={140} height={139} src="/about-me/stickers/india-stamp.png" alt="India Stamp" />

            <Image style={{ "--stagger": 8 } as React.CSSProperties} draggable="false" loading="lazy" className="pointer-events-none select-none relative col-start-3 row-start-1 left-[348px] top-[40px] rotate-[15deg]" width={80} height={70} src="/about-me/stickers/vercel.png" alt="Vercel" />

            {/* One Piece Ramen Animated GIF Sticker */}
            <Image style={{ "--stagger": 12 } as React.CSSProperties} draggable="false" unoptimized className="pointer-events-none select-none relative col-start-4 row-start-1 left-[140px] top-[40px] rotate-[-6deg] drop-shadow-md" width={130} height={130} src="/about-me/stickers/One Piece Ramen Sticker.gif" alt="One Piece Ramen Sticker" />

            <Image style={{ "--stagger": 14 } as React.CSSProperties} draggable="false" loading="lazy" className="rotate-[-14deg] pointer-events-none select-none relative col-start-5 row-start-1 left-[308px] top-[40px]" width={280} height={75} src="/about-me/stickers/next-js.png" alt="Next.js" />

            <Image style={{ "--stagger": 16 } as React.CSSProperties} draggable="false" loading="lazy" className="select-none pointer-events-none relative col-start-8 row-start-1 left-[0px] top-[40px] rotate-[10deg]" width={140} height={124} src="/about-me/stickers/react.png" alt="React" />

            <Image style={{ "--stagger": 11 } as React.CSSProperties} draggable="false" loading="lazy" className="select-none pointer-events-none relative col-start-1 row-start-6 left-[300px] top-[40px] rotate-[36deg]" width={98} height={160} src="/about-me/stickers/mario.png" alt="Mario" />

            <svg style={{ "--stagger": 15 } as React.CSSProperties} className="select-none relative col-start-2 row-start-6 left-[124px] top-[40px] border-4 border-white rounded-lg rotate-[-8deg]" width="127" height="57" viewBox="0 0 138 57" aria-label="MDX" role="img">
              <rect height="55.5" rx="4.5" width="136.5" x=".75" y=".75"></rect>
              <g fill="none" stroke="#fff" strokeWidth="6">
                <path d="M16.5 44V19L30.25 32.75l14-14v25"></path>
                <path d="M70.5 40V10.75"></path>
                <path d="M57 27.25L70.5 40.75l13.5-13.5"></path>
                <path d="M122.5 41.24L93.25 12M93.5 41.25L122.75 12"></path>
              </g>
            </svg>

            <svg style={{ "--stagger": 40 } as React.CSSProperties} className="select-none border-white border-4 rounded-lg relative col-start-3 row-start-6 left-[48px] top-[40px] rotate-[12deg]" xmlns="http://www.w3.org/2000/svg" fill="none" width="90" height="90" viewBox="0 0 512 512">
              <rect className="rounded-lg" fill="#3178c6" height="512" width="512" />
              <path clipRule="evenodd" d="m316.939 407.424v50.061c8.138 4.172 17.763 7.3 28.875 9.386s22.823 3.129 35.135 3.129c11.999 0 23.397-1.147 34.196-3.442 10.799-2.294 20.268-6.075 28.406-11.342 8.138-5.266 14.581-12.15 19.328-20.65s7.121-19.007 7.121-31.522c0-9.074-1.356-17.026-4.069-23.857s-6.625-12.906-11.738-18.225c-5.112-5.319-11.242-10.091-18.389-14.315s-15.207-8.213-24.18-11.967c-6.573-2.712-12.468-5.345-17.685-7.9-5.217-2.556-9.651-5.163-13.303-7.822-3.652-2.66-6.469-5.476-8.451-8.448-1.982-2.973-2.974-6.336-2.974-10.091 0-3.441.887-6.544 2.661-9.308s4.278-5.136 7.512-7.118c3.235-1.981 7.199-3.52 11.894-4.615 4.696-1.095 9.912-1.642 15.651-1.642 4.173 0 8.581.313 13.224.938 4.643.626 9.312 1.591 14.008 2.894 4.695 1.304 9.259 2.947 13.694 4.928 4.434 1.982 8.529 4.276 12.285 6.884v-46.776c-7.616-2.92-15.937-5.084-24.962-6.492s-19.381-2.112-31.066-2.112c-11.895 0-23.163 1.278-33.805 3.833s-20.006 6.544-28.093 11.967c-8.086 5.424-14.476 12.333-19.171 20.729-4.695 8.395-7.043 18.433-7.043 30.114 0 14.914 4.304 27.638 12.912 38.172 8.607 10.533 21.675 19.45 39.204 26.751 6.886 2.816 13.303 5.579 19.25 8.291s11.086 5.528 15.415 8.448c4.33 2.92 7.747 6.101 10.252 9.543 2.504 3.441 3.756 7.352 3.756 11.733 0 3.233-.783 6.231-2.348 8.995s-3.939 5.162-7.121 7.196-7.147 3.624-11.894 4.771c-4.748 1.148-10.303 1.721-16.668 1.721-10.851 0-21.597-1.903-32.24-5.71-10.642-3.806-20.502-9.516-29.579-17.13zm-84.159-123.342h64.22v-41.082h-179v41.082h63.906v182.918h50.874z" fill="#fff" fillRule="evenodd" />
            </svg>

            {/* MUSIC ALBUMS */}
            <div style={{ "--stagger": 31 } as React.CSSProperties} className="select-none w-fit h-fit relative col-start-7 row-start-2 rotate-[14deg] left-[4px] top-[20px]">
              <Album
                albumCover="/about-me/album_covers/alot.png"
                albumTitle="a lot"
                artist="21 Savage"
                musicFile="/about-me/songs/alot.mp3"
                size="md"
              />
            </div>

            <div style={{ "--stagger": 32 } as React.CSSProperties} className="select-none w-fit h-fit relative col-start-8 row-start-2 rotate-[-9deg] left-[0px] top-[20px]">
              <Album
                albumCover="/about-me/album_covers/rubberband.png"
                albumTitle="rubberband"
                artist="Tate McRae"
                musicFile="/about-me/songs/Rubberband.mp3"
                size="md"
              />
            </div>

            <div style={{ "--stagger": 33 } as React.CSSProperties} className="select-none w-fit h-fit relative col-start-7 row-start-3 rotate-[11deg] left-[4px] top-[12px]">
              <Album
                albumCover="/about-me/album_covers/lowfade.png"
                albumTitle="Low Fade"
                artist="Karan Aujla"
                musicFile="/about-me/songs/lowfade.mp3"
                size="md"
              />
            </div>

            <div style={{ "--stagger": 34 } as React.CSSProperties} className="select-none w-fit h-fit relative col-start-8 row-start-3 rotate-[-16deg] left-[0px] top-[12px]">
              <Album
                albumCover="/about-me/album_covers/hausla.png"
                albumTitle="Hausla"
                artist="Seedhe Maut"
                musicFile="/about-me/songs/Hausla.mp3"
                size="md"
              />
            </div>

            <div style={{ "--stagger": 35 } as React.CSSProperties} className="select-none w-fit h-fit relative col-start-5 row-start-4 rotate-[8deg] left-[8px] top-[40px]">
              <Album
                albumCover="/about-me/album_covers/over.png"
                albumTitle="Over"
                artist="Drake"
                musicFile="/about-me/songs/Drake - Over.mp3"
                size="md"
              />
            </div>

            <div style={{ "--stagger": 7 } as React.CSSProperties} className="select-none w-fit h-fit relative col-start-5 row-start-4 rotate-[-11deg] left-[308px] top-[40px]">
              <Album
                albumCover="/about-me/album_covers/familybuisness- kanye.png"
                albumTitle="Family Business"
                artist="Kanye West"
                musicFile="/about-me/songs/Family Business.mp3"
                size="md"
              />
            </div>

            <div style={{ "--stagger": 36 } as React.CSSProperties} className="select-none w-fit h-fit relative col-start-1 row-start-6 rotate-[13deg] left-[20px] top-[40px]">
              <Album
                albumCover="/about-me/album_covers/slambook.png"
                albumTitle="Dumb Ladke"
                artist="Frappe Ash"
                musicFile="/about-me/songs/Dumb Ladke- frappe ash.mp3"
                size="md"
              />
            </div>

          </div>

        </DraggableWrapper>
      </div>
    </main>
  );
}
