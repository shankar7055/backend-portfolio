'use client';

import { Button } from "@/components/ui/button";
import { SoundFxFilled } from "@/components/icons/index";

export function SoundButton() {
  const playSound = () => {
    const audio = new Audio('/sounds/gambiarra.mp3');
    audio.play().catch(e => console.log('Audio play failed:', e));
  };

  return (
    <Button variant="secondary" size="icon" onClick={playSound}>
      <SoundFxFilled className="size-6" />
    </Button>
  );
}