"use client";

import React, { useState } from "react";
import { GlassPanel } from "./GlassPanel";
import { ShoppingBag, Search, Menu } from "lucide-react";
import { motion } from "motion/react";

export function Navbar() {
  const navLinks = ["Collection", "Drops", "About", "Orders"];
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed top-8 left-0 w-full z-50 flex justify-center px-4 pointer-events-auto"
    >
      <GlassPanel className="w-full max-w-6xl h-[60px] rounded-full">
        
        {/* THE BULLETPROOF WRAPPER */}
        {/* 'justify-between' forces the Left and Right sections to opposite ends of the single row */}
        <div className="relative flex flex-row items-center justify-between w-full h-full px-6">
          
          {/* LEFT SECTION */}
          {/* 'shrink-0' ensures this block never gets squished or wrapped */}
          <div className="flex flex-row items-center gap-5 shrink-0">
            <button className="flex items-center justify-center focus:outline-none">
              <Menu className="w-[18px] h-[18px] text-white/80 hover:text-white transition-colors" strokeWidth={1.5} />
            </button>
            <span className="text-white font-bold tracking-[0.25em] uppercase text-[13px] whitespace-nowrap cursor-pointer">
              DAMAGED GOODS
            </span>
          </div>

          {/* CENTER SECTION (MAGNETIC HOVER EFFECT) */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 hidden md:flex flex-row items-center gap-1"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`}
                onMouseEnter={() => setHoveredLink(link)}
                className="relative px-4 py-2 text-[13px] tracking-wide font-medium whitespace-nowrap transition-colors duration-300"
              >
                {hoveredLink === link && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 transition-colors duration-300 ${hoveredLink === link ? "text-white" : "text-white/70"}`}>
                  {link}
                </span>
              </a>
            ))}
          </div>

          {/* RIGHT SECTION */}
          {/* 'shrink-0' protects this from dropping below the line */}
          <div className="flex flex-row items-center gap-5 shrink-0">
            <button className="flex items-center justify-center focus:outline-none">
              <Search className="w-[18px] h-[18px] text-white/80 hover:text-white transition-colors" strokeWidth={1.5} />
            </button>
            
            <button className="relative flex items-center justify-center group focus:outline-none">
              <ShoppingBag className="w-[18px] h-[18px] text-white/80 group-hover:text-white transition-colors" strokeWidth={1.5} />
              <span className="absolute -top-1.5 -right-2 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-white text-black text-[10px] font-bold px-1">
                2
              </span>
            </button>
          </div>

        </div>
      </GlassPanel>
    </motion.div>
  );
}