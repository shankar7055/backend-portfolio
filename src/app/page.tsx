"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Book } from "@/components/book/book";
import DraggableWrapper, { type DraggableWrapperRef } from "@/components/canvaswrapper/draggable-wrapper";
import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/draggable-card";
import { Badge } from "@/components/ui/badge";
import { useRef } from "react";
import Clock from "@/components/clock/clock";
import { FollowPointer } from "@/components/cursor/animated-cursor";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Github, Mail } from "@/components/icons";
import TurbulenceCanvas from '@/components/canvas'
import { Album } from "@/components/ui/album";
import { LogoVariation2 } from "@/components/logo-variation-2";
import ScratchToReveal from "@/components/scratch";


export default function Home() {

  const turbulenceRef = useRef<any>(null)
  const hasTriggeredRef = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries
      if (entry.isIntersecting && !hasTriggeredRef.current && turbulenceRef.current) {
        hasTriggeredRef.current = true
        turbulenceRef.current.startHelloAnimation()
      }
    }, {
      root: null,
      rootMargin: "0px",
      threshold: 0.4
    })

    const element = turbulenceRef.current?.getElement()
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])


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
      position: "bottom-[200px] right-[70px]",
      caption: "Creative moments"
    }
  ];

  const constraintsRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<DraggableWrapperRef>(null);

  return (
    <main className="w-full h-full fixed select-none scrollbar-none">
      <div ref={constraintsRef} className="absolute flex items-center justify-center w-[3200px] h-[2760px] left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
        <DraggableWrapper
          ref={draggableRef}
          constraintsRef={constraintsRef as React.RefObject<HTMLElement>}

        >

          <div id="mat-texture" className="absolute overflow-hidden rounded-lg border-[4px] border-[#94BDE6] bg-[#2A6DB0] w-[3200px] h-[2760px] left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] shadow-lg bg-linear-grid bg-[size:16px_16px] bg-[position:12px_12px]">
            <div id="window" className=" z-10 opacity-[0.6] absolute w-full h-full left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] bg-cover bg-[url(/about-me/Layer-window.png)]"></div>
            <div id="lines" className="absolute w-full h-full left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] bg-linear-big-grid bg-[size:80px_80px] bg-[position:-4px_-4px]"></div>
            <div id="diagonal-lines" className="absolute w-full h-full left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] bg-diagonal-grid bg-[size:80px_80px] bg-[position:-2.5px_-2.5px]"></div>
          </div>

          <div className="absolute orchestration grid gap-4 grid-cols-[repeat(8,360px)] grid-rows-[repeat(7,360px)] w-[2992px] h-[2620px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

            <div className="z-[-1] w-[2992px] h-[2240px] pointer-events-none">

            </div>

            <FollowPointer style={{ "--stagger": 14 } as React.CSSProperties} x={1800} y={1000} name="Andre"></FollowPointer>

            <Image draggable="false" loading="lazy" style={{ "--stagger": 10 } as React.CSSProperties} className="select-none relative w-40 col-start-6 row-start-4 right-[60px] rotate-[-18deg] right-[230px] bottom-[80px] " width={600} height={600} src="/about-me/stickers/Ken.png" alt="Profile example" />

            <Image style={{ "--stagger": 36} as React.CSSProperties} draggable="false" loading="lazy" className="shadow-lg select-none relative col-start-7 row-start-1 right-[60px] rotate-[9deg] left-[400px]" width={160} height={159} src="/about-me/stickers/brazil-stamp.png" alt="Profile example" />

            <div className="orchestration select-none flex flex-col gap-2 relative rounded-lg w-[90vw] max-w-[100vw] col-start-4 row-start-4 col-span-2 row-span-2 left-1/2 -translate-x-1/2 bottom-[170px] sm:w-[568px] sm:left-[80px] sm:translate-x-0 sm:bottom-[220px] shadow-lg h-fit">
              <div style={{ "--stagger": 1 } as React.CSSProperties} className="select-none flex flex-col gap-2 sm:gap-4 bg-component relative rounded-lg w-full max-w-[100vw] col-span-2 row-span-2 sm:w-[568px] shadow-lg p-6 h-fit ">
                <div className="flex gap-3 items-center ">
                  <Avatar className="size-12 sm:size-14">
                    <AvatarImage src="/profilePicture.png" alt="Profile Picture" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-1 justify-between items-center">
                    <div className="flex flex-col">
                      <p className="text-base sm:text-xl font-medium"> Andre Souza </p>
                      <p className="text-base font-medium text-muted-foreground"> Design Engineer </p>
                    </div>
                    <div className="sm:size-10 size-8">
                      <svg width="100%" height="100%" viewBox="0 0 170 170" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M48.984 57.6266C39.1262 37.9349 47.1632 14.0126 66.9347 4.19468C86.7063 -5.62326 110.726 2.38104 120.584 22.0727L165.788 112.373C175.646 132.065 167.609 155.987 147.838 165.805C128.066 175.623 104.047 167.619 94.1889 147.927L48.984 57.6266ZM112.699 38.9242C112.699 54.1243 100.327 66.4465 85.0649 66.4465C69.8029 66.4465 57.4306 54.1243 57.4306 38.9242C57.4306 23.7239 69.8029 11.4016 85.0649 11.4016C100.327 11.4016 112.699 23.7239 112.699 38.9242ZM4.2117 112.373L28.0668 64.7207L72.2659 153.625L72.3337 153.634C61.0496 169.079 39.8972 174.612 22.1623 165.805C2.3907 155.987 -5.64607 132.065 4.2117 112.373Z" fill="currentColor" />
                      </svg>
                    </div>

                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <span className="text-sm sm:text-base leading-relaxed">
                    Welcome to <em>my space on the internet.</em> I'm a design engineer who crafts interactions that spark joy, delight, and a sense of magic in users.
                  </span>

                  <p className="hidden sm:inline text-sm sm:text-base">Growing up, I spent hours playing Street Fighter, Donkey Kong, and Super Mario in a Super Nintendo with my dad, and somewhere between levels, I developed high expectations for how interactions should feel. </p>

                  <p className="text-sm sm:text-base leading-relaxed">Have fun exploring my portfolio, and feel free to connect below.</p>

                  <div className="flex flex-row gap-4">
                    <Button asChild variant="secondary" size="sm" className="gap-2">
                      <Link href="https://x.com/andregsweb" target="_blank" rel="noopener noreferrer">

                        <Twitter className="w-5 h-5" />
                        <span className="hidden sm:inline">Twitter </span>

                      </Link>
                    </Button>
                    <Button asChild variant="secondary" size="sm" className="gap-2">
                      <Link href="https://www.linkedin.com/in/andregsweb/" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-5 h-5" />
                        <span className="hidden sm:inline">Linkedin  </span>

                      </Link>
                    </Button>
                    <Button asChild variant="secondary" size="sm" className="gap-2">
                      <Link href="https://github.com/andregsweb" target="_blank" rel="noopener noreferrer">
                        <Github className="w-5 h-5" />
                        <span className="hidden sm:inline"> GitHub  </span>

                      </Link>
                    </Button>
                    <Button asChild variant="secondary" size="sm" className="gap-2">
                      <Link href="mailto:hi@andregs.com" target="_blank" rel="noopener noreferrer">
                        <Mail className="w-5 h-5" />
                        <span className="hidden sm:inline"> Mail  </span>

                      </Link>
                    </Button>
                  </div>
                </div>

                <Separator className="grow my-1.5 sm:my-2 shrink mix-blend-multiply dark:mix-blend-lighten bg-transparent border-t-[1px] border-dashed"></Separator>

                <ul className="flex flex-col gap-4">

                  <li className="flex flex-row gap-4 inline-flex items-center justify-center">
                    <div className="hidden sm:block h-10 w-10 flex-none inline-flex items-center justify-center rounded-sm bg-[#1798D5] flex-none"></div>
                    <div className="flex flex-row w-full justify-between sm:items-center gap-4">
                      <div className="flex flex-col">
                        <span className="text-sm sm:text-base font-medium"> Praia Health </span>
                        <span className="text-sm text-muted-foreground"> Staff Product Designer </span>
                      </div>
                      <Badge variant="secondary" className="tabular text-xs font-normal text-muted-foreground w-fit">2024 – Present</Badge>
                    </div>
                  </li>

                  <li className="flex flex-row gap-4 inline-flex items-center justify-center">
                    <div className="hidden sm:block size-10 flex-none inline-flex items-center justify-center rounded-sm bg-[#00A868] flex-none"></div>
                    <div className="flex flex-row w-full justify-between sm:items-center gap-4">
                      <div className="flex flex-col">
                        <span className="text-sm sm:text-base font-medium"> Stone </span>
                        <span className="text-sm text-muted-foreground"> Specialist Product Designer </span>
                      </div>
                      <Badge variant="secondary" className="tabular text-xs font-normal text-muted-foreground w-fit">2022 – 2024</Badge>
                    </div>
                  </li>

                  <li className="flex flex-row gap-4 inline-flex items-center justify-center">
                    <div className="hidden sm:block h-10 w-10 flex-none inline-flex items-center justify-center rounded-sm bg-[#65A300] flex-none"></div>
                    <div className="flex flex-row w-full justify-between sm:items-center gap-4">
                      <div className="flex flex-col">
                        <span className="text-sm sm:text-base font-medium"> Pagar.me </span>
                        <span className="text-sm text-muted-foreground"> Senior Product Designer </span>
                      </div>
                      <Badge variant="secondary" className="tabular text-xs font-normal text-muted-foreground w-fit">2019 – 2022</Badge>
                    </div>
                  </li>

                  <li className="flex flex-row gap-4 inline-flex items-center justify-center">
                    <div className="hidden sm:block h-10 w-10 flex-none inline-flex items-center justify-center rounded-sm bg-[#FF530A] flex-none"></div>
                    <div className="flex flex-row w-full justify-between sm:items-center gap-4">
                      <div className="flex flex-col">
                        <span className="text-sm sm:text-base font-medium"> Try </span>
                        <span className="text-sm text-muted-foreground"> UX Designer & Researcher </span>
                      </div>
                      <Badge variant="secondary" className="tabular text-xs font-normal text-muted-foreground w-fit">2018 – 2019</Badge>
                    </div>
                  </li>

                  <li className="flex flex-row gap-4 inline-flex items-center justify-center">
                    <div className="hidden sm:block h-10 w-10 flex-none inline-flex items-center justify-center rounded-sm bg-[#2E5BAA] flex-none"></div>
                    <div className="flex flex-row w-full justify-between sm:items-center gap-4">
                      <div className="flex flex-col ">
                        <span className="text-sm sm:text-base font-medium"> National Council of Science </span>
                        <span className="text-sm text-muted-foreground"> UX Designer  </span>
                      </div>
                      <Badge variant="secondary" className="tabular text-xs font-normal text-muted-foreground w-fit">2018</Badge>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div style={{ "--stagger": 39} as React.CSSProperties} className="select-none flex flex-col gap-2 relative rounded-lg w-[90vw] max-w-[100vw] col-start-4 row-start-7 col-span-2 row-span-2 left-1/2 -translate-x-1/2 sm:w-[568px] sm:left-[80px] sm:translate-x-0 bottom-[480px] shadow-lg h-fit">
              <div className="select-none flex flex-col gap-4 bg-component relative rounded-lg w-full max-w-[100vw] col-span-2 row-span-2 sm:w-[568px] shadow-lg p-6 h-fit ">

                <p className="font-medium">Education</p>

                <ul className="flex flex-col gap-4">
                  <li className="flex flex-row gap-4 inline-flex items-center justify-center">
                    <div className="hidden sm:block h-10 w-10 flex-none inline-flex items-center justify-center rounded-sm bg-[#1474FF] flex-none"></div>
                    <div className="w-full flex flex-col gap-4">
                      <div className="flex flex-row w-full justify-between gap-8 items-center justify-center">
                        <div className="flex flex-col ">
                          <span className="font-medium"> Meiuca </span>
                          <span className="text-sm text-muted-foreground"> Design System & Ops</span>
                        </div>
                        <Badge variant="secondary" className="shrink-0 tabular text-xs font-normal text-muted-foreground ">2021</Badge>
                      </div>
                    </div>
                  </li>

                  <li className="flex flex-row gap-4 inline-flex items-center justify-center">
                    <div className="hidden sm:block h-10 w-10 flex-none inline-flex items-center justify-center rounded-sm bg-[#404040] flex-none"></div>
                    <div className="w-full flex flex-col gap-4">
                      <div className="flex flex-row w-full justify-between gap-4 items-center justify-center">
                        <div className="flex flex-col ">
                          <span className="font-medium"> Interaction Design Foundation </span>
                          <span className="text-sm text-muted-foreground"> Psychology of Interaction </span>
                        </div>
                        <Badge variant="secondary" className="shrink-0 tabular text-xs font-normal text-muted-foreground ">2019</Badge>
                      </div>
                    </div>
                  </li>

                  <li className="flex flex-row gap-4 inline-flex items-center justify-center">
                    <div className="hidden sm:block h-10 w-10 flex-none inline-flex items-center justify-center rounded-sm bg-[#F78B1F] flex-none"></div>
                    <div className="w-full flex flex-col gap-4">
                      <div className="flex flex-row w-full justify-between gap-8 items-center justify-center">
                        <div className="flex flex-col">
                          <div className="flex flex-col ">
                            <span className="font-medium"> SENAC - BA </span>
                            <span className="text-sm text-muted-foreground"> Interaction Design </span>
                          </div>
                        </div>
                        <Badge variant="secondary" className="shrink-0 tabular text-xs font-normal text-muted-foreground ">2016 - 2019</Badge>
                      </div>
                    </div>
                  </li>

                  <li className="flex flex-row gap-4 inline-flex items-center justify-center">
                    <div className="hidden sm:block h-10 w-10 flex-none inline-flex items-center justify-center rounded-sm bg-[#F15A24] flex-none"></div>
                    <div className="flex flex-row w-full justify-between gap-8 items-center justify-center">
                      <div className="flex flex-col ">
                        <span className="font-medium"> Adobe School of Arts  </span>
                        <span className="text-sm text-muted-foreground"> 3D & Motion Graphics </span>
                      </div>
                      <Badge variant="secondary" className="shrink-0 tabular text-xs font-normal text-muted-foreground ">2014 - 2016</Badge>
                    </div>
                  </li>
                </ul>

              </div>
            </div>

            <div style={{ "--stagger": 9 } as React.CSSProperties} className="select-none relative col-start-3 row-start-2 w-[360px] h-[360px] right-[320px] top-[200px] rotate-[-2deg]" data-no-drag>
              <TurbulenceCanvas
                ref={turbulenceRef}
                className="!rounded-2xl bg-white cursor-pointer"
                style={{ animation: 'wiggle 0.07s ease infinite' }}
              />
            </div>

            <div style={{ "--stagger": 13} as React.CSSProperties} className="select-none relative col-start-4 row-start-3 w-[300px] h-[300px] shadow-2xl rounded-2xl overflow-hidden right-[120px] bottom-[260px] rotate-[4deg] ">
              <LogoVariation2 />
            </div>


            <svg style={{ "--stagger": 40} as React.CSSProperties} className="select-none border-white border-4 rounded-lg relative row-start-5 col-start-8 top-[140px] left-[140px]" xmlns="http://www.w3.org/2000/svg" fill="none" width="100" height="100" viewBox="0 0 512 512" >
              <rect className="rounded-lg" fill="#3178c6" height="512" width="512" />
              <path clipRule="evenodd" d="m316.939 407.424v50.061c8.138 4.172 17.763 7.3 28.875 9.386s22.823 3.129 35.135 3.129c11.999 0 23.397-1.147 34.196-3.442 10.799-2.294 20.268-6.075 28.406-11.342 8.138-5.266 14.581-12.15 19.328-20.65s7.121-19.007 7.121-31.522c0-9.074-1.356-17.026-4.069-23.857s-6.625-12.906-11.738-18.225c-5.112-5.319-11.242-10.091-18.389-14.315s-15.207-8.213-24.18-11.967c-6.573-2.712-12.468-5.345-17.685-7.9-5.217-2.556-9.651-5.163-13.303-7.822-3.652-2.66-6.469-5.476-8.451-8.448-1.982-2.973-2.974-6.336-2.974-10.091 0-3.441.887-6.544 2.661-9.308s4.278-5.136 7.512-7.118c3.235-1.981 7.199-3.52 11.894-4.615 4.696-1.095 9.912-1.642 15.651-1.642 4.173 0 8.581.313 13.224.938 4.643.626 9.312 1.591 14.008 2.894 4.695 1.304 9.259 2.947 13.694 4.928 4.434 1.982 8.529 4.276 12.285 6.884v-46.776c-7.616-2.92-15.937-5.084-24.962-6.492s-19.381-2.112-31.066-2.112c-11.895 0-23.163 1.278-33.805 3.833s-20.006 6.544-28.093 11.967c-8.086 5.424-14.476 12.333-19.171 20.729-4.695 8.395-7.043 18.433-7.043 30.114 0 14.914 4.304 27.638 12.912 38.172 8.607 10.533 21.675 19.45 39.204 26.751 6.886 2.816 13.303 5.579 19.25 8.291s11.086 5.528 15.415 8.448c4.33 2.92 7.747 6.101 10.252 9.543 2.504 3.441 3.756 7.352 3.756 11.733 0 3.233-.783 6.231-2.348 8.995s-3.939 5.162-7.121 7.196-7.147 3.624-11.894 4.771c-4.748 1.148-10.303 1.721-16.668 1.721-10.851 0-21.597-1.903-32.24-5.71-10.642-3.806-20.502-9.516-29.579-17.13zm-84.159-123.342h64.22v-41.082h-179v41.082h63.906v182.918h50.874z" fill="#fff" fillRule="evenodd" />
            </svg>

            <Image style={{ "--stagger": 8 } as React.CSSProperties} draggable="false" loading="lazy" className="pointer-events-none select-none relative col-start-4 row-start-5 right-[200px] top-[200px]" width={92} height={80} src="/about-me/stickers/vercel.png" alt="Profile example" />

            <Image style={{ "--stagger": 14} as React.CSSProperties} draggable="false" loading="lazy" className="rotate-[10deg] pointer-events-none select-none relative col-start-8 row-start-6 right-[240px]" width={321} height={86} src="/about-me/stickers/next-js.png" alt="Profile example" />

            <Image style={{ "--stagger": 16} as React.CSSProperties} draggable="false" loading="lazy" className="select-none pointer-events-none relative col-start-7 row-start-6 top-[200px] right-[160px]" width={160} height={142} src="/about-me/stickers/react.png" alt="Profile example" />

            <Image style={{ "--stagger": 11 } as React.CSSProperties} draggable="false" loading="lazy" className="select-none pointer-events-none relative col-start-3 row-start-6 bottom-[140px] right-[240px] rotate-[36deg]" width={98} height={160} src="/about-me/stickers/mario.png" alt="Profile example" />

            <svg style={{ "--stagger": 15} as React.CSSProperties} className="select-none relative left-[140px] col-start-7 row-start-7 top-[200px] border-4 border-white rounded-lg" width="127" height="57" viewBox="0 0 138 57" aria-label="MDX" role="img">
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

            <div style={{ "--stagger": 12 } as React.CSSProperties} className="select-none col-start-7 col-span-2 h-fit row-start-5 w-[360px] flex rotate-[4deg]">
              <div className="w-[600px] h-[200px] flex items-center justify-center">
                <div className='relative flex items-center justify-center gap-8 w-full h-full p-8 rounded-lg overflow-hidden'>
                  <Clock></Clock>
                </div>
              </div>
            </div>

            <div style={{ "--stagger": 17} as React.CSSProperties} className="select-none w-fit h-fit relative col-start-3 row-start-1 rotate-[14deg] top-[180px] left-[240px] [perspective:600px]">
              <Book href="/book1.jpg" imageUrl="/about-me/books/japanese_design.jpg" width={165} height={201} backCoverColor="bg-[#EB1C24]" title="Japanese Design" />
            </div>




            <div style={{ "--stagger": 19} as React.CSSProperties} className="select-none w-fit h-fit relative col-start-6 rounded-lg row-start-2 top-[80px] left-[130px]" data-no-drag>
              <ScratchToReveal width={360} height={360}>

                <Link onPointerDown={(e) => e.stopPropagation()} href="/chess" className="group relative w-full h-full rounded-lg bg-black flex flex-col gap-4 items-center justify-center overflow-hidden">
                  <Image unoptimized draggable="false" className="rounded-lg absolute bottom-0 left-0" src="/about-me/chess-avatar/background.svg" width={360} height={360} alt="Horse" />

                  {/* Top scrolling text */}
                  <div className="scrolling-text-top absolute top-4 w-[400%] flex">
                    <span className="text-[110px] text-white font-bold whitespace-nowrap">PLAY PLAY PLAY PLAY PLAY PLAY PLAY PLAY </span>

                  </div>

                  {/* Bottom scrolling text */}
                  <div className="scrolling-text-bottom absolute bottom-4 w-[400%] flex">
                    <span className="text-[110px] text-white font-bold whitespace-nowrap rotate-180">PLAY PLAY PLAY PLAY PLAY PLAY PLAY PLAY </span>

                  </div>

                  <Image unoptimized draggable="false" className=" rounded-lg absolute top-0 left-0" src="/about-me/chess-avatar/chess-poster.svg" width={177} height={172} alt="" />
                  <Image unoptimized draggable="false" className=" rounded-lg absolute bottom-0 right-0" src="/about-me/chess-avatar/king-chess-poster.svg" width={224} height={233} alt="" />

                </Link>
              </ScratchToReveal>
            </div>


            <div style={{ "--stagger": 20} as React.CSSProperties} className="select-none w-fit h-fit relative col-start-5 row-start-2 top-[200px] left-[130px] rotate-[75deg] [perspective:600px]">
              <Book href="/book1.jpg" imageUrl="/about-me/books/logo_modernism.png" width={133} height={201} backCoverColor="bg-[#E32A24]" title="Logo Modernism" />
            </div>

            <div style={{ "--stagger": 21} as React.CSSProperties} className="select-none w-fit h-fit relative col-start-2 row-start-4 rotate-[6deg] [perspective:600px]">
              <Book href="/book1.jpg" imageUrl="/about-me/books/graphic_design_visionaries.jpg" width={135} height={198} backCoverColor="bg-[#F1855A]" title="Graphic Design Visionaries" />
            </div>

            <div style={{ "--stagger": 22} as React.CSSProperties} className="select-none w-fit h-fit relative col-start-4 row-start-2 rotate-[-16deg] top-[10px] left-[320px] [perspective:600px]">
              <Book href="/book1.jpg" imageUrl="/about-me/books/the_making_of_prince_of_persia.jpg" width={135} height={200} backCoverColor="bg-[#2D469B]" title="The Making of Prince of Persia" />
            </div>

            <div style={{ "--stagger": 23} as React.CSSProperties} className="select-none w-fit h-fit relative col-start-1 row-start-5 rotate-[12deg] left-[140px] top-[200px] [perspective:600px]">
              <Book href="/book1.jpg" imageUrl="/about-me/books/creativity_inc.jpg" width={130} height={198} backCoverColor="bg-[#CA2528]" title="Creativity Inc." />
            </div>

            <div style={{ "--stagger": 24} as React.CSSProperties} className="select-none w-fit h-fit relative col-start-6 row-start-6 rotate-[-14deg] left-[140px] bottom-[80px] [perspective:600px]">
              <Book href="/book1.jpg" imageUrl="/about-me/books/dieter_rams.jpg" width={145} height={198} backCoverColor="bg-[#F03800]" title="Dieter Rams" />
            </div>

            <div style={{ "--stagger": 9 } as React.CSSProperties} className="select-none w-fit h-fit relative col-start-7 row-start-4 rotate-[18deg] left-[120px] [perspective:600px]">
              <Book href="/book1.jpg" imageUrl="/about-me/books/grid_systems.jpg" width={136} height={199} backCoverColor="bg-[#ED6626]" title="Grid Systems" />
            </div>

            <div style={{ "--stagger": 25} as React.CSSProperties}className="select-none w-fit h-fit relative col-start-4 row-start-6 rotate-[-12deg] top-[280px] [perspective:600px]">
              <Book href="/book1.jpg" imageUrl="/about-me/books/weapons_of_math.jpg" width={128} height={197} backCoverColor="bg-[#FFF20C]" title="Weapons of Math Destruction" />
            </div>

            <div style={{ "--stagger": 26} as React.CSSProperties} className="select-none w-fit h-fit relative col-start-6 row-start-7 rotate-[8deg] [perspective:600px]">
              <Book href="/book1.jpg" imageUrl="/about-me/books/elden_ring.png" width={137} height={194} backCoverColor="bg-[#0A0A0A]" title="Elden Ring" />
            </div>

            <div style={{ "--stagger": 27} as React.CSSProperties} className="select-none w-fit h-fit relative col-start-3 row-start-6 rotate-[-18deg] [perspective:600px]">
              <Book href="/book1.jpg" imageUrl="/about-me/books/nier_art.jpg" width={143} height={198} backCoverColor="bg-[#485556]" title="NieR: Art" />
            </div>

            <div style={{ "--stagger": 28} as React.CSSProperties} className="select-none w-fit h-fit relative col-start-1 row-start-3 rotate-[10deg] left-[140px] [perspective:600px]">
              <Book href="/book1.jpg" imageUrl="/about-me/books/mega_man.jpg" width={143} height={201} backCoverColor="bg-[#1983FC]" title="Mega Man" />
            </div>

            <div style={{ "--stagger": 29} as React.CSSProperties} className="select-none w-fit h-fit relative col-start-3 row-start-7 rotate-[-6deg] [perspective:600px]">
              <Book href="/book1.jpg" imageUrl="/about-me/books/monster_hunter.png" width={143} height={202} backCoverColor="bg-[#E1D2BC]" title="Monster Hunter" />
            </div>

            <div style={{ "--stagger": 30} as React.CSSProperties} className="select-none w-fit h-fit relative col-start-7 row-start-2 rotate-[14deg] left-[380px]">
              <Book href="/book1.jpg" imageUrl="/about-me/books/made_in_japan.jpg" width={160} height={208} backCoverColor="bg-[#f2f2f2]" title="Made in Japan" />
            </div>

            <div style={{ "--stagger": 31} as React.CSSProperties} className="select-none w-fit h-fit relative col-start-5 row-start-1 rotate-[8deg] top-[80px]">
              <Album
                albumCover="/about-me/album_covers/Clube_da_Esquina.jpg"
                albumTitle="Clube da Esquina"
                artist="Milton Nascimento"
                musicFile="/about-me/songs/clube-da-esquina.mp3"
                size="md"
              />
            </div>

            <div style={{ "--stagger": 32} as React.CSSProperties} className="select-none w-fit h-fit relative col-start-2 row-start-1 rotate-[-8deg] top-[200px]">
              <Album
                albumCover="/about-me/album_covers/initial_d.jpg"
                albumTitle="Super Eurobeat Collection"
                artist="Initial D"
                musicFile="/about-me/songs/initial-d.mp3"
                size="md"
              />
            </div>

            <div style={{ "--stagger": 33} as React.CSSProperties} className="select-none w-fit h-fit relative col-start-8 row-start-4 rotate-[8deg] left-[100px] bottom-[120px]">
              <Album
                albumCover="/about-me/album_covers/scenery.jpg"
                albumTitle="Scenery"
                artist="Ryo Fukui"
                musicFile="/about-me/songs/scenery.mp3"
                size="md"
              />
            </div>

            <div style={{ "--stagger": 34} as React.CSSProperties} className="select-none w-fit h-fit relative col-start-7 row-start-7 rotate-[8deg] left-[240px] bottom-[120px]">
              <Album
                albumCover="/about-me/album_covers/bruno-mars-anderson-paak.jpg"
                albumTitle="Silk Sonic"
                artist="Bruno Mars & Anderson .Paak"
                musicFile="/about-me/songs/door-open.mp3"
                size="md"
              />
            </div>

            <div style={{ "--stagger": 35} as React.CSSProperties} className="select-none w-fit h-fit relative col-start-2 row-start-7 rotate-[8deg] bottom-[120px]">
              <Album
                albumCover="/about-me/album_covers/elisetomcapa.jpg"
                albumTitle="Elis & Tom"
                artist="Elis Regina & Tom Jobim"
                musicFile="/about-me/songs/aguas-de-marco.mp3"
                size="md"
              />
            </div>

            <div style={{ "--stagger": 7 } as React.CSSProperties} className="select-none w-fit h-fit relative col-start-3 row-start-5 rotate-[8deg] right-[140px] bottom-[120px]">
              <Album
                albumCover="/about-me/album_covers/bebop.jpg"
                albumTitle="Tank!"
                artist="Cowboy Bebop"
                musicFile="/about-me/songs/bebop.mp3"
                size="md"
              />
            </div>

            <div style={{ "--stagger": 36} as React.CSSProperties} className="select-none w-fit h-fit relative col-start-7 row-start-1 rotate-[8deg] right-[160px] top-[80px] ">
              <Album
                albumCover="/about-me/album_covers/shiki_no_uta.jpg"
                albumTitle="Shiki no Uta"
                artist="Nujabes"
                musicFile="/about-me/songs/shiki-no-uta.mp3"
                size="md"
              />
            </div>


          </div>

        </DraggableWrapper>
      </div>
    </main >

  );
}
