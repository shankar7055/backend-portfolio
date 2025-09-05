"use client"

import React, { useState } from "react";
import Image from "next/image";
import * as Dialog from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Photos() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = [
    // New York - Landscape
    /*
    "/photography/newYork/landscape/DSCF1433.jpg",
    "/photography/newYork/landscape/DSCF1447.jpg",
    "/photography/newYork/landscape/DSCF1450.jpg",
    "/photography/newYork/landscape/DSCF1471.jpg",
    "/photography/newYork/landscape/DSCF1472.jpg",
    "/photography/newYork/landscape/DSCF1490.jpg",
    "/photography/newYork/landscape/DSCF1502.jpg",
    "/photography/newYork/landscape/DSCF1504.jpg",
    "/photography/newYork/landscape/DSCF1507.jpg",
    "/photography/newYork/landscape/DSCF1512.jpg",
    "/photography/newYork/landscape/DSCF1517.jpg",
    "/photography/newYork/landscape/DSCF1522.jpg",
    "/photography/newYork/landscape/DSCF1550.jpg",
    "/photography/newYork/landscape/DSCF1558.jpg",
    "/photography/newYork/landscape/DSCF1568.jpg",
    "/photography/newYork/landscape/DSCF1570.jpg",
    "/photography/newYork/landscape/DSCF1593.jpg",
    "/photography/newYork/landscape/DSCF1604.jpg",
    "/photography/newYork/landscape/DSCF1614.jpg",
    "/photography/newYork/landscape/DSCF1617.jpg",
    "/photography/newYork/landscape/DSCF1646.jpg",
    "/photography/newYork/landscape/DSCF1653.jpg",
    "/photography/newYork/landscape/DSCF1659.jpg",
    "/photography/newYork/landscape/DSCF1697.jpg",
    "/photography/newYork/landscape/DSCF1727.jpg",
    "/photography/newYork/landscape/DSCF1732.jpg",
    "/photography/newYork/landscape/DSCF1774.jpg",
    "/photography/newYork/landscape/DSCF1806.jpg",
    */


    // New York - Portrait
    "/photography/newYork/portrait/DSCF1585.jpg",
    "/photography/newYork/portrait/DSCF1597.jpg",
    "/photography/newYork/portrait/DSCF1603.jpg",
    "/photography/newYork/portrait/DSCF1621.jpg",
    "/photography/newYork/portrait/DSCF1649.jpg",
    "/photography/newYork/portrait/DSCF1667.jpg",
    "/photography/newYork/portrait/DSCF1709.jpg",
    "/photography/newYork/portrait/DSCF1728.jpg",
    "/photography/newYork/portrait/DSCF1816.jpg",
    "/photography/newYork/portrait/DSCF1817.jpg",
    "/photography/newYork/portrait/DSCF1870.jpg",
    "/photography/newYork/portrait/DSCF1439.jpg",
    "/photography/newYork/portrait/DSCF1452.jpg",
    "/photography/newYork/portrait/DSCF1458.jpg",
    "/photography/newYork/portrait/DSCF1465.jpg",
    "/photography/newYork/portrait/DSCF1481.jpg",
    "/photography/newYork/portrait/DSCF1494.jpg",
    "/photography/newYork/portrait/DSCF1536.jpg",
    "/photography/newYork/portrait/DSCF1539.jpg",
    "/photography/newYork/portrait/DSCF1552.jpg",
    "/photography/newYork/portrait/IMG_0040.jpg",
    "/photography/newYork/portrait/IMG_0062.jpg",
    "/photography/newYork/portrait/IMG_0069.jpg",
    "/photography/newYork/portrait/IMG_0076.jpg",
    "/photography/newYork/portrait/IMG_0084.jpg",
    "/photography/newYork/portrait/IMG_0090.jpg",
    "/photography/newYork/portrait/IMG_0093.jpg",
    "/photography/newYork/portrait/IMG_0097.jpg",
    "/photography/newYork/portrait/IMG_0099.jpg",
    "/photography/newYork/portrait/IMG_0120.jpg",
    "/photography/newYork/portrait/IMG_0161.jpg",
    "/photography/newYork/portrait/IMG_0169.jpg",


    // Toronto - Landscape
    /*} "/photography/toronto/landscape/DSCF0022.jpg",
     "/photography/toronto/landscape/DSCF0029.jpg",
     "/photography/toronto/landscape/DSCF0037.jpg",
     "/photography/toronto/landscape/DSCF0041.jpg",
     "/photography/toronto/landscape/DSCF0063.jpg",
     "/photography/toronto/landscape/DSCF0072.jpg",
     "/photography/toronto/landscape/DSCF0074.jpg",
     "/photography/toronto/landscape/DSCF0099.jpg",
     "/photography/toronto/landscape/DSCF0111.jpg",
     "/photography/toronto/landscape/DSCF0113.jpg",
     "/photography/toronto/landscape/DSCF0118.jpg",
     "/photography/toronto/landscape/DSCF0127.jpg",
     "/photography/toronto/landscape/DSCF0130.jpg",
     "/photography/toronto/landscape/DSCF0138.jpg",
     "/photography/toronto/landscape/DSCF0144.jpg",
     "/photography/toronto/landscape/DSCF0147.jpg",
     "/photography/toronto/landscape/DSCF0180.jpg",
     "/photography/toronto/landscape/DSCF0224.jpg",
     "/photography/toronto/landscape/DSCF0267.jpg",
     "/photography/toronto/landscape/DSCF0268.jpg",
     "/photography/toronto/landscape/DSCF0271.jpg",
     "/photography/toronto/landscape/DSCF0274.jpg",
     "/photography/toronto/landscape/DSCF0275.jpg",
     "/photography/toronto/landscape/DSCF0307.jpg",
     "/photography/toronto/landscape/DSCF0310.jpg",
     "/photography/toronto/landscape/DSCF0400.jpg",
     "/photography/toronto/landscape/DSCF0414.jpg",
     "/photography/toronto/landscape/DSCF0417.jpg",
     "/photography/toronto/landscape/DSCF0435.jpg",
     "/photography/toronto/landscape/DSCF0437.jpg",
     "/photography/toronto/landscape/DSCF0439.jpg",
     "/photography/toronto/landscape/DSCF0448.jpg",
     "/photography/toronto/landscape/DSCF0457.jpg",
     "/photography/toronto/landscape/DSCF0460.jpg",
     "/photography/toronto/landscape/DSCF0478.jpg",
     "/photography/toronto/landscape/DSCF0483.jpg",
 
     */


    // Toronto - Portrait
    "/photography/toronto/portrait/DSCF0096.jpg",
    "/photography/toronto/portrait/DSCF0069.jpg",
    "/photography/toronto/portrait/DSCF0087.jpg",
    "/photography/toronto/portrait/IMG_3599.jpg",
    "/photography/toronto/portrait/IMG_3184.jpg",
    "/photography/toronto/portrait/IMG_3185.jpg",
    "/photography/toronto/portrait/IMG_3187.jpg",
    "/photography/toronto/portrait/IMG_3192.jpg",
    "/photography/toronto/portrait/IMG_3219.jpg",
    "/photography/toronto/portrait/IMG_3249.jpg",
    "/photography/toronto/portrait/IMG_3267.jpg",
    "/photography/toronto/portrait/IMG_3273.jpg",


    // Patagonia - Portrait
    "/photography/patagonia/portrait/DSCF1878.jpg",
    "/photography/patagonia/portrait/DSCF1879.jpg",
    "/photography/patagonia/portrait/DSCF1885.jpg",
    "/photography/patagonia/portrait/DSCF1892.jpg",
    "/photography/patagonia/portrait/DSCF1895.jpg",
    "/photography/patagonia/portrait/DSCF1896.jpg",
    "/photography/patagonia/portrait/DSCF1901.jpg",
    "/photography/patagonia/portrait/DSCF1979.jpg",
    "/photography/patagonia/portrait/DSCF1986.jpg",
    "/photography/patagonia/portrait/DSCF1993.jpg",
    "/photography/patagonia/portrait/DSCF2009.jpg",
    "/photography/patagonia/portrait/DSCF2051.jpg",
    "/photography/patagonia/portrait/DSCF2052.jpg",
    "/photography/patagonia/portrait/DSCF2056.jpg",
    "/photography/patagonia/portrait/DSCF2063.jpg",
    "/photography/patagonia/portrait/DSCF2076.jpg",
    "/photography/patagonia/portrait/DSCF2144.jpg",
    "/photography/patagonia/portrait/DSCF2149.jpg",
    "/photography/patagonia/portrait/DSCF2197.jpg",
    "/photography/patagonia/portrait/DSCF2199.jpg",
    "/photography/patagonia/portrait/DSCF2203.jpg",
    "/photography/patagonia/portrait/DSCF2204.jpg",
    "/photography/patagonia/portrait/DSCF2210.jpg",
    "/photography/patagonia/portrait/DSCF2214.jpg",
    "/photography/patagonia/portrait/DSCF2221.jpg",
    "/photography/patagonia/portrait/DSCF2241.jpg",
    "/photography/patagonia/portrait/DSCF2246.jpg",
    "/photography/patagonia/portrait/DSCF2251.jpg",
    "/photography/patagonia/portrait/DSCF2253.jpg",
    "/photography/patagonia/portrait/DSCF2256.jpg",
    "/photography/patagonia/portrait/DSCF2262.jpg",
    "/photography/patagonia/portrait/DSCF2264.jpg",
    "/photography/patagonia/portrait/DSCF2267.jpg",
    "/photography/patagonia/portrait/DSCF2271.jpg",
    "/photography/patagonia/portrait/DSCF2284.jpg",
    "/photography/patagonia/portrait/DSCF2290.jpg",
    "/photography/patagonia/portrait/DSCF2314.jpg",
    "/photography/patagonia/portrait/DSCF2375.jpg",
    "/photography/patagonia/portrait/DSCF2386.jpg",
    "/photography/patagonia/portrait/DSCF2391.jpg",
    "/photography/patagonia/portrait/DSCF2392.jpg",
    "/photography/patagonia/portrait/DSCF2406.jpg",
    "/photography/patagonia/portrait/DSCF2410.jpg",
    "/photography/patagonia/portrait/DSCF2411.jpg",
    "/photography/patagonia/portrait/DSCF2417.jpg",
    "/photography/patagonia/portrait/DSCF2421.jpg",
    "/photography/patagonia/portrait/DSCF2424.jpg",
    "/photography/patagonia/portrait/DSCF2432.jpg",
    "/photography/patagonia/portrait/DSCF2451.jpg",
    "/photography/patagonia/portrait/DSCF2456.jpg",
    "/photography/patagonia/portrait/DSCF2462.jpg",
    "/photography/patagonia/portrait/DSCF2463.jpg",
    "/photography/patagonia/portrait/DSCF2464.jpg",
    "/photography/patagonia/portrait/DSCF2467.jpg",
    "/photography/patagonia/portrait/DSCF2468.jpg",
    "/photography/patagonia/portrait/DSCF2475.jpg",
    "/photography/patagonia/portrait/DSCF2510.jpg",
    "/photography/patagonia/portrait/DSCF2530.jpg",
    "/photography/patagonia/portrait/DSCF2549.jpg",
    "/photography/patagonia/portrait/DSCF2556.jpg",
    "/photography/patagonia/portrait/DSCF2560.jpg",
    "/photography/patagonia/portrait/DSCF2586.jpg",
    "/photography/patagonia/portrait/DSCF2596.jpg",
    "/photography/patagonia/portrait/DSCF2602.jpg",
    "/photography/patagonia/portrait/DSCF2628.jpg",
    "/photography/patagonia/portrait/DSCF2640.jpg",
    "/photography/patagonia/portrait/DSCF2641.jpg",
    "/photography/patagonia/portrait/DSCF2648.jpg",
    "/photography/patagonia/portrait/DSCF2659.jpg",
    "/photography/patagonia/portrait/DSCF2663.jpg",
    "/photography/patagonia/portrait/DSCF2664.jpg",
    "/photography/patagonia/portrait/DSCF2666.jpg",
    "/photography/patagonia/portrait/DSCF2692.jpg",
    "/photography/patagonia/portrait/DSCF2696.jpg",
    "/photography/patagonia/portrait/DSCF2758.jpg",
    "/photography/patagonia/portrait/DSCF2765.jpg"
  ];

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  return (
    <main className="flex flex-col gap-12 sm:gap-16 p-8 sm:pt-16 pb-28">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
          {allImages.map((src, index) => (
            <Dialog.Trigger asChild key={index}>
              <Image
                priority
                src={src}
                width={1111}
                height={1667}
                sizes="100vw"
                alt={`Image ${index + 1}`}
                className="rounded-sm object-cover cursor-pointer"
                onClick={() => openModal(index)}
              />
            </Dialog.Trigger>
          ))}
          <Dialog.Portal>
            <Dialog.Overlay className="z-10 fixed inset-0 bg-background backdrop-blur-sm" />
            <Dialog.Content className="z-10 fixed left-[50%] top-[50%] max-h-[95vh] w-[95vw] max-w-6xl translate-x-[-50%] translate-y-[-50%] rounded-md p-6">
              <Carousel className="rounded-xl overflow-clip bg-background" opts={{ startIndex: currentImageIndex, loop: true }}>
                <CarouselContent className="max-h-fit">
                  {allImages.map((src, index) => (
                    <CarouselItem className="max-h-[80vh] max-w-fit" key={index}>
                      <Image
                        src={src}
                        alt={`Carousel Image ${index + 1}`}
                        width={1111}
                        height={1667}
                        sizes="100vw"
                        className="rounded-sm object-cover rounded-xl w-fit h-full max-h-[81vh]"
                      />
                      <VisuallyHidden.Root><Dialog.Title /></VisuallyHidden.Root>
                      <VisuallyHidden.Root><Dialog.Description /></VisuallyHidden.Root>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
                <Dialog.Close asChild>
                  <Button size="icon" variant="outline" className='absolute top-4 right-4 z-50 rounded-full'>
                    <X className='h-5 w-5' />
                  </Button>
                </Dialog.Close>
              </Carousel>

            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </section>

    </main>
  );
}