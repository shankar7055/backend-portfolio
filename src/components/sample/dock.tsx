"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
} from "../icons/index";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useTheme } from "next-themes";
import { useSound } from "use-sound";

interface DockProps {
  footerClassName?: string;
}

export default function Sampledock({ footerClassName }: DockProps = {}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeItem, setActiveItem] = useState("home");

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

  const [playClickSound] = useSound("/sounds/click.wav", {
    soundEnabled: isSoundEnabled,
  });


  const handleClick = (id: string) => {
    playClickSound();
    setActiveItem(id);
  };

  if (!mounted) return null;

  return (
    <footer className={footerClassName || "fixed bottom-6 z-10 left-6 right-6 overflow-x-auto sm:overflow-visible rounded-2xl max-w-fit bg-component border mx-auto shadow-[_0_1px_1px_-0.5px_rgba(0,0,0,0.04),_0_3px_3px_-1.5px_rgba(0,0,0,0.04),_0_12px_12px_-6px_rgba(0,0,0,0.04)]"}>
      <motion.div className="w-fit flex h-[3.5rem] items-center gap-2 px-2 py-2">
        <AppIcon
          id="home"
          ariaLabel="Home"
          isActive={activeItem === "home"}
          FilledIcon={HomeFilled}
          OutlinedIcon={HomeOutlined}
          onClick={handleClick}
        />
        <AppIcon
          id="projects"
          ariaLabel="Projects"
          isActive={activeItem === "projects"}
          FilledIcon={CubeFilled}
          OutlinedIcon={CubeOutlined}
          onClick={handleClick}
        />
        <AppIcon
          id="craft"
          ariaLabel="Craft"
          isActive={activeItem === "craft"}
          FilledIcon={CraftFilled}
          OutlinedIcon={CraftOutlined}
          onClick={handleClick}
        />
        <AppIcon
          id="about"
          ariaLabel="About"
          isActive={activeItem === "about"}
          FilledIcon={UserFilled}
          OutlinedIcon={UserOutlined}
          onClick={handleClick}
        />
        <AppIcon
          id="notes"
          ariaLabel="Notes"
          isActive={activeItem === "notes"}
          FilledIcon={NotebookFilled}
          OutlinedIcon={NotebookOutlined}
          onClick={handleClick}
        />
        <AppIcon
          id="photos"
          ariaLabel="Photos"
          isActive={activeItem === "photos"}
          FilledIcon={CameraFilled}
          OutlinedIcon={CameraOutlined}
          onClick={handleClick}
        />

      </motion.div>
    </footer>
  );
}

interface AppIconProps {
  id: string;
  ariaLabel: string;
  isActive: boolean;
  FilledIcon: React.ComponentType<{ className: string }>;
  OutlinedIcon: React.ComponentType<{ className: string }>;
  onClick: (id: string) => void;
}

function AppIcon({
  id,
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
          <div
            className={`shrink-0 overflow-hidden flex h-10 bg-component rounded-xl items-center justify-center px-[10px] cursor-pointer ${
              isActive ? "bg-component-active" : "hover:bg-accent"
            }`}
            onClick={() => onClick(id)}
          >
            <Icon className="h-5 w-5 shrink-0" />

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
                  className="text-sm font-medium whitespace-nowrap overflow-hidden text-accent-foreground leading-snug"
                >
                  {ariaLabel}
                </motion.h1>
              )}
            </AnimatePresence>
          </div>
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
            className={`shrink-0 aspect-square w-[2.5rem] h-[2.5rem] mix-blend-normal rounded-xl relative flex items-center justify-center ${className}`}
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

AppIcon.displayName = "AppIcon";
ModeToggle.displayName = "ModeToggle";
