import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

interface CraftBlockProps {
  title: string;
  description: string;
  badges: string[];
  children?: ReactNode;
  className?: string;
}

export const CraftBlock = ({ title, description, badges, children, className = "" }: CraftBlockProps) => {
  return (
    <div className={`relative flex flex-col w-full items-start gap-12 sm:flex-row sm:gap-x-40 ${className}`}>
      
      <div className="flex flex-col gap-4 sm:gap-9 w-full sm:w-[256px]">
        <div className="flex gap-3 flex-col w-full">
          <h3>{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="flex gap-2 w-full flex-wrap">
          {badges.map((badge, index) => (
            <Badge key={index} variant="secondary">{badge}</Badge>
          ))}
        </div>
      </div>

      <div className="bg-background flex h-[400px] w-full items-center justify-center rounded-lg border border-light-border dark:border-dark-border sm:h-[640px] sm:flex-1">
        {children}
      </div>

    </div>
  );
};