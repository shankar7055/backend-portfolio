"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Book } from "@/components/book/book";
import DraggableWrapper, { type DraggableWrapperRef } from "@/components/canvaswrapper/draggable-wrapper";
import ShaderBackground from "@/components/clock/shader-background";
import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/draggable-card";
import { Badge } from "@/components/ui/badge";
import { useRef } from "react";
import { Album } from "@/components/ui/album"
import Spline from '@splinetool/react-spline';
import Clock from "@/components/clock/clock";
import ScratchToReveal from "@/components/scratch";
import TurbulenceCanvas, { TurbulenceCanvasRef } from "@/components/canvas";
import { FollowPointer } from "@/components/cursor/animated-cursor";


export default function About() {

  const turbulenceRef = useRef<TurbulenceCanvasRef>(null)
  const [isVisible, setIsVisible] = useState(false)

  const callbackFunction = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries
    const wasVisible = isVisible
    setIsVisible(entry.isIntersecting)

    // Trigger animation when becoming visible for the first time
    if (!wasVisible && entry.isIntersecting && turbulenceRef.current) {
      turbulenceRef.current.startHelloAnimation()
    }
  }

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.4
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options)
    const element = turbulenceRef.current?.getElement()
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }

  }, [turbulenceRef, options, isVisible])


  const draggableImages = [
    {
      id: 1,
      src: "/about-me/image-1.jpg",
      alt: "Profile example",
      className: "relative max-w-[100vw] col-start-3 row-start-4 w-fit h-fit col-span-1",
      rotate: "rotate-[14deg]",
      position: "bottom-[160px] left-[100px]",
      caption: "Exploring new places"
    },
    {
      id: 2,
      src: "/about-me/image-2.jpg",
      alt: "Profile example",
      className: "relative max-w-[100vw] col-start-3 row-start-5 w-fit h-fit col-span-1",
      rotate: "rotate-[-12deg]",
      position: "bottom-[160px] left-[240px]",
      caption: "Coffee & design"
    },
    {
      id: 3,
      src: "/about-me/image-3.jpg",
      alt: "Profile example",
      className: "relative max-w-[100vw] col-start-6 row-start-4 w-fit h-fit col-span-1",
      rotate: "rotate-[2deg]",
      position: "bottom-[180px] left-[80px]",
      caption: "Weekend adventures"
    },
    {
      id: 4,
      src: "/about-me/image-4.jpg",
      alt: "Profile example",
      className: "relative max-w-[100vw] col-start-6 row-start-5 w-fit h-fit col-span-1",
      rotate: "rotate-[8deg]",
      position: "bottom-[200px] right-[10px]",
      caption: "Creative moments"
    }
  ];

  const constraintsRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<DraggableWrapperRef>(null);

  return (
    <main className="w-full h-full fixed select-none scrollbar-none">
      <div ref={constraintsRef} className="absolute flex items-center justify-center w-[3200px] h-[2760px] left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
        <DraggableWrapper ref={draggableRef} constraintsRef={constraintsRef as React.RefObject<HTMLElement>}>

          <div id="mat-texture" className="absolute overflow-hidden rounded-lg border-[4px] border-[#94BDE6] bg-[#2A6DB0] w-[3200px] h-[2760px] left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] shadow-lg bg-linear-grid bg-[size:16px_16px] bg-[position:12px_12px]">
            <div id="window" className=" z-10 opacity-[0.6] absolute w-full h-full left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] bg-cover bg-[url(/about-me/Layer-window.png)]"></div>
            <div id="lines" className="absolute w-full h-full left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] bg-linear-big-grid bg-[size:80px_80px]"></div>
            <div id="diagonal-lines" className="absolute w-full h-full left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] bg-diagonal-grid bg-[size:80px_80px] bg-[position:0.5px_0.5px]"></div>
          </div>

          <div className="absolute grid gap-4 grid-cols-[repeat(8,360px)] grid-rows-[repeat(7,360px)] w-[2992px] h-[2620px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

            <div className="z-[-1] w-[2992px] h-[2240px] pointer-events-none">

            </div>

            <FollowPointer x={1800} y={1000} name="Andre"></FollowPointer>

            <Image draggable="false" className="select-none relative col-start-6 row-start-4 right-[60px] rotate-[-18deg] right-[230px] bottom-[80px] " width={160} height={80} src="/about-me/stickers/Ken.png" alt="Profile example" />

            <Image draggable="false" className="shadow-lg select-none relative col-start-7 row-start-1 right-[60px] rotate-[9deg] left-[400px]" width={160} height={80} src="/about-me/stickers/brazil-stamp.png" alt="Profile example" />

            <div className="select-none flex flex-col gap-4 bg-component relative rounded-lg w-full max-w-[100vw] col-start-4 row-start-4 col-span-2 row-span-2 sm:w-[568px] left-[80px] bottom-[170px] shadow-lg p-6 h-fit ">
              <div className="flex gap-3 items-center ">
                <Avatar className="w-[56px] h-[56px]">
                  <AvatarImage src="/profilePicture.png" alt="Profile Picture" />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <div className="flex flex-1 justify-between">
                  <div className="flex flex-col">
                    <p className="text-xl font-medium"> Andre Souza </p>
                    <p className="text font-medium text-muted-foreground"> Design Engineer </p>
                  </div>
                  <div className="size-10">
                    <svg width="40" height="40" viewBox="0 0 170 170" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M48.984 57.6266C39.1262 37.9349 47.1632 14.0126 66.9347 4.19468C86.7063 -5.62326 110.726 2.38104 120.584 22.0727L165.788 112.373C175.646 132.065 167.609 155.987 147.838 165.805C128.066 175.623 104.047 167.619 94.1889 147.927L48.984 57.6266ZM112.699 38.9242C112.699 54.1243 100.327 66.4465 85.0649 66.4465C69.8029 66.4465 57.4306 54.1243 57.4306 38.9242C57.4306 23.7239 69.8029 11.4016 85.0649 11.4016C100.327 11.4016 112.699 23.7239 112.699 38.9242ZM4.2117 112.373L28.0668 64.7207L72.2659 153.625L72.3337 153.634C61.0496 169.079 39.8972 174.612 22.1623 165.805C2.3907 155.987 -5.64607 132.065 4.2117 112.373Z" fill="currentColor" />
                    </svg>
                  </div>

                </div>
              </div>


              <p>I’m a designer focused on creating products that are both meaningful and functional. I’ve led design at companies across various stages, from early-stage fintech startup Pagar.me to shaping the best-in-class POS at Stone.</p>

              <p>Growing up, I spent hours playing Street Fighter, Donkey Kong, and Super Mario in a Super Nintendo with my dad, and somewhere between levels, I developed high expectations for how interactions should feel. </p>

              <p>My ultimate goal in every product is to create interactions that spark joy, delight, and a sense of magic in users.</p>

            </div>

            <div className="select-none flex flex-col gap-4 bg-component relative rounded-lg w-full max-w-[100vw] col-start-4 row-start-4 col-span-2 row-span-2 sm:w-[568px] left-[80px] top-[190px] shadow-lg p-6 h-fit ">

              <p className="font-medium">Experience</p>

              <ul className="flex flex-col gap-4">

                <li className="flex flex-row gap-4 inline-flex items-center justify-center">
                  <div className="h-10 w-10 flex-none inline-flex items-center justify-center rounded-sm bg-[#1798D5] flex-none"></div>
                  <div className="flex flex-row w-full justify-between items-center justify-center gap-8">
                    <div className="flex flex-col">
                      <span className="font-medium"> Praia Health </span>
                      <span className="text-sm text-muted-foreground"> Staff Product Designer </span>
                    </div>
                    <Badge variant="secondary" className="tabular text-xs font-normal text-muted-foreground ">2024 – Present</Badge>
                  </div>
                </li>

                <li className="flex flex-row gap-4 inline-flex items-center justify-center">
                  <div className="size-10 flex-none inline-flex items-center justify-center rounded-sm bg-[#00A868] flex-none"></div>
                  <div className="flex flex-row w-full justify-between items-center justify-center gap-8">
                    <div className="flex flex-col">
                      <span className="font-medium"> Stone </span>
                      <span className="text-sm text-muted-foreground"> Specialist Product Designer </span>
                    </div>
                    <Badge variant="secondary" className="tabular text-xs font-normal text-muted-foreground ">2022 – 2024</Badge>
                  </div>
                </li>



                <li className="flex flex-row gap-4 inline-flex items-center justify-center">
                  <div className="h-10 w-10 flex-none inline-flex items-center justify-center rounded-sm bg-[#65A300] flex-none"></div>
                  <div className="flex flex-row w-full justify-between gap-8 items-center justify-center">
                    <div className="flex flex-col">
                      <span className="font-medium"> Pagar.me </span>
                      <span className="text-sm text-muted-foreground"> Senior Product Designer </span>
                    </div>
                    <Badge variant="secondary" className="tabular text-xs font-normal text-muted-foreground ">2019 – 2022</Badge>
                  </div>
                </li>

                <li className="flex flex-row gap-4 inline-flex items-center justify-center">
                  <div className="h-10 w-10 flex-none inline-flex items-center justify-center rounded-sm bg-[#FF530A] flex-none"></div>

                  <div className="flex flex-row w-full justify-between gap-8 items-center justify-center">
                    <div className="flex flex-col">
                      <span className="font-medium"> Try </span>
                      <span className="text-sm text-muted-foreground"> UX Designer & Researcher </span>
                    </div>
                    <Badge variant="secondary" className="tabular text-xs font-normal text-muted-foreground ">2018 – 2019</Badge>
                  </div>
                </li>

                <li className="flex flex-row gap-4 inline-flex items-center justify-center">
                  <div className="h-10 w-10 flex-none inline-flex items-center justify-center rounded-sm bg-[#2E5BAA] flex-none"></div>
                  <div className="flex flex-row w-full justify-between gap-8 items-center justify-center">
                    <div className="flex flex-col ">
                      <span className="font-medium"> National Council of Science </span>
                      <span className="text-sm text-muted-foreground"> UX Designer  </span>
                    </div>
                    <Badge variant="secondary" className="tabular text-xs font-normal text-muted-foreground ">2018</Badge>
                  </div>
                </li>
              </ul>
            </div>

            <div className="select-none flex flex-col gap-4 bg-component relative rounded-lg w-full max-w-[100vw] col-start-4 row-start-4 col-span-2 row-span-2 sm:w-[568px] left-[80px] top-[585px] shadow-lg p-6 h-fit ">

              <p className="font-medium">Education</p>

              <ul className="flex flex-col gap-4">
                <li className="flex flex-row gap-4 inline-flex items-center justify-center">
                  <div className="h-10 w-10 flex-none inline-flex items-center justify-center rounded-sm bg-[#1474FF] flex-none"></div>
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex flex-row w-full justify-between gap-8 items-center justify-center">
                      <div className="flex flex-col ">
                        <span className="font-medium"> Meiuca </span>
                        <span className="text-sm text-muted-foreground"> Design System & Ops</span>
                      </div>
                      <Badge variant="secondary" className="tabular text-xs font-normal text-muted-foreground ">2021</Badge>
                    </div>
                  </div>
                </li>

                <li className="flex flex-row gap-4 inline-flex items-center justify-center">
                  <div className="h-10 w-10 flex-none inline-flex items-center justify-center rounded-sm bg-[#404040] flex-none"></div>
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex flex-row w-full justify-between gap-8 items-center justify-center">
                      <div className="flex flex-col ">
                        <span className="font-medium"> Interaction Design Foundation </span>
                        <span className="text-sm text-muted-foreground"> Advanced Psychology of Interaction </span>
                      </div>
                      <Badge variant="secondary" className="tabular text-xs font-normal text-muted-foreground ">2019</Badge>
                    </div>
                  </div>
                </li>

                <li className="flex flex-row gap-4 inline-flex items-center justify-center">
                  <div className="h-10 w-10 flex-none inline-flex items-center justify-center rounded-sm bg-[#F78B1F] flex-none"></div>
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex flex-row w-full justify-between gap-8 items-center justify-center">
                      <div className="flex flex-col">
                        <div className="flex flex-col ">
                          <span className="font-medium"> SENAC </span>
                          <span className="text-sm text-muted-foreground"> Bachelor’s Degree in Interaction Design </span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="tabular text-xs font-normal text-muted-foreground ">2016 - 2019</Badge>
                    </div>
                  </div>
                </li>

                <li className="flex flex-row gap-4 inline-flex items-center justify-center">
                  <div className="h-10 w-10 flex-none inline-flex items-center justify-center rounded-sm bg-[#F15A24] flex-none"></div>
                  <div className="flex flex-row w-full justify-between gap-8 items-center justify-center">
                    <div className="flex flex-col ">
                      <span className="font-medium"> Adobe School of Arts and Animation  </span>
                      <span className="text-sm text-muted-foreground"> Certified in 3D & Motion Graphics </span>
                    </div>
                    <Badge variant="secondary" className="tabular text-xs font-normal text-muted-foreground ">2014 - 2016</Badge>
                  </div>
                </li>
              </ul>

            </div>


            <div className="select-none relative col-start-3 row-start-2 w-[360px] h-[360px] right-[320px] top-[200px] rotate-[-2deg]" data-no-drag>
              <TurbulenceCanvas
                ref={turbulenceRef}
                className="!rounded-2xl bg-white cursor-pointer"
                style={{ animation: 'wiggle 0.07s ease infinite' }}
              />
            </div>

            <div className="select-none relative col-start-4 row-start-3 w-[220px] h-[220px] shadow-2xl rounded-2xl overflow-hidden bottom-[90px] left-[40px] rotate-[4deg] ">
              <video src="/Logo-motion.mp4" autoPlay muted loop className="w-full h-full object-cover"></video>
            </div>


            <svg className="select-none border-white border-4 rounded-lg relative row-start-2 col-start-3 top-[140px] left-[140px]" xmlns="http://www.w3.org/2000/svg" fill="none" width="100" height="100" viewBox="0 0 512 512" >
              <rect className="rounded-lg" fill="#3178c6" height="512" width="512" />
              <path clipRule="evenodd" d="m316.939 407.424v50.061c8.138 4.172 17.763 7.3 28.875 9.386s22.823 3.129 35.135 3.129c11.999 0 23.397-1.147 34.196-3.442 10.799-2.294 20.268-6.075 28.406-11.342 8.138-5.266 14.581-12.15 19.328-20.65s7.121-19.007 7.121-31.522c0-9.074-1.356-17.026-4.069-23.857s-6.625-12.906-11.738-18.225c-5.112-5.319-11.242-10.091-18.389-14.315s-15.207-8.213-24.18-11.967c-6.573-2.712-12.468-5.345-17.685-7.9-5.217-2.556-9.651-5.163-13.303-7.822-3.652-2.66-6.469-5.476-8.451-8.448-1.982-2.973-2.974-6.336-2.974-10.091 0-3.441.887-6.544 2.661-9.308s4.278-5.136 7.512-7.118c3.235-1.981 7.199-3.52 11.894-4.615 4.696-1.095 9.912-1.642 15.651-1.642 4.173 0 8.581.313 13.224.938 4.643.626 9.312 1.591 14.008 2.894 4.695 1.304 9.259 2.947 13.694 4.928 4.434 1.982 8.529 4.276 12.285 6.884v-46.776c-7.616-2.92-15.937-5.084-24.962-6.492s-19.381-2.112-31.066-2.112c-11.895 0-23.163 1.278-33.805 3.833s-20.006 6.544-28.093 11.967c-8.086 5.424-14.476 12.333-19.171 20.729-4.695 8.395-7.043 18.433-7.043 30.114 0 14.914 4.304 27.638 12.912 38.172 8.607 10.533 21.675 19.45 39.204 26.751 6.886 2.816 13.303 5.579 19.25 8.291s11.086 5.528 15.415 8.448c4.33 2.92 7.747 6.101 10.252 9.543 2.504 3.441 3.756 7.352 3.756 11.733 0 3.233-.783 6.231-2.348 8.995s-3.939 5.162-7.121 7.196-7.147 3.624-11.894 4.771c-4.748 1.148-10.303 1.721-16.668 1.721-10.851 0-21.597-1.903-32.24-5.71-10.642-3.806-20.502-9.516-29.579-17.13zm-84.159-123.342h64.22v-41.082h-179v41.082h63.906v182.918h50.874z" fill="#fff" fillRule="evenodd" />
            </svg>

            <Image draggable="false" className="pointer-events-none select-none relative col-start-4 row-start-5 right-[200px] top-[200px]" width={140} height={80} src="/about-me/stickers/vercel.png" alt="Profile example" />

            <Image draggable="false" className="rotate-[10deg] pointer-events-none select-none relative col-start-8 row-start-6 right-[240px]" width={320} height={80} src="/about-me/stickers/next-js.png" alt="Profile example" />

            <Image draggable="false" className="select-none pointer-events-none relative col-start-7 row-start-6 top-[200px] right-[160px]" width={160} height={80} src="/about-me/stickers/react.png" alt="Profile example" />

            <Image draggable="false" className="select-none pointer-events-none relative col-start-3 row-start-6 bottom-[140px] right-[240px] rotate-[36deg]" width={160} height={80} src="/about-me/stickers/mario.png" alt="Profile example" />

            <svg className="select-none relative left-[140px] col-start-7 row-start-7 top-[200px] border-4 border-white rounded-lg" width="127" height="57" viewBox="0 0 138 57" aria-label="MDX" role="img">
              <rect height="55.5" rx="4.5" width="136.5" x=".75" y=".75"></rect>
              <g fill="none" stroke="#fff" strokeWidth="6">
                <path d="M16.5 44V19L30.25 32.75l14-14v25"></path>
                <path d="M70.5 40V10.75"></path>
                <path d="M57 27.25L70.5 40.75l13.5-13.5"></path>
                <path d="M122.5 41.24L93.25 12M93.5 41.25L122.75 12">
                </path>
              </g>
            </svg>


            {draggableImages.map((item) => (
              <DraggableCardContainer
                key={item.id}
                className={`${item.className} ${item.rotate} ${item.position}`}
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
                    {/*}
                      <div className="my-4 px-1">
                        <p className="text-md text-center text-gray-700 font-handwritten transform -rotate-1">
                          {item.caption}
                        </p>
                      </div> {*/}
                  </div>
                </DraggableCardBody>
              </DraggableCardContainer>
            ))}

            <div className="select-none col-start-7 col-span-2 h-fit row-start-5 w-[360px] flex rotate-[4deg]">
              <div className="w-[600px] h-[200px] flex items-center justify-center">
                <div className='relative flex items-center justify-center gap-8 w-full h-full p-8 rounded-lg overflow-hidden'>
                  <Clock></Clock>
                </div>
              </div>
            </div>

            <div className="select-none w-fit h-fit relative col-start-3 row-start-1 rotate-[14deg] top-[180px] left-[240px]">
              <Book href="/book1.jpg" imageUrl="/about-me/books/japanese_design.jpg" width={165} height={200} backCoverColor="bg-[#EB1C24]" title="Japanese Design" />
            </div>



            <Spline className="max-w-[320px] max-h-[300px] rounded-lg shadow-2xl relative col-start-5 row-start-6  right-[140px] top-[300px]"
              scene="https://prod.spline.design/QJdGUlUaQme7ttFb/scene.splinecode"
              data-no-drag
            />

            <div className="select-none w-fit h-fit relative col-start-6 rounded-lg row-start-2 top-[80px] left-[130px]" data-no-drag>
              <ScratchToReveal width={360} height={360}>

                <Link onPointerDown={(e) => e.stopPropagation()} href="/chess" className="group relative w-full h-full rounded-lg bg-black flex flex-col gap-4 items-center justify-center overflow-hidden">
                  <Image draggable="false" className="rounded-lg absolute bottom-0 left-0" src="/about-me/chess-avatar/background.svg" width={360} height={360} alt="Horse" />

                  {/* Top scrolling text */}
                  <div className="scrolling-text-top absolute top-4 w-[400%] flex">
                    <span className="text-[110px] text-white font-bold whitespace-nowrap">PLAY PLAY PLAY PLAY PLAY PLAY PLAY PLAY </span>

                  </div>

                  {/* Bottom scrolling text */}
                  <div className="scrolling-text-bottom absolute bottom-4 w-[400%] flex">
                    <span className="text-[110px] text-white font-bold whitespace-nowrap rotate-180">PLAY PLAY PLAY PLAY PLAY PLAY PLAY PLAY </span>

                  </div>

                  <Image draggable="false" className=" rounded-lg absolute top-0 left-0" src="/about-me/chess-avatar/chess-poster.svg" width={160} height={160} alt="Horse" />
                  <Image draggable="false" className=" rounded-lg absolute bottom-0 right-0" src="/about-me/chess-avatar/king-chess-poster.svg" width={200} height={200} alt="Horse" />

                </Link>
              </ScratchToReveal>
            </div>


            <div className="select-none w-fit h-fit relative col-start-5 row-start-2 top-[200px] left-[130px] rotate-[75deg]">
              <Book href="/book1.jpg" imageUrl="/about-me/books/logo_modernism.png" width={133} height={200} backCoverColor="bg-[#E32A24]" title="Logo Modernism" />
            </div>

            <div className="select-none w-fit h-fit relative col-start-2 row-start-4 rotate-[6deg]">
              <Book href="/book1.jpg" imageUrl="/about-me/books/graphic_design_visionaries.jpg" width={135} height={200} backCoverColor="bg-[#F1855A]" title="Graphic Design Visionaries" />
            </div>

            <div className="select-none w-fit h-fit relative col-start-4 row-start-2 rotate-[-16deg] top-[10px] left-[320px]">
              <Book href="/book1.jpg" imageUrl="/about-me/books/the_making_of_prince_of_persia.jpg" width={135} height={200} backCoverColor="bg-[#2D469B]" title="The Making of Prince of Persia" />
            </div>

            <div className="select-none w-fit h-fit relative col-start-1 row-start-5 rotate-[12deg] left-[140px] top-[200px]">
              <Book href="/book1.jpg" imageUrl="/about-me/books/creativity_inc.jpg" width={130} height={200} backCoverColor="bg-[#CA2528]" title="Creativity Inc." />
            </div>

            <div className="select-none w-fit h-fit relative col-start-6 row-start-6 rotate-[-14deg] left-[140px] bottom-[80px]">
              <Book href="/book1.jpg" imageUrl="/about-me/books/dieter_rams.jpg" width={145} height={200} backCoverColor="bg-[#F03800]" title="Dieter Rams" />
            </div>

            <div className="select-none w-fit h-fit relative col-start-7 row-start-4 rotate-[18deg] left-[120px]">
              <Book href="/book1.jpg" imageUrl="/about-me/books/grid_systems.jpg" width={136} height={200} backCoverColor="bg-[#ED6626]" title="Grid Systems" />
            </div>

            <div className="select-none w-fit h-fit relative col-start-4 row-start-6 rotate-[-12deg] top-[240px]">
              <Book href="/book1.jpg" imageUrl="/about-me/books/weapons_of_math.jpg" width={128} height={200} backCoverColor="bg-[#FFF20C]" title="Weapons of Math Destruction" />
            </div>

            <div className="select-none w-fit h-fit relative col-start-6 row-start-7 rotate-[8deg]">
              <Book href="/book1.jpg" imageUrl="/about-me/books/elden_ring.png" width={137} height={200} backCoverColor="bg-[#0A0A0A]" title="Elden Ring" />
            </div>

            <div className="select-none w-fit h-fit relative col-start-3 row-start-6 rotate-[-18deg]">
              <Book href="/book1.jpg" imageUrl="/about-me/books/nier_art.jpg" width={143} height={200} backCoverColor="bg-[#485556]" title="NieR: Art" />
            </div>

            <div className="select-none w-fit h-fit relative col-start-1 row-start-3 rotate-[10deg] left-[140px]">
              <Book href="/book1.jpg" imageUrl="/about-me/books/mega_man.jpg" width={143} height={200} backCoverColor="bg-[#1983FC]" title="Mega Man" />
            </div>

            <div className="select-none w-fit h-fit relative col-start-3 row-start-7 rotate-[-6deg]">
              <Book href="/book1.jpg" imageUrl="/about-me/books/monster_hunter.png" width={143} height={200} backCoverColor="bg-[#E1D2BC]" title="Monster Hunter" />
            </div>

            <div className="select-none w-fit h-fit relative col-start-5 row-start-1 rotate-[8deg] top-[80px]">
              <Album
                albumCover="/about-me/album_covers/Clube_da_Esquina.jpg"
                albumTitle="Clube da Esquina"
                artist="Milton Nascimento"
                musicFile="/about-me/songs/clube-da-esquina.mp3"
                size="md"
              />
            </div>

            <div className="select-none w-fit h-fit relative col-start-2 row-start-1 rotate-[-8deg] top-[200px]">
              <Album
                albumCover="/about-me/album_covers/initial_d.jpg"
                albumTitle="Super Eurobeat Collection"
                artist="Initial D"
                musicFile="/about-me/songs/initial-d.mp3"
                size="md"
              />
            </div>

            <div className="select-none w-fit h-fit relative col-start-8 row-start-4 rotate-[8deg] left-[100px] bottom-[120px]">
              <Album
                albumCover="/about-me/album_covers/scenery.jpg"
                albumTitle="Scenery"
                artist="Ryo Fukui"
                musicFile="/about-me/songs/scenery.mp3"
                size="md"
              />
            </div>

            <div className="select-none w-fit h-fit relative col-start-7 row-start-7 rotate-[8deg] left-[240px] bottom-[120px]">
              <Album
                albumCover="/about-me/album_covers/bruno-mars-anderson-paak.jpg"
                albumTitle="Silk Sonic"
                artist="Bruno Mars & Anderson .Paak"
                musicFile="/about-me/songs/door-open.mp3"
                size="md"
              />
            </div>

            <div className="select-none w-fit h-fit relative col-start-2 row-start-7 rotate-[8deg] bottom-[120px]">
              <Album
                albumCover="/about-me/album_covers/elisetomcapa.jpg"
                albumTitle="Elis & Tom"
                artist="Elis Regina & Tom Jobim"
                musicFile="/about-me/songs/aguas-de-marco.mp3"
                size="md"
              />
            </div>

            <div className="select-none w-fit h-fit relative col-start-3 row-start-5 rotate-[8deg] right-[140px] bottom-[120px]">
              <Album
                albumCover="/about-me/album_covers/bebop.jpg"
                albumTitle="Tank!"
                artist="Cowboy Bebop"
                musicFile="/about-me/songs/bebop.mp3"
                size="md"
              />
            </div>

            <div className="select-none w-fit h-fit relative col-start-7 row-start-1 rotate-[8deg] right-[160px] top-[80px] ">
              <Album
                albumCover="/about-me/album_covers/shiki_no_uta.jpg"
                albumTitle="Shiki no Uta"
                artist="Nujabes"
                musicFile="/about-me/songs/shiki-no-uta.mp3"
                size="md"
              />
            </div>

            <div className="select-none w-fit h-fit relative col-start-7 row-start-2 rotate-[14deg] left-[380px]">
              <Book href="/book1.jpg" imageUrl="/about-me/books/made_in_japan.jpg" width={160} height={210} backCoverColor="bg-[#f2f2f2]" title="Made in Japan" />
            </div>
          </div>

        </DraggableWrapper>
      </div>
    </main >

  );
}
