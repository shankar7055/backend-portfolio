"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { AnimatePresence, delay, motion } from "framer-motion";
import {
  CraftOutlined,
  CraftFilled,
  CameraOutlined,
  CameraFilled,
  NotebookOutlined,
  NotebookFilled,
  UserOutlined,
  UserFilled,
  HomeFilled,
  HomeOutlined,
  VolumeOnline,
  VolumeMuted,
  CubeFilled,
  CubeOutlined,
  Sun,
  Moon,
  PinFlag,
  ArrowUpDownLeftRight,
  StopCircle,
} from "../icons/index";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useSound } from "use-sound";
import { MotionLink } from "./customMotionComponent";
import WebGLRaymarching from "@/components/shaders/web-gl-shader3";
import { useAlbumContext } from "@/components/ui/album-context";
import Goo from "@/components/ui/goo";
import { X, Play, Pause, Volume2, VolumeX, Volume1 } from "lucide-react"
import Image from "next/image"


export default function Dock() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);


  const { currentTrack, currentPlayingId, volume, setVolume, playTrack, pauseTrack, stopTrack } = useAlbumContext()
  const [isExpanded, setIsExpanded] = React.useState(false)

  const isPlaying = currentTrack && currentPlayingId === currentTrack.id

  const handlePlayPause = () => {
    if (!currentTrack) return;

    if (isPlaying) {
      pauseTrack()
    } else {
      playTrack(currentTrack)
    }
  }

  const handleClose = () => {
    stopTrack()
  }

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value)
    setVolume(newVolume)
  }


  const getVolumeIcon = () => {
    if (volume === 0) return VolumeX
    if (volume < 0.5) return Volume1
    return Volume2
  }

  const [dockState, setDockState] = useState('default');

  useEffect(() => {
    const getDockState = () => {
      if (currentTrack) return 'musicplaying';
      return 'default';
    };

    setDockState(getDockState());
  }, [currentTrack]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= 768;
    }
    return false;
  };



  const [isSoundEnabled, setIsSoundEnabled] = useState(!isMobile());

  const [playDarkSound] = useSound("/sounds/darkmode.wav", {
    soundEnabled: isSoundEnabled,
  });
  const [playLightSound] = useSound("/sounds/lightmode.wav", {
    soundEnabled: isSoundEnabled,
  });
  const [playEnabledSound] = useSound("/sounds/turn-on.wav", {
    forceSoundEnabled: true,
  });
  const [playDisabledSound] = useSound("/sounds/turn-off.wav", {
    soundEnabled: isSoundEnabled,
  });
  const [playClickSound] = useSound("/sounds/click.wav", {
    soundEnabled: isSoundEnabled,
  });

  const handleAudioClick = () => {
    if (isSoundEnabled) {
      playDisabledSound();
    } else {
      playEnabledSound();
    }
    setIsSoundEnabled(!isSoundEnabled);
  };

  const handleThemeClick = () => {
    if (theme === "dark") {
      setTheme("light");
      playLightSound();
    } else {
      setTheme("dark");
      playDarkSound();
    }
  };

  const handleClick = () => {
    playClickSound();
  };

  if (!mounted) return null;

  const isChessPage = pathname === "/chess";

  return (
    <div className="w-full px-4 fixed flex flex-col gap-2 items-center rounded-lg bottom-4 left-1/2 -translate-x-1/2 max-w-fit" >
        {pathname === "/" && (
          <div className="bg-component w-fit font-medium text-sm px-3 py-1.5 rounded-2xl flex gap-2 z-20 pointer-events-none items-center whitespace-nowrap animate-bounce">
            <ArrowUpDownLeftRight className="size-5"></ArrowUpDownLeftRight>
            Drag to move
          </div>
        )}
      
      <Goo composite intensity="weak" className="w-full flex flex-col items-center gap-4">
        <AnimatePresence>
          {currentTrack && (
            <motion.div
              initial={{
                scaleX: 0.20,
                x: 0,
              }}
              animate={{
                scaleX: 1,
                x: -370,
              }}
              exit={{
                x: 0,

                transition: {
                  x: {
                    type: "spring",
                    duration: 0.8,
                    bounce: 0,
                  }
                }
              }}
              transition={{
                x: {
                  type: "spring",
                  duration: 0.6,
                  bounce: 0
                },
                scaleX: {
                  type: "spring",
                  duration: 0.4,
                  bounce: 0.1,
                }
              }}

              className={`absolute h-full rounded-2xl overflow-hidden bg-component max-w-fit origin-right shadow-[_0_1px_1px_-0.5px_rgba(0,0,0,0.04),_0_3px_3px_-1.5px_rgba(0,0,0,0.04),_0_12px_12px_-6px_rgba(0,0,0,0.04)]`}
            >

              <motion.div
                className="flex items-center gap-3 p-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,

                  transition: {
                    opacity: {
                      duration: 0.1,
                    }
                  }
                }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                {/* Album Cover */}
                <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                  <Image
                    src={currentTrack.albumCover}
                    alt={currentTrack.albumTitle}
                    fill
                    className="object-cover"
                    sizes="md"
                  />
                  <motion.div
                    className="absolute inset-0 bg-black/20"
                    animate={{ opacity: isPlaying ? 0.3 : 0 }}
                    exit={{
                      opacity: 0
                    }}
                  />
                </div>

                {/* Track Info */}
                <div className="flex flex-col h-10 w-32">
                  <p className="text-sm font-medium truncate">
                    {currentTrack.albumTitle}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {currentTrack.artist}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="w-10 h-10"
                >
                  <StopCircle className="w-6 h-6" />
                </Button>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>



        <motion.div
          initial={{}}
          animate={{
            x: currentTrack ? 0 : 0
          }}
          exit={{}}
          transition={{
            x: {
              type: "spring",
              duration: 0.6,
              bounce: 0,
            },
          }}

          className="w-full px-2 py-2 bg-component scrollbar-none overflow-y-hidden overflow-x-auto sm:overflow-visible rounded-2xl w-fit flex h-[3.5rem] items-center gap-2 relative z-10 shadow-[_0_1px_1px_-0.5px_rgba(0,0,0,0.04),_0_3px_3px_-1.5px_rgba(0,0,0,0.04),_0_12px_12px_-6px_rgba(0,0,0,0.04)]"

        >
          <AppIcon
            href="/"
            ariaLabel="Home"
            isActive={pathname === "/"}
            FilledIcon={HomeFilled}
            OutlinedIcon={HomeOutlined}
            onClick={handleClick}
          />
          <AppIcon
            href="/projects"
            ariaLabel="Projects"
            isActive={pathname.startsWith("/projects")}
            FilledIcon={CubeFilled}
            OutlinedIcon={CubeOutlined}
            onClick={handleClick}
          />
          <AppIcon
            href="/craft"
            ariaLabel="Craft"
            isActive={pathname.startsWith("/craft")}
            FilledIcon={CraftFilled}
            OutlinedIcon={CraftOutlined}
            onClick={handleClick}
          />
          {/*}
          <AppIcon
            href="/about"
            ariaLabel="About"
            isActive={pathname.startsWith("/about")}
            FilledIcon={UserFilled}
            OutlinedIcon={UserOutlined}
            onClick={handleClick}
          />
          {*/}
          <AppIcon
            href="/notes"
            ariaLabel="Notes"
            isActive={pathname.startsWith("/notes")}
            FilledIcon={NotebookFilled}
            OutlinedIcon={NotebookOutlined}
            onClick={handleClick}
          />
          <AppIcon
            href="/photos"
            ariaLabel="Photos"
            isActive={pathname.startsWith("/photos")}
            FilledIcon={CameraFilled}
            OutlinedIcon={CameraOutlined}
            onClick={handleClick}
          />

          {isChessPage && (
            <ChessAppIcon
              href="/chess"
              ariaLabel="Secret Stage"
              onClick={handleClick}
            />
          )}

          <Separator className="mx-1.5" orientation="vertical" />

          <ModeToggle
            handleClick={handleThemeClick}
            FilledIcon={Sun}
            OutlinedIcon={Moon}
            ariaLabel="Toggle Theme"
            isActive={theme === "dark"}
          />

          <ModeToggle
            handleClick={handleAudioClick}
            FilledIcon={VolumeOnline}
            OutlinedIcon={VolumeMuted}
            ariaLabel="Toggle Audio"
            isActive={isSoundEnabled}
            className="audio-toggle-button"
          />
        </motion.div>
      </Goo>
    </div>
  );
}

