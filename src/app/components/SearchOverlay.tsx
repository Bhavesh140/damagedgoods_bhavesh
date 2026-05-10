import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, ArrowRight } from "lucide-react";
import { products } from "../data/products";
import type { Product } from "./ProductDrawer";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export function SearchOverlay({ isOpen, onClose, onSelectProduct }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      // Small delay to let the animation start before focusing
      const timer = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(timer);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const filtered = query.trim() === ""
    ? products
    : products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (product: Product) => {
    onSelectProduct(product);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Full-screen backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Search panel */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed top-0 left-0 right-0 z-[201] max-h-[85vh] overflow-hidden flex flex-col"
          >
            {/* Search bar area */}
            <div className="bg-[#111111]/95 border-b border-white/10 px-4 sm:px-6 md:px-12 pt-6 sm:pt-8 pb-4 sm:pb-6">
              <div className="max-w-3xl mx-auto">
                {/* Close button */}
                <div className="flex justify-end mb-4 sm:mb-6">
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Input */}
                <div className="relative">
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-white/30" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full bg-transparent border-none outline-none text-white text-2xl sm:text-3xl md:text-4xl font-light placeholder:text-white/20 pl-10 pr-4 py-2 caret-white/60"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-4" />

                {/* Quick filters */}
                <div className="flex gap-2 mt-4 flex-wrap">
                  {["All", "Outerwear", "Bottoms", "Footwear", "Tops"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setQuery(cat === "All" ? "" : cat)}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase transition-all cursor-pointer border ${
                        (cat === "All" && query === "") || query.toLowerCase() === cat.toLowerCase()
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10 hover:text-white/80"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-[#0e0e0e]/95 overflow-y-auto px-4 sm:px-6 md:px-12 py-6 flex-1">
              <div className="max-w-3xl mx-auto">
                <p className="text-xs font-bold tracking-widest uppercase text-white/30 mb-4">
                  {filtered.length} {filtered.length === 1 ? "result" : "results"}
                </p>

                {filtered.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <p className="text-white/30 text-lg">No products found for "{query}"</p>
                    <p className="text-white/15 text-sm mt-2">Try searching by name or category</p>
                  </motion.div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {filtered.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        onClick={() => handleSelect(product)}
                        className="group flex items-center gap-4 sm:gap-5 p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 cursor-pointer"
                      >
                        {/* Thumbnail */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-[#1a1a1a]">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold tracking-widest uppercase text-white/30 mb-0.5">
                            {product.category}
                          </p>
                          <h4 className="text-base sm:text-lg font-bold text-white truncate">
                            {product.name}
                          </h4>
                          <p className="text-sm text-white/50 font-medium">{product.price}</p>
                        </div>

                        {/* Arrow */}
                        <div className="shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                          <ArrowRight className="w-4 h-4 text-white/70" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
