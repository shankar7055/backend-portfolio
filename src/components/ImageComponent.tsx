"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

// Inner component that uses the cursor context
function ImageContent({ src, alt, className, width, height, isZoomed, setIsZoomed, priority }: {
    src: string;
    alt?: string;
    className?: string;
    width: number;
    height: number;
    isZoomed: boolean;
    priority?: boolean;
    setIsZoomed: (zoomed: boolean) => void;
}) {
    // Preload the high-quality version
    useEffect(() => {
        const img = new window.Image();
        img.src = src;
    }, [src]);

    return (
        <Dialog.Root open={isZoomed} onOpenChange={setIsZoomed}>
            <Dialog.Trigger asChild>
                <motion.div
                    className="relative cursor-zoom-in"
                    layoutId={src}
                    transition={{ duration: 0.4 }}
                    data-cursor="hover"
                >
                    <Image
                        src={src}
                        alt={alt || ''}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                        className={className}
                        width={width}
                        height={height}
                        quality={95}
                        priority={priority}
                    />
                </motion.div>
            </Dialog.Trigger>

            <AnimatePresence>
                {isZoomed && (
                    <Dialog.Portal forceMount>
                        <Dialog.Overlay forceMount className="z-50 fixed inset-0 flex items-center justify-center">
                            <motion.div
                                className="fixed inset-0 backdrop-blur-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                            <Dialog.Close asChild>
                                <Dialog.Content forceMount asChild className="fixed p-0 max-w-5xl w-full rounded-xl overflow-clip z-50 border-none flex items-center justify-center shadow-xl cursor-zoom-out">
                                    <motion.div
                                        className='aspect-auto'
                                        layoutId={src}
                                        transition={{ duration: 0.3 }}
                                        data-cursor="expanded"
                                    >
                                        <VisuallyHidden.Root><Dialog.Title /></VisuallyHidden.Root>
                                        <VisuallyHidden.Root><Dialog.Description /></VisuallyHidden.Root>

                                        <Image
                                            src={src}
                                            alt={alt || ''}
                                            className={`${className} z-50 transform-none`}
                                            width={width}
                                            height={height}
                                            quality={100}
                                            sizes="90vw"
                                            priority
                                        />
                                    </motion.div>
                                </Dialog.Content>
                            </Dialog.Close>
                        </Dialog.Overlay>
                    </Dialog.Portal>
                )}
            </AnimatePresence>
        </Dialog.Root>
    );
}

export default function ImageComponent({ src, alt, className, width, height, priority }: {
    src: string;
    alt?: string;
    className?: string;
    width: number;
    height: number;
    priority?: boolean;
}) {
    const [isZoomed, setIsZoomed] = useState(false);

    if (!src) return null;

    return (
        <ImageContent
            src={src}
            alt={alt}
            className={className}
            width={width}
            height={height}
            isZoomed={isZoomed}
            setIsZoomed={setIsZoomed}
            priority={priority}
        />
    );
}