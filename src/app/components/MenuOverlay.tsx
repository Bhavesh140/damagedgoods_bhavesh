import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';
import hoodieMenuImg from '../../imports/hoodie_menu.png';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuLinks = [
  { id: '01', label: 'COLLECTION' },
  { id: '02', label: 'DROPS' },
  { id: '03', label: 'ARCHIVE' },
  { id: '04', label: 'ABOUT' },
  { id: '05', label: 'CONTACT' },
];

export function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex flex-col md:flex-row bg-[#0a0a0a]"
        >
          {/* LEFT PANEL */}
          <div className="w-full md:w-[60%] lg:w-[55%] h-[100dvh] flex flex-col p-6 md:p-10 relative overflow-hidden">

            {/* Top Bar (Close) */}
            <div className="flex justify-between items-center mb-6 shrink-0">
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-8 h-8" strokeWidth={1} />
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex-1 flex flex-col max-w-2xl w-full mx-auto min-h-0">
              {menuLinks.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={`#${link.label.toLowerCase()}`}
                  onClick={onClose}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5, ease: "easeOut" }}
                  className="group flex-1 flex items-center justify-between border-b border-white/[0.08] cursor-pointer min-h-0"
                >
                  <div className="flex items-start gap-4 md:gap-8">
                    <span className="text-[10px] font-bold tracking-widest text-white/40 pt-2">{link.id}</span>
                    <span className="text-[clamp(2.5rem,6vw,6rem)] font-serif tracking-tight text-white/90 group-hover:text-white transition-colors leading-none">
                      {link.label}
                    </span>
                  </div>
                  <ArrowRight className="w-6 h-6 text-white/0 group-hover:text-white transition-all duration-300 -translate-x-4 group-hover:translate-x-0" strokeWidth={1} />
                </motion.a>
              ))}
            </div>

            {/* Bottom Section */}
            <div className="mt-8 flex flex-col sm:flex-row justify-between items-end gap-6 shrink-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col gap-6"
              >
                <div className="text-white/80 font-bold tracking-[0.2em] uppercase text-xs md:text-sm leading-relaxed">
                  <p>THE ARCHIVE</p>
                  <p>OF TOMORROW.</p>
                </div>

                <div className="flex flex-wrap gap-4 md:gap-6 text-[9px] md:text-[10px] font-bold tracking-widest text-white/40">
                  <a href="#" className="hover:text-white transition-colors">INSTAGRAM</a>
                  <a href="#" className="hover:text-white transition-colors">TIKTOK</a>
                  <a href="#" className="hover:text-white transition-colors">PINTEREST</a>
                  <a href="#" className="hover:text-white transition-colors">YOUTUBE</a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col gap-2 text-right sm:text-left"
              >
                <span className="text-[8px] md:text-[9px] font-bold tracking-widest text-white/40 uppercase">LATEST DROP</span>
                <span className="text-sm md:text-base font-bold tracking-[0.2em] text-white uppercase">DROP_07</span>
                <span className="text-[8px] md:text-[9px] font-bold tracking-widest text-white/30 uppercase">AVAILABLE NOW</span>
              </motion.div>
            </div>

          </div>

          {/* RIGHT PANEL (Image) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block w-full md:w-[40%] lg:w-[45%] h-[100dvh] relative"
          >
            <div className="absolute inset-0 bg-black/40 z-10" />

            <img
              src={hoodieMenuImg}
              alt="Menu Feature"
              className="w-full h-full object-cover filter grayscale opacity-70"
            />

            {/* Top Right "CLOSE MENU" text */}
            <div className="absolute top-10 right-10 z-20">
              <span
                className="text-[10px] font-bold tracking-widest text-white/40 hover:text-white transition-colors cursor-pointer"
                onClick={onClose}
              >
                CLOSE MENU
              </span>
            </div>

            {/* Bottom Center Copyright */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 w-full text-center">
              <span className="text-[8px] md:text-[9px] font-bold tracking-widest text-white/40 uppercase">
                © 2026 DAMAGED GOODS. ALL RIGHTS RESERVED.
              </span>
            </div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
