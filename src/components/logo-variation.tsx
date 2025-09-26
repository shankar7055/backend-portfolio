"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { SparklesTwo } from "./icons";
import { motion, AnimatePresence } from "framer-motion";

export function LogoVariation() {
  const [currentImage, setCurrentImage] = useState<string>("001.png");

  const getRandomImage = () => {
    const imageNumber = Math.floor(Math.random() * 118) + 1;
    return `${imageNumber.toString().padStart(3, "0")}.png`;
  };

  const handleRandomize = () => {
    let newImage;
    do {
      newImage = getRandomImage();
    } while (newImage === currentImage);
    setCurrentImage(newImage);
  };

  useEffect(() => {
    setCurrentImage(getRandomImage());
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 relative border border-gray-100 border-4 rounded-2xl overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
          className="w-full h-full"
        >
          <Image
            src={`/about-me/logo-variation/${currentImage}`}
            alt="Logo variation"
            width={1024}
            height={1024}
            className="object-contain bg-black"
          />
        </motion.div>
      </AnimatePresence>

      <Button variant="secondary" size="icon" onClick={handleRandomize} className="absolute right-4 top-4">
        <SparklesTwo className=""></SparklesTwo>
      </Button>
    </div>
  );
}