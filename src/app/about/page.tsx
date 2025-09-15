"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Github, Twitter, Linkedin, ArrowUpRight } from "@/components/icons/index"

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

export default function Home() {

  return (
    <main className="flex flex-col max-w-3xl mx-auto gap-12 sm:gap-16 p-8 sm:pt-16 pb-28 orchestration">

      <section className="flex flex-col gap-4 w-full" style={{ "--stagger": 1 } as React.CSSProperties}>

        <Avatar className="w-20 h-20">
          <AvatarImage src="/profilePicture.png" alt="Profile Picture" />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>

        <h1> Hey I'm Andre! </h1>

        <div className="flex flex-col gap-6">
          <span className="text-base leading-relaxed">
            Welcome to <em>my space on the internet.</em> I'm a design engineer who codes and crafts product strategies.
            Currently working at Praia Healthcare.
          </span>

          <div className="flex flex-row gap-4">
            <Button asChild variant="secondary" size="sm" className="gap-2">
              <Link href="https://x.com/andregsweb" target="_blank" rel="noopener noreferrer">
                <Twitter className="w-5 h-5" />
                Twitter

              </Link>
            </Button>
            <Button asChild variant="secondary" size="sm" className="gap-2">
              <Link href="https://www.linkedin.com/in/andregsweb/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5" />
                Linkedin

              </Link>
            </Button>
            <Button asChild variant="secondary" size="sm" className="gap-2">
              <Link href="https://github.com/andregsweb" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5" />
                GitHub

              </Link>
            </Button>
            <Button asChild variant="secondary" size="sm" className="gap-2">
              <Link href="mailto:hi@andregs.com" target="_blank" rel="noopener noreferrer">
                <Mail className="w-5 h-5" />
                Mail

              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-10 w-full" style={{ "--stagger": 2 } as React.CSSProperties}>

        <div className="flex justify-between place-items-center ">
          <h2> Projects </h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/projects"> View all </Link>
          </Button>
        </div>

        <ScrollScaleElement className="flex flex-col gap-2">
          <Link className="flex flex-col gap-2" href="/projects/linkme">
            <Image width={2000} height={1433} alt="" src="/projects/linkme/linkme_home.png" className="rounded-lg"></Image>
          </Link>

          <Link className="w-fit justify-between flex flex-col px-2 py-2 items-start inline-flex rounded-md text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
            href="/projects/linkme">
            <h3 className="text-lg">Link.me</h3>
            <h4 className="text-sm text-muted-foreground">Evolving a payment link app for brick-and-mortar businesses to sell online.</h4>
          </Link>
        </ScrollScaleElement>

        <ScrollScaleElement className="flex flex-col gap-2">
          <Link className="flex flex-col gap-2" href="/projects/laureate">
            <Image width={820} height={420} alt="" src="/projects/laureate/Laureate-Home-p-1080.png" className="rounded-lg"></Image>
          </Link>

          <Link className="w-fit justify-between flex flex-col px-2 py-2 items-start inline-flex rounded-md text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
            href="/projects/laureate">
            <h3 className="text-lg">Laureate</h3>
            <h4 className="text-sm text-muted-foreground">Redesigning the e-commerce experience for students in distance learning.</h4>
          </Link>
        </ScrollScaleElement>

        <ScrollScaleElement className="flex flex-col gap-2">
          <Link className="flex flex-col gap-2" href="/projects/lumini">
            <Image width={820} height={420} alt="" src="/projects/lumini/home_lumini-p-1080.png" className="rounded-lg"></Image>
          </Link>

          <Link className="w-fit justify-between flex flex-col px-2 py-2 items-start inline-flex rounded-md text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
            href="/projects/lumini">
            <h3 className="text-lg">Lumini</h3>
            <h4 className="text-sm text-muted-foreground">Building a career choice experience for students with Lumini App.</h4>
          </Link>
        </ScrollScaleElement>

      </section>

      <section className="flex flex-col gap-6 w-full" style={{ "--stagger": 3 } as React.CSSProperties}>

        <div className="flex justify-between place-items-center ">
          <h2> Notes </h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/notes"> View all </Link>
          </Button>
        </div>

        <ul className="flex flex-1 flex-col gap-2">
          <li>
            <Button asChild variant="ghost">
              <Link
                className="w-[calc(100%+32px)] justify-between -mx-4"
                href="/notes/redesigning-my-portfolio"
              >
                {" "}
                Redesigning my portfolio
                <Separator className="mx-4 flex grow shrink mix-blend-multiply dark:mix-blend-lighten"></Separator>
                <span className="tabular text-sm font-normal text-muted-foreground self-center">
                  Sep 2024
                </span>
              </Link>
            </Button>
          </li>
          <li>
            <Button asChild variant="ghost">
              <Link
                className="w-[calc(100%+32px)] justify-between -mx-4"
                href="/notes/the-zettelkasten-method"
              >
                {" "}
                The Zettelkasten method
                <Separator className="mx-4 flex grow shrink mix-blend-multiply dark:mix-blend-lighten"></Separator>
                <span className="tabular text-sm font-normal text-muted-foreground self-center">
                  Feb 2023
                </span>
              </Link>
            </Button>
          </li>
          <li>
            <Button asChild variant="ghost">
              <Link
                className="w-[calc(100%+32px)] justify-between -mx-4"
                href="/notes/how-to-study-&-learn"
              >
                {" "}
                How to study & learn
                <Separator className="mx-4 flex grow shrink mix-blend-multiply dark:mix-blend-lighten"></Separator>
                <span className="tabular text-sm font-normal text-muted-foreground self-center">
                  Dec 2018
                </span>
              </Link>
            </Button>
          </li>
          <li>
            <Button asChild variant="ghost">
              <Link
                className="w-[calc(100%+32px)] justify-between -mx-4"
                href="/notes/conversational-interfaces"
              >
                {" "}
                Conversational interfaces
                <Separator className="mx-4 flex grow shrink mix-blend-multiply dark:mix-blend-lighten"></Separator>
                <span className="tabular text-sm font-normal text-muted-foreground self-center">
                  Dec 2018
                </span>
              </Link>
            </Button>
          </li>
        </ul>

      </section>


    </main>
  );
}