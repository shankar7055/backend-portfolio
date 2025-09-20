import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowCornerUpLeft } from "@/components/icons/index"

export default function MdxLayout({ children }: { children: React.ReactNode }) {
    
    return (
        <div className="w-full flex justify-center">
            <div className="w-full pb-24 flex flex-col max-w-2xl p-6 gap-4 sm:gap-16 sm:pt-16 sm:px-4 sm:pb-24 self-center">

                <div className="flex justify-between">
                    <Button variant="secondary" size="sm" asChild>
                        <Link href="/notes" className="flex gap-2">
                            <ArrowCornerUpLeft className="size-[18px]"></ArrowCornerUpLeft>
                            Notes
                        </Link>
                    </Button>
                </div>

                <article>
                    {children}
                </article>
            </div>
        </div>
    )
}
