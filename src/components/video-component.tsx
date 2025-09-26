"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from './ui/button';

type VideoComponentProps = React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement> & {
    src: string;
};

export default function VideoComponent({ src, className, ...props }: VideoComponentProps) {
    const [isZoomed, setIsZoomed] = useState(false);

    if (!src) return null;

    return (
        <div className={`${isZoomed ? 'static' : 'relative'}`}>
            <div className='max-w-4xl rounded-lg bg-background'>
                <video className="w-full h-auto invisible " src={src} {...props} />
            </div>
            {isZoomed ? (
                <motion.div
                    className={`fixed inset-0 backdrop-blur-sm ${isZoomed ? "z-50" : ""} `}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                />
            ) : null}

            <motion.div
                className={`${isZoomed ? "fixed inset-0 z-50" : "absolute inset-0"} flex items-center justify-center`}
                onClick={() => setIsZoomed(!isZoomed)}
            >

                <motion.div className="relative w-full max-w-4xl cursor-pointer rounded-lg shadow-md" layout transition={{ duration: 0.4 }} >
                    <video className="w-full h-full my-0 border-none" src={src} autoPlay loop muted playsInline {...props} />
                </motion.div>


            </motion.div>
        </div>
    );
}