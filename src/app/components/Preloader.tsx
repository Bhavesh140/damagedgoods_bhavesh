// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "motion/react";

// // Import your product images
// import img1 from "../../imports/pimp_priest_product_image.png";
// import img2 from "../../imports/Lips_holy_product_image.png";
// import img3 from "../../imports/Adored_discareded_product_image.png";
// import img4 from "../../imports/actively_product_image.png";
// import img5 from "../../imports/Sin_looks_better_product_image.png";

// interface PreloaderProps {
//   onComplete: () => void;
// }

// export function Preloader({ onComplete }: PreloaderProps) {
//   const [count, setCount] = useState(0);
//   const [isExiting, setIsExiting] = useState(false);

//   useEffect(() => {
//     let currentCount = 0;
//     const duration = 1500; // 1.5 seconds of counting
//     const interval = 20; 
//     const step = 100 / (duration / interval);

//     const timer = setInterval(() => {
//       currentCount += step;
//       if (currentCount >= 100) {
//         setCount(100);
//         clearInterval(timer);
//         setIsExiting(true);
//         setTimeout(onComplete, 1200); 
//       } else {
//         setCount(Math.floor(currentCount));
//       }
//     }, interval);

//     return () => clearInterval(timer);
//   }, [onComplete]);

//   // Standardize the card size
//   const cardClasses = "absolute w-24 h-32 md:w-32 md:h-44 bg-[#12100E] border border-white/10 p-1 shadow-2xl";

//   // We define our stack of images here.
//   // 'appearAt' is the counter number (0-100) when this image should pop onto the screen.
//   // 'rotate' gives each card that messy, tilted look.
//   // 'z' controls if it's behind (z-10) or in front (z-30) of the text.
//   const stack = [
//     { id: 1, src: img1, appearAt: 5, rotate: -12, z: "z-10" },
//     { id: 2, src: img2, appearAt: 20, rotate: 8, z: "z-10" },
//     { id: 3, src: img3, appearAt: 40, rotate: -5, z: "z-10" },
//     { id: 4, src: img4, appearAt: 60, rotate: 15, z: "z-10" }, // Pops in FRONT of the text
//     { id: 5, src: img5, appearAt: 80, rotate: -18, z: "z-10" },
//   ];

//   return (
//     <AnimatePresence>
//       {!isExiting && (
//         <motion.div
//           key="preloader"
//           exit={{ y: "-100%" }}
//           transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
//           className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a] overflow-hidden"
//         >
          
//           {/* THE IMAGE STACK */}
//           {stack.map((item) => {
//             // Only render the image if the counter has reached its 'appearAt' threshold
//             if (count < item.appearAt) return null;

//             return (
//               <motion.div
//                 key={item.id}
//                 // When it appears, it pops slightly (scale 0.8 to 1)
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 // When the preloader exits, the cards shrink away
//                 exit={{ scale: 0, opacity: 0 }}
//                 transition={{ type: "spring", stiffness: 400, damping: 25 }}
//                 className={`${cardClasses} ${item.z}`}
//                 style={{ rotate: `${item.rotate}deg` }}
//               >
//                 <img src={item.src} alt={`Loading ${item.id}`} className="w-full h-full object-cover" />
//               </motion.div>
//             );
//           })}

//           {/* THE TEXT LAYER (z-20) */}
//           <div className="absolute z-20 flex w-full justify-center gap-4 text-center font-serif text-[3vw] font-black uppercase leading-none tracking-tighter text-white pointer-events-none drop-shadow-2xl">
//             <motion.span
//               exit={{ x: "-50vw", opacity: 0 }}
//               transition={{ duration: 0.8, ease: "backIn" }}
//             >
//               DAMAGED
//             </motion.span>
//             <motion.span
//               exit={{ x: "50vw", opacity: 0 }}
//               transition={{ duration: 0.8, ease: "backIn" }}
//             >
//               GOODS
//             </motion.span>
//           </div>

//           {/* THE COUNTER (z-40) */}
//           <motion.div 
//             exit={{ opacity: 0 }}
//             className="absolute right-8 md:right-24 font-mono text-xl md:text-2xl text-white tracking-widest z-40"
//           >
//             {count.toString().padStart(3, "0")}
//           </motion.div>

