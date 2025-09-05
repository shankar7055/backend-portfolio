"use client";

import { useRef } from "react";
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function Home() {

  function ScrollScaleElement({ children, className }: {
    children: React.ReactNode;
    className?: string;
  }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.95, 1.05, 0.95]);

    return (
      <motion.div
        ref={ref}
        className={className}
        style={{ scale }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <main className="flex flex-col max-w-3xl mx-auto gap-12 sm:gap-16 p-8 sm:pt-16 pb-28">

      <section className="flex flex-col gap-10 w-full" style={{ "--stagger": 2 } as React.CSSProperties}>

        <div className="flex justify-between place-items-center ">
          <h2> Projects </h2>

        </div>


        <ScrollScaleElement className="flex flex-col gap-2">
          <Link className="flex flex-col gap-2" href="/projects/linkme">
            <Image width={2000} height={1433} alt="" src="/projects/linkme/linkme_home.png" className="rounded-lg"></Image>
          </Link>

          <Link className="w-fit justify-between flex flex-col px-2 py-2 items-start inline-flex rounded-md text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
            href="/notes/redesigning-my-portfolio">
            <h3 className="text-lg">Link.me</h3>
            <h4 className="text-sm text-muted-foreground">Evolving a payment link app for brick-and-mortar businesses to sell online.</h4>
          </Link>
        </ScrollScaleElement>

        <ScrollScaleElement className="flex flex-col gap-2">
          <Link className="flex flex-col gap-2" href="/projects/laureate">
            <Image width={820} height={420} alt="" src="/projects/laureate/Laureate-Home-p-1080.png" className="rounded-lg"></Image>
          </Link>

          <Link className="w-fit justify-between flex flex-col px-2 py-2 items-start inline-flex rounded-md text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
            href="/notes/redesigning-my-portfolio">
            <h3 className="text-lg">Laureate</h3>
            <h4 className="text-sm text-muted-foreground">Redesigning the e-commerce experience for students in distance learning.</h4>
          </Link>
        </ScrollScaleElement>

        <ScrollScaleElement className="flex flex-col gap-2">
          <Link className="flex flex-col gap-2" href="/projects/lumini">
            <Image width={820} height={420} alt="" src="/projects/lumini/home_lumini-p-1080.png" className="rounded-lg"></Image>
          </Link>

          <Link className="w-fit justify-between flex flex-col px-2 py-2 items-start inline-flex rounded-md text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
            href="/notes/redesigning-my-portfolio">
            <h3 className="text-lg">Lumini</h3>
            <h4 className="text-sm text-muted-foreground">Building a career choice experience for students with Lumini App.</h4>
          </Link>
        </ScrollScaleElement>

      </section>

    </main>
  );
}
