"use client"

import * as React from "react"
import { useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import useSound from "use-sound"
import { cn } from "@/lib/utils"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import Image from "next/image"
import { useAlbumContext } from "@/components/ui/album-context"

interface AlbumProps extends React.HTMLAttributes<HTMLDivElement> {
  albumCover: string
  albumTitle: string
  artist: string
  musicFile: string
  size?: "sm" | "md" | "lg"
}

const Album = React.forwardRef<HTMLDivElement, AlbumProps>(
  ({ className, albumCover, albumTitle, artist, musicFile, size = "md", ...props }, ref) => {
    const { currentPlayingId, setCurrentPlayingId, setCurrentTrack, setCurrentSound, volume, isSoundEnabled } = useAlbumContext()

    // Create a unique ID for this album instance
    const albumId = useMemo(() =>
      `${albumTitle}-${artist}-${musicFile}`.replace(/\s+/g, '-').toLowerCase(),
      [albumTitle, artist, musicFile]
    )

    const isPlaying = currentPlayingId === albumId

    const [play, { stop }] = useSound(
      isSoundEnabled ? musicFile : '', // Empty string when disabled
      {
        volume: volume,
        soundEnabled: isSoundEnabled,
        onend: () => {
          setCurrentPlayingId(null)
          setCurrentTrack(null)
          setCurrentSound(null)
        },
      }
    )

    // Register this sound when it becomes the current playing track
    useEffect(() => {
      if (isPlaying) {
        setCurrentSound({ play, stop })
      }
    }, [isPlaying, play, stop, setCurrentSound])

    // Stop this album when another one starts playing
    useEffect(() => {
      if (currentPlayingId !== albumId && currentPlayingId !== null) {
        stop()
      }
    }, [currentPlayingId, albumId, stop])

    // Stop music when sound is disabled
    useEffect(() => {
      if (!isSoundEnabled && isPlaying) {
        // Force stop the audio immediately
        stop()
        setCurrentPlayingId(null)
        setCurrentTrack(null)
        setCurrentSound(null)
      }
    }, [isSoundEnabled, isPlaying, stop, setCurrentPlayingId, setCurrentTrack, setCurrentSound])

    const handleClick = () => {
      if (isPlaying) {
        stop()
        setCurrentPlayingId(null)
        setCurrentTrack(null)
      } else if (isSoundEnabled) {
        // Only play if sound is enabled
        // Stop any currently playing album
        if (currentPlayingId) {
          stop()
        }
        play()
        setCurrentPlayingId(albumId)
        setCurrentTrack({
          id: albumId,
          albumTitle,
          artist,
          albumCover,
          musicFile
        })
      }
    }

    const sizeClasses = {
      sm: "w-32 h-32",
      md: "w-48 h-48",
      lg: "w-64 h-64"
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative cursor-pointer select-none",
          sizeClasses[size],
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {/* Album Cover Container */}
        <div className="relative w-full h-full">
          {/* Vinyl Record */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-2xl"
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{
              duration: 3,
              repeat: isPlaying ? Infinity : 0,
              ease: "linear"
            }}
          >
            {/* Vinyl grooves */}
            <div className="absolute inset-2 rounded-full border border-gray-700/30" />
            <div className="absolute inset-4 rounded-full border border-gray-700/20" />
            <div className="absolute inset-6 rounded-full border border-gray-700/20" />
            <div className="absolute inset-8 rounded-full border border-gray-700/20" />

            {/* Center label with album cover */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-red-800 overflow-hidden border-2 border-red-900">
              <Image
                src={albumCover}
                alt={`${albumTitle} center`}
                className="w-full h-full object-cover"
                width={80}
                height={80}
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-black/50" />
            </div>
          </motion.div>

          {/* Album Cover with HoverCard */}
          <HoverCard openDelay={150} closeDelay={150} >
            <HoverCardTrigger asChild>
              <motion.div
                className="absolute inset-0 rounded-lg overflow-hidden shadow-lg"
                initial={{ x: 0 }}
                animate={{ x: isPlaying ? "45%" : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <Image
                  src={albumCover}
                  alt={`${albumTitle} by ${artist}`}
                  className="w-full h-full object-cover"
                  width={216}
                  height={216}
                />

                {/* Overlay for better vinyl visibility when playing */}
                <motion.div
                  className="absolute inset-0 bg-black/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isPlaying ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </HoverCardTrigger>
            <HoverCardContent sideOffset={8}>
              <div className="text-center">
                <p className="font-medium">{albumTitle}</p>
                <p className="text-xs text-muted-foreground">{artist}</p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    )
  }
)

Album.displayName = "Album"

export { Album }