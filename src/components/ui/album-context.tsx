"use client"

import React, { createContext, useContext, useState, ReactNode, useRef } from 'react'
import useSound from 'use-sound'

interface CurrentTrack {
  id: string
  albumTitle: string
  artist: string
  albumCover: string
  musicFile: string
}

interface AlbumContextType {
  currentPlayingId: string | null
  currentTrack: CurrentTrack | null
  volume: number
  setCurrentPlayingId: (id: string | null) => void
  setCurrentTrack: (track: CurrentTrack | null) => void
  setVolume: (volume: number) => void
  playTrack: (track: CurrentTrack) => void
  pauseTrack: () => void
  stopTrack: () => void
  setCurrentSound: (sound: { play: () => void; stop: () => void } | null) => void
}

const AlbumContext = createContext<AlbumContextType | undefined>(undefined)

export function AlbumProvider({ children }: { children: ReactNode }) {
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null)
  const [currentTrack, setCurrentTrack] = useState<CurrentTrack | null>(null)
  const [volume, setVolume] = useState<number>(0.7) // Default volume 70%
  const currentSoundRef = useRef<{ play: () => void; stop: () => void } | null>(null)

  const playTrack = (track: CurrentTrack) => {
    // Stop current track if playing
    if (currentSoundRef.current) {
      currentSoundRef.current.stop()
    }
    
    setCurrentTrack(track)
    setCurrentPlayingId(track.id)
  }

  const pauseTrack = () => {
    if (currentSoundRef.current) {
      currentSoundRef.current.stop()
    }
    setCurrentPlayingId(null)
  }

  const stopTrack = () => {
    if (currentSoundRef.current) {
      currentSoundRef.current.stop()
    }
    setCurrentPlayingId(null)
    setCurrentTrack(null)
    currentSoundRef.current = null
  }

  const setCurrentSound = (sound: { play: () => void; stop: () => void } | null) => {
    currentSoundRef.current = sound
  }

  return (
    <AlbumContext.Provider value={{ 
      currentPlayingId, 
      currentTrack, 
      volume,
      setCurrentPlayingId, 
      setCurrentTrack, 
      setVolume,
      playTrack, 
      pauseTrack, 
      stopTrack,
      setCurrentSound 
    }}>
      {children}
    </AlbumContext.Provider>
  )
}

export function useAlbumContext() {
  const context = useContext(AlbumContext)
  if (context === undefined) {
    throw new Error('useAlbumContext must be used within an AlbumProvider')
  }
  return context
}