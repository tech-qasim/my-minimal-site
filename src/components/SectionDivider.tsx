import { cn } from "@/lib/utils";
import type React from "react";

interface SectionDividerProps {
  className?: string;
}

export default function SectionDivider({ className }: SectionDividerProps): React.ReactElement {
  return (
    <section className={cn("border-y border-border/50 border-t-0", className)}>
      <div className="h-1.5 w-full bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)] opacity-50" />
    </section>
  );
}
