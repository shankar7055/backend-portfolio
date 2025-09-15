import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeftCircle, Share } from "lucide-react"

export default function MdxLayout({ children }: { children: React.ReactNode }) {
    // Create any shared layout or styles here
    return (
        <div className="w-full flex justify-center">
            <div className="w-full pb-24 flex flex-col max-w-3xl p-6 gap-4 sm:gap-24 sm:pt-16 sm:px-12 sm:pb-24 self-center">

                <div className="flex justify-between">
                    <Button size="icon" asChild>
                        <Link href="/notes">
                            <ArrowLeftCircle></ArrowLeftCircle>
                        </Link>
                    </Button>

                    <Button size="icon" asChild>
                        <Link href="/notes">
                            <Share></Share>
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
