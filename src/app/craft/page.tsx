"use client"

import { CraftBlock } from "@/components/ui/craft-block";
import Sampledock from "@/components/sample/dock";
import SampleFlipClock from "@/components/sample/clock";
import { Book } from "@/components/sample/book";
import TurbulenceCanvas, { TurbulenceCanvasRef } from "@/components/sample/canvas";
import { Album } from "@/components/sample/album";
import { useState, useEffect, useRef } from "react";

export default function Home() {

  const turbulenceRef = useRef<TurbulenceCanvasRef>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const callbackFunction = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      setIsVisible(prev => {
        const wasVisible = prev
        if (!wasVisible && entry.isIntersecting && turbulenceRef.current) {
          turbulenceRef.current.startHelloAnimation()
        }
        return entry.isIntersecting
      })
    }

    const observer = new IntersectionObserver(callbackFunction, {
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



  return (
    <main className="flex max-w-[1400px] flex-col items-center justify-center gap-20 p-6 pb-20 md:mx-auto md:gap-56 md:p-5 md:pt-12 md:pb-40">
      <div className="flex w-full flex-col gap-24 md:gap-32">

        <CraftBlock
          title="Menu Toolbar"
          description="Toolbar that changes state to notify and enable information and actions. Try clicking on the buttons to change the state of the toolbar."
          badges={["react", "tailwind", "framer motion"]}
        >
          <Sampledock footerClassName="relative bottom-0 z-10 left-0 right-0 overflow-x-auto sm:overflow-visible rounded-2xl max-w-fit bg-component border mx-auto shadow-[_0_1px_1px_-0.5px_rgba(0,0,0,0.04),_0_3px_3px_-1.5px_rgba(0,0,0,0.04),_0_12px_12px_-6px_rgba(0,0,0,0.04)]" />
        </CraftBlock>

        <CraftBlock
          title="Flip Clock"
          description="A realistic flip clock animation with proper 3D perspective and sequential digit animations."
          badges={["react", "css"]}
        >
          <SampleFlipClock />
        </CraftBlock>

        <CraftBlock
          title="Simple Book"
          description="A 3D book that slightly opens when hovered over"
          badges={["react", "css"]}

        >
          <Book href="/book1.jpg" imageUrl="/about-me/books/the_making_of_prince_of_persia.jpg" width={135} height={200} backCoverColor="bg-[#2D469B]" title="The Making of Prince of Persia" />
        </CraftBlock>


        <CraftBlock
          title="Turbulence Canvas"
          description="Interactive canvas with animated turbulence effects that wiggle on hover"
          badges={["canvas", "webgl", "animation", "react"]}

        >
          <div className="w-[360px] h-[360px]">
            <TurbulenceCanvas
              ref={turbulenceRef}
              className="!rounded-2xl bg-white cursor-pointer"
              style={{ animation: 'wiggle 0.07s ease infinite' }}
            />
          </div>
        </CraftBlock>

        <CraftBlock
          title="Music Album Player"
          description="Interactive vinyl album with play/pause functionality and spinning animation"
          badges={["animation", "react", "css"]}

        >
          <Album
            albumCover="/about-me/album_covers/initial_d.jpg"
            albumTitle="Super Eurobeat Collection"
            artist="Initial D"
            musicFile="/"
            size="md"
          />
        </CraftBlock>


      </div>
    </main >
  );
}
