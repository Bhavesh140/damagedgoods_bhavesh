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
        
        // 1. Fake the glass reflection using a gradient instead of a blur
        intensity === "heavy" 
          ? "bg-gradient-to-br from-white/[0.08] to-white/[0.03]" 
          : "bg-gradient-to-br from-white/[0.04] to-white/[0.01]",
          
        // 2. Explicitly block blur to prevent the browser rendering bug
        "backdrop-blur-none", 
        
        // 3. Kept your existing premium depth and highlight effects
        "shadow-[0_24px_48px_rgba(0,0,0,0.15)]", 
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)]", 
        "border border-white/10", 
        
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