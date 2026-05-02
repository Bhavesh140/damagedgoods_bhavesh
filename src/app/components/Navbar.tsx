import React from "react";
import { GlassPanel } from "./GlassPanel";
import { ShoppingBag, Search, Menu } from "lucide-react";
import { motion } from "motion/react";

export function Navbar() {
  const navLinks = ["Collection", "Editorial", "About", "Archived"];

  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6 pointer-events-auto"
    >
      <GlassPanel 
        intensity="light" 
        className="flex items-center justify-between w-full max-w-6xl px-8 py-4 rounded-full"
      >
        <div className="flex items-center gap-6 flex-1">
          <Menu className="w-5 h-5 text-white/80 cursor-pointer hover:text-white transition-colors" />
          <span className="text-white font-bold tracking-widest uppercase text-base cursor-pointer">
            AETHER
          </span>
        </div>

        <div className="hidden md:flex items-center justify-center gap-10 flex-1">
          {navLinks.map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`}
              className="text-white/70 hover:text-white text-sm font-medium transition-all duration-300 hover:scale-105"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center justify-end gap-6 flex-1">
          <Search className="w-5 h-5 text-white/80 cursor-pointer hover:text-white transition-colors" />
          <div className="relative cursor-pointer">
            <ShoppingBag className="w-5 h-5 text-white/80 hover:text-white transition-colors" />
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-black text-[9px] font-bold">
              2
            </span>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
