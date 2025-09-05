import Link from "next/link"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Notes() {
	return (
		<main className="flex flex-col gap-4 max-w-3xl mx-auto bg-background p-6 pb-24 sm:gap-8 sm:pt-16 sm:pb-28">
			<ul className="flex flex-1 flex-col gap-2 h-fit ">
				<h2 className="mt-8 mb-4 tabular"> 2024</h2>
				<li>
					<Button asChild variant="ghost">
						<Link className="w-[calc(100%+32px)] justify-between -mx-4" href="/notes/redesigning-my-portfolio"> Redesigning my portfolio
							<Separator className="mx-4 flex grow shrink mix-blend-multiply dark:mix-blend-lighten"></Separator>
							<span className="tabular text-sm font-normal text-muted-foreground self-center">Sep 2024</span>
						</Link>
					</Button>
				</li>
				<h2 className="mt-8 mb-4 tabular"> 2023</h2>
				<li>
					<Button asChild variant="ghost">
						<Link className="w-[calc(100%+32px)] justify-between -mx-4" href="/notes/the-zettelkasten-method"> The Zettelkasten method
							<Separator className="mx-4 flex grow shrink mix-blend-multiply dark:mix-blend-lighten"></Separator>
							<span className="tabular text-sm font-normal text-muted-foreground self-center">Feb 2023</span>
						</Link>
					</Button>
				</li>
				<h2 className="mt-8 mb-4 tabular"> 2018</h2>
				<li>
					<Button asChild variant="ghost">
						<Link className="w-[calc(100%+32px)] justify-between -mx-4" href="/notes/how-to-study-&-learn"> How to study & learn
							<Separator className="mx-4 flex grow shrink mix-blend-multiply dark:mix-blend-lighten"></Separator>
							<span className="tabular text-sm font-normal text-muted-foreground self-center">Dec 2018</span>
						</Link>
					</Button>
				</li>
				<li>
					<Button asChild variant="ghost">
						<Link className="w-[calc(100%+32px)] justify-between -mx-4" href="/notes/conversational-interfaces"> Conversational interfaces
							<Separator className="mx-4 flex grow shrink mix-blend-multiply dark:mix-blend-lighten"></Separator>
							<span className="tabular text-sm font-normal text-muted-foreground self-center">Dec 2018</span>
						</Link>
					</Button>
				</li>
			</ul>
		</main>
	);
}
