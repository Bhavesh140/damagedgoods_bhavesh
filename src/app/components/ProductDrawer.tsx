import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingCart, Heart, ChevronRight, Minus, Plus } from "lucide-react";
import { GlassPanel } from "./GlassPanel";

export interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
  colSpan: string;
}

interface ProductDrawerProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDrawer({ product, isOpen, onClose }: ProductDrawerProps) {
  const [quantity, setQuantity] = React.useState(1);

  // Reset quantity when a new product is selected
  React.useEffect(() => {
    setQuantity(1);
  }, [product?.id]);

  return (
    <AnimatePresence>
      {isOpen && product && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-[101] h-full w-full sm:w-[480px] md:w-[520px] bg-[#111111] border-l border-white/10 shadow-[-20px_0_60px_rgba(0,0,0,0.5)] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Product Image */}
            <div className="relative w-full h-[55vh] sm:h-[50vh] overflow-hidden">
              <motion.img
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* Gradient fade at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#111111] to-transparent" />
              
              {/* Category badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="absolute top-5 left-5"
              >
                <GlassPanel intensity="light" className="px-4 py-1.5 rounded-full">
                  <span className="text-xs font-medium text-white tracking-wider uppercase">{product.category}</span>
                </GlassPanel>
              </motion.div>
            </div>

            {/* Product Details */}
            <div className="px-6 sm:px-8 pb-8 -mt-4 relative z-10">
              {/* Name & Price */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-1">
                  {product.name}
                </h2>
                <p className="text-2xl font-semibold text-white/80 mb-6">{product.price}</p>
              </motion.div>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6 origin-left"
              />

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mb-8"
              >
                <h3 className="text-xs font-bold tracking-widest uppercase text-white/40 mb-3">About this piece</h3>
                <p className="text-sm leading-relaxed text-white/60">
                  Crafted from premium materials with meticulous attention to detail. 
                  Each piece in the Damaged Goods collection is designed to challenge conventions 
                  and redefine modern aesthetics. Limited availability — once it's gone, it's gone.
                </p>
              </motion.div>

              {/* Details Row */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="grid grid-cols-3 gap-3 mb-8"
              >
                {[
                  { label: "Fit", value: "Relaxed" },
                  { label: "Material", value: "Premium" },
                  { label: "Season", value: "FW26" },
                ].map((detail) => (
                  <div
                    key={detail.label}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-center"
                  >
                    <p className="text-[10px] font-bold tracking-widest uppercase text-white/30 mb-1">{detail.label}</p>
                    <p className="text-sm font-medium text-white/80">{detail.value}</p>
                  </div>
                ))}
              </motion.div>

              {/* Quantity Selector */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex items-center justify-between mb-6"
              >
                <span className="text-xs font-bold tracking-widest uppercase text-white/40">Quantity</span>
                <div className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] rounded-full px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-semibold text-white w-5 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="flex gap-3"
              >
                {/* Add to Cart */}
                <button className="flex-1 flex items-center justify-center gap-2.5 bg-white text-black font-bold text-sm py-4 rounded-full hover:bg-white/90 transition-all duration-200 group cursor-pointer">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                  <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </button>
                
                {/* Wishlist */}
                <button className="w-14 h-14 flex items-center justify-center rounded-full bg-white/[0.05] border border-white/10 text-white/50 hover:text-red-400 hover:border-red-400/30 hover:bg-red-400/5 transition-all duration-200 cursor-pointer">
                  <Heart className="w-5 h-5" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