//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }


"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let currentCount = 0;
    const duration = 1500; 
    const interval = 20; 
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      currentCount += step;
      if (currentCount >= 100) {
        setCount(100);
        clearInterval(timer);
        setIsExiting(true);
        // Wait 2.2 seconds total: 1s for reverse animation + 1s for the slide up + small buffer
        setTimeout(onComplete, 2200); 
      } else {
        setCount(Math.floor(currentCount));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  // ==========================================
  // 1. DYNAMIC IMAGE LOADING & GLASSMORPHISM
  // ==========================================
  const cardClasses = "absolute w-40 h-56 md:w-64 md:h-80 bg-white/5 backdrop-blur-xl border border-white/20 p-1.5 shadow-2xl rounded-sm will-change-transform";

  const stack = useMemo(() => {
    const modules = import.meta.glob('../../imports/scatter/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' });
    const imageUrls = Object.values(modules) as string[];
    
    const step = 85 / Math.max(1, imageUrls.length);

    return imageUrls.map((src, index) => {
      const seed = Math.sin(index * 999) * 10000;
      const rotate = -20 + (seed - Math.floor(seed)) * 40;
      
      return {
        id: index,
        src,
        appearAt: 5 + (index * step),
        rotate,
        z: "z-10"
      };
    });
  }, []);

  // Clean, minimal transparency matching outfit.hellohello.is
  const glassTextStyles = "text-white/30";

  const title = "DAMAGED GOODS";
  const letters = title.split("");
  const randomOrder = [4, 0, 8, 2, 10, 1, 6, 12, 3, 9, 5, 11, 7];

  // GSAP Expo.easeOut equivalent for ultra-smooth Awwwards snap
  const smoothEase = [0.19, 1, 0.22, 1];
  // GSAP Expo.easeInOut for the final exit slide
  const exitEase = [0.83, 0, 0.17, 1];

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.2, ease: exitEase, delay: 1.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
        >
          
          {/* THE IMAGE STACK */}
          {stack.map((item) => {
            if (count < item.appearAt) return null;

            return (
              <motion.div
                key={item.id}
                initial={{ scale: 0.7, opacity: 0, y: 40, filter: "blur(10px)" }}
                animate={{ scale: 1, opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ 
                  scale: 0.85, 
                  opacity: 0, 
                  y: 20, 
                  filter: "blur(10px)",
                  transition: { 
                    duration: 0.8, 
                    ease: smoothEase, 
                    delay: (stack.length - 1 - item.id) * 0.1 
                  } 
                }}
                transition={{ duration: 1.2, ease: smoothEase }}
                className={`${cardClasses} ${item.z}`}
                style={{ rotate: `${item.rotate}deg` }}
              >
                <div className="w-full h-full bg-black/20 overflow-hidden relative rounded-sm">
                  <img src={item.src} alt={`Loading ${item.id}`} className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-700 hover:opacity-100" />
                </div>
              </motion.div>
            );
          })}

          {/* ==========================================
              2. SCRAMBLED TEXT REVEAL & REVERSE OUTRO
              ========================================== */}
          <div className="absolute z-20 flex w-full justify-center text-center font-sans text-[8vw] md:text-[6vw] font-black uppercase leading-none tracking-[0.2em] pointer-events-none px-4 overflow-hidden">
            {letters.map((letter, i) => {
              const staggeredIndex = randomOrder[i] ?? i;
              
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ 
                    opacity: 0, 
                    filter: "blur(10px)",
                    transition: { 
                      duration: 0.6, 
                      ease: exitEase,
                      delay: (12 - staggeredIndex) * 0.05
                    } 
                  }}
                  transition={{ delay: staggeredIndex * 0.05, duration: 1.2, ease: smoothEase }}
                  className={`${glassTextStyles} inline-block will-change-transform`}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              );
            })}
          </div>

          {/* THE COUNTER */}
          <motion.div 
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            className="absolute right-8 md:right-24 font-mono text-xl md:text-2xl text-white/50 tracking-widest z-40"
          >
            {count.toString().padStart(3, "0")}
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}