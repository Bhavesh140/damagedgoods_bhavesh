import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  intensity?: "light" | "heavy";
}

export function GlassPanel({
  children,
  className,
  intensity = "heavy",
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "bg-white/[0.04]", // 4% solid white fill
        "backdrop-blur-[64px]", // heavy background blur (Effect 1)
        "shadow-[0_24px_48px_rgba(0,0,0,0.15)]", // depth drop shadow (Effect 2)
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)]", // inside stroke top specular highlight
        "border border-white/10", // subtle outline
        intensity === "light" ? "bg-white/[0.02] backdrop-blur-[40px]" : "",
        className
      )}
      {...props}
    >
      {/* Secondary inset glow for extra polish */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] rounded-[inherit]" />
      {/* Content wrapper */}
      <div className="relative z-10 size-full">
        {children}
      </div>
    </div>
  );
}
