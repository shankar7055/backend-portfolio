"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpDownLeftRight } from "@/components/icons";

export default function Dock() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full px-4 fixed flex flex-col gap-2 items-center rounded-lg bottom-4 left-1/2 -translate-x-1/2 max-w-fit z-50 pointer-events-none">
      {pathname === "/" && (
        <div className="bg-component w-fit font-medium text-sm px-3 py-1.5 rounded-2xl flex gap-2 z-20 pointer-events-none items-center whitespace-nowrap animate-bounce shadow-lg border border-stone-300/40">
          <ArrowUpDownLeftRight className="size-5" />
          Drag to move
        </div>
      )}
    </div>
  );
}