interface AppIconProps {
  href: string;
  ariaLabel: string;
  isActive: boolean;
  FilledIcon: React.ComponentType<{ className: string }>;
  OutlinedIcon: React.ComponentType<{ className: string }>;
  onClick: () => void;
}

function AppIcon({
  href,
  ariaLabel,
  isActive,
  FilledIcon,
  OutlinedIcon,
  onClick,
}: AppIconProps) {
  const Icon = isActive ? FilledIcon : OutlinedIcon;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <MotionLink
            href={href}
            className={`shrink-0 overflow-hidden flex h-10 rounded-xl items-center justify-center px-[10px] ${isActive ? "bg-component-active" : "hover:bg-accent"} relative`}
            onClick={onClick}
          >
            <Icon className="h-5 w-5 shrink-0 relative z-10" />

            <AnimatePresence initial={false}>
              {isActive && (
                <motion.h1
                  key="label"
                  initial={{
                    opacity: 0,
                    width: 0,
                    marginLeft: 4,
                  }}
                  animate={{ opacity: 1, width: "auto", marginLeft: 4 }}
                  transition={{ type: "spring", duration: 0.6, bounce: 0 }}
                  exit={{
                    opacity: 0,
                    width: 0,
                    marginLeft: 0,
                    transition: {
                      opacity: { duration: 0.2 },
                      marginLeft: { delay: 0.2, duration: 0.2 },
                      width: { type: "spring", duration: 0.6, bounce: 0 },
                    },
                  }}
                  className="text-sm font-medium whitespace-nowrap overflow-hidden text-accent-foreground leading-snug relative z-10"
                >
                  {ariaLabel}
                </motion.h1>
              )}
            </AnimatePresence>
          </MotionLink>
        </TooltipTrigger>
        <TooltipContent>
          <span>{ariaLabel}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface ModeToggleProps {
  handleClick: () => void;
  FilledIcon: React.ComponentType<{ className: string }>;
  OutlinedIcon: React.ComponentType<{ className: string }>;
  ariaLabel: string;
  isActive: boolean;
  className?: string;
}

function ModeToggle({
  handleClick,
  FilledIcon,
  OutlinedIcon,
  ariaLabel,
  isActive,
  className,
}: ModeToggleProps) {
  const Icon = isActive ? FilledIcon : OutlinedIcon;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClick}
            aria-label={ariaLabel}
            className={`shrink-0 aspect-square w-[2.5rem] h-[2.5rem] bg-component' rounded-xl relative flex items-center justify-center ${className}`}
          >
            <Icon className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>{ariaLabel}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface ChessAppIconProps {
  href: string;
  ariaLabel: string;
  onClick: () => void;
}

function ChessAppIcon({ href, ariaLabel, onClick }: ChessAppIconProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <MotionLink
            href={href}
            className="shrink-0 gap-1 overflow-hidden flex h-10 rounded-xl items-center justify-center bg-component-active relative"
            onClick={onClick}
          >

            <div className="flex flex-row bg-white/10 rounded-lg w-full h-full items-center justify-center px-[10px] z-10 hover:bg-white/20 ">
              <PinFlag className="h-5 w-5 shrink-0 relative z-10 text-white" />

              <motion.h1
                key="label"
                initial={{
                  opacity: 0,
                  width: 0,
                  marginLeft: 4,
                }}
                animate={{ opacity: 1, width: "auto", marginLeft: 4 }}
                transition={{ type: "spring", duration: 0.6, bounce: 0 }}
                className="text-sm font-medium whitespace-nowrap overflow-hidden text-[white] leading-snug relative z-10"
              >
                {ariaLabel}
              </motion.h1>
            </div>

            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <WebGLRaymarching />
            </div>
          </MotionLink>
        </TooltipTrigger>
        <TooltipContent>
          <span>{ariaLabel}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}


AppIcon.displayName = "AppIcon";
ModeToggle.displayName = "ModeToggle";
ChessAppIcon.displayName = "ChessAppIcon";
