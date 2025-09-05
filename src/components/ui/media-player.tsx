"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAlbumContext } from "./album-context"
import { X, Play, Pause, Volume2, VolumeX, Volume1 } from "lucide-react"
import { Button } from "./button"
import Image from "next/image"

export function MediaPlayer() {
  const { currentTrack, currentPlayingId, volume, setVolume, playTrack, pauseTrack, stopTrack } = useAlbumContext()
  const [isExpanded, setIsExpanded] = React.useState(false)

  
  if (!currentTrack) {
    return null
  }

  const isPlaying = currentPlayingId === currentTrack.id

  const handlePlayPause = () => {
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

  const VolumeIcon = getVolumeIcon()

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.8 }}
        transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
        className="fixed bottom-20 left-6 right-6 mx-auto max-w-fit z-20"
      >
        <div className="bg-component border rounded-2xl shadow-2xl backdrop-blur-md">
          <motion.div 
            className="flex items-center gap-3 p-3"
            layout
          >
            {/* Album Cover */}
            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={currentTrack.albumCover}
                alt={currentTrack.albumTitle}
                fill
                className="object-cover"
              />
              <motion.div
                className="absolute inset-0 bg-black/20"
                animate={{ opacity: isPlaying ? 0.3 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Track Info */}
            <div className="flex flex-col min-w-0 flex-1">
              <p className="text-sm font-medium truncate">
                {currentTrack.albumTitle}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {currentTrack.artist}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePlayPause}
                className="w-8 h-8"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </Button>

              {/* Volume Control */}
              <div className="flex items-center gap-2">
                <VolumeIcon className="w-4 h-4 text-muted-foreground" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-2 bg-muted rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <div className="text-xs text-muted-foreground min-w-[32px] text-center">
                  {Math.round(volume * 100)}%
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="w-8 h-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* Playing Indicator */}
          {isPlaying && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              className="h-1 bg-primary rounded-b-2xl origin-left"
            />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

MediaPlayer.displayName = "MediaPlayer"