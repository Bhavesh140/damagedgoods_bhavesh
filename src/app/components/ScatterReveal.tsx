"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function ScatterReveal() {
  // 1. We create a reference to the outer wrapper so Framer Motion knows when we start/stop scrolling it
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 2. Animate the Text: "DAMAGED" goes left, "GOODS" goes right
  // They stay still for the first 30% of the scroll, then split apart until 70%
  const leftTextX = useTransform(scrollYProgress, [0.3, 0.7], ["0vw", "-100vw"]);
  const rightTextX = useTransform(scrollYProgress, [0.3, 0.7], ["0vw", "100vw"]);
  const textOpacity = useTransform(scrollYProgress, [0.6, 0.8], [1, 0]);

  // 3. Animate the background slide-up effect (like the video)
  const bgHeight = useTransform(scrollYProgress, [0.7, 1], ["0%", "100%"]);

  // 4. Define our product images and exactly where they should "scatter" to
  const products = [
    { id: 1, targetX: "-35vw", targetY: "-25vh", rotate: -15, delay: 0 },
    { id: 2, targetX: "35vw", targetY: "-15vh", rotate: 10, delay: 0.05 },
    { id: 3, targetX: "-25vw", targetY: "30vh", rotate: -20, delay: 0.1 },
    { id: 4, targetX: "25vw", targetY: "30vh", rotate: 15, delay: 0.15 },
    { id: 5, targetX: "0vw", targetY: "-35vh", rotate: 5, delay: 0.2 },
    { id: 6, targetX: "0vw", targetY: "35vh", rotate: -5, delay: 0.25 },
  ];

  return (
    // The container is 300vh tall so the user has to scroll "through" it
    <section ref={containerRef} className="relative h-[300vh] w-full bg-[#0A0908]">
      
      {/* The sticky wrapper locks to the screen while you scroll through the 300vh */}
      <div className="sticky top-0 left-0 flex h-screen w-full items-center justify-center overflow-hidden">

        {/* The Text Layer (Z-20 keeps it slightly above/mixed with images) */}
        {/* We use mix-blend-difference so the text interacts beautifully with the images sliding under it */}
        <motion.div 
          style={{ opacity: textOpacity }}
          className="absolute z-20 flex w-full justify-center gap-6 md:gap-12 text-center font-serif text-[12vw] font-black uppercase leading-none tracking-tighter text-white mix-blend-difference pointer-events-none"
        >
          <motion.span style={{ x: leftTextX }}>DAMAGED</motion.span>
          <motion.span style={{ x: rightTextX }}>GOODS</motion.span>
        </motion.div>

        {/* The Image Stack Layer */}
        <div className="absolute z-10 flex h-full w-full items-center justify-center pointer-events-none">
          {products.map((product) => {
            // Each image calculates its own path based on the user's scroll
            // They spread out during the first 40% of the scroll
            const imgX = useTransform(scrollYProgress, [0, 0.4], ["0vw", product.targetX]);
            const imgY = useTransform(scrollYProgress, [0, 0.4], ["0vh", product.targetY]);
            const imgRotate = useTransform(scrollYProgress, [0, 0.4], [0, product.rotate]);
            
            // Images start small and scale up as they fly out
            const imgScale = useTransform(scrollYProgress, [0, 0.4], [0.3, 1]);

            return (
              <motion.div
                key={product.id}
                className="absolute w-[200px] h-[280px] md:w-[280px] md:h-[380px] bg-white/5 border border-white/10 p-2 overflow-hidden shadow-2xl"
                style={{
                  x: imgX,
                  y: imgY,
                  rotate: imgRotate,
                  scale: imgScale,
                }}
              >
                {/* Replace this div with your actual <img src="..." /> tags when you have the product photos */}
                <div className="w-full h-full bg-[#1A1816] flex items-center justify-center text-white/30 font-mono text-xs border border-white/5">
                  Product 0{product.id}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* The Background Wipe (Triggers at the very end of the scroll) */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full bg-[#12100E] z-30 pointer-events-none border-t border-white/10"
          style={{ height: bgHeight }}
        />
        
      </div>
    </section>
  );
}

export default ScatterReveal;