import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { GlassPanel } from "./GlassPanel";

export function Hero() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-24 pb-12 pointer-events-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        className="w-full max-w-2xl flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-md uppercase tracking-widest"
        >
          FW26 Collection
        </motion.div>
        

        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-100"
        >
          <button className="group relative flex h-14 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 text-sm font-semibold text-black transition-all hover:scale-105 active:scale-95">
            <span>Shop the Drop</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button className="flex h-14 items-center justify-center rounded-full border border-white/30 bg-black/40 px-8 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-black/60 hover:scale-105 active:scale-95">
            Explore Tech Specs
          </button>
        </motion.div>
      </motion.div>

      {/* Floating UI Elements */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-12 left-6 md:left-12"
      >
        <GlassPanel intensity="light" className="p-4 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border border-white/20 bg-white/10 flex items-center justify-center">
            <span className="text-white text-xs font-bold">01</span>
          </div>
          <div>
            <div className="text-white text-sm font-medium">Clear-Tech Polymer</div>
            <div className="text-white/60 text-xs">Material Composition</div>
          </div>
        </GlassPanel>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <motion.div 
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-0.5 h-12 bg-gradient-to-b from-white/50 to-transparent rounded-full"
        />
      </motion.div>
    </div>
  );
}
