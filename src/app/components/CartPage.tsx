import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Minus, Plus, Tag, Truck, RefreshCcw, ShieldCheck } from "lucide-react";
import { products } from "../data/products";
import type { Product } from "./ProductPage";
import hoodieMenuImg from '../../imports/hoodie_menu.png';

interface CartDrawerProps {
  onClose: () => void;
}

interface CartItem extends Product {
  quantity: number;
  variant?: string;
}

export function CartPage({ onClose }: CartDrawerProps) {
  // Use mock products matching the user's reference image for this demo
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 99,
      name: "HEAVYWEIGHT HOODIE",
      price: "₹2,999.00",
      category: "Tops",
      variant: "Black / XL",
      image: hoodieMenuImg,
      colSpan: "col-span-12",
      quantity: 1
    },
    {
      id: 100,
      name: "UTILITY CARGO PANTS",
      price: "₹2,799.00",
      category: "Bottoms",
      variant: "Washed Black / 32",
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop",
      colSpan: "col-span-12",
      quantity: 1
    },
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items => items.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  // Helper to parse price string to number for INR
  const getPrice = (priceStr: string) => parseFloat(priceStr.replace(/[^0-9.-]+/g, ""));

  const formatINR = (amount: number) => {
    return "₹" + amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (getPrice(item.price) * item.quantity), 0);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 z-[250] bg-black/60 backdrop-blur-sm"
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-[100dvh] w-full sm:w-[480px] z-[300] bg-[#111111] flex flex-col shadow-2xl overflow-hidden border-l border-white/5"
      >

        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/[0.08] shrink-0">
          <h2 className="text-[11px] font-bold tracking-[0.15em] text-white">
            YOUR CART ({cartItems.reduce((a, b) => a + b.quantity, 0)})
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Cart Items Area */}
        <div className="flex-1 overflow-y-auto px-6 py-2 hide-scrollbar">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-white/40 font-bold tracking-widest text-[10px] uppercase">
              Your cart is empty.
            </div>
          ) : (
            <div className="flex flex-col">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="py-6 border-b border-white/[0.08] flex gap-5 group"
                >
                  {/* Product Image */}
                  <div className="w-24 h-28 bg-[#1a1a1a] shrink-0 overflow-hidden relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover filter brightness-75" />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-[11px] font-bold text-white tracking-widest">{item.name}</h3>
                        <span className="text-[10px] font-bold text-white">{item.price}</span>
                      </div>
                      <p className="text-[10px] text-white/40">{item.variant}</p>
                    </div>

                    <div className="flex justify-between items-end">
                      {/* Quantity Selector */}
                      <div className="flex items-center gap-4 bg-transparent border border-white/[0.08] px-3 py-1.5 w-max mt-4">
                        <button onClick={() => updateQuantity(item.id, -1)} className="text-white/40 hover:text-white transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-[11px] font-medium text-white w-2 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="text-white/40 hover:text-white transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-white/30 hover:text-white transition-colors pb-1"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Discount Section */}
          {cartItems.length > 0 && (
            <div className="py-5 border-b border-white/[0.08] flex justify-between items-center cursor-pointer group">
              <span className="text-[11px] text-white/60 group-hover:text-white transition-colors">Add a discount code</span>
              <Plus className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
            </div>
          )}
        </div>

        {/* Footer / Totals */}
        {cartItems.length > 0 && (
          <div className="bg-[#111111] shrink-0">
            <div className="px-6 py-5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[11px] text-white/50">Subtotal</span>
                <span className="text-[11px] font-bold text-white">{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-[11px] text-white/50">Shipping</span>
                <span className="text-[11px] text-white/50">Calculated at checkout</span>
              </div>

              <div className="flex justify-between items-center mb-8 border-t border-white/[0.08] pt-5">
                <span className="text-[11px] font-bold tracking-[0.1em] text-white uppercase">Total</span>
                <span className="text-[13px] font-bold text-white">{formatINR(subtotal)}</span>
              </div>

              <div className="flex flex-col gap-3 mb-6">
                <button className="w-full bg-[#f3f3f3] text-black font-bold text-[11px] tracking-[0.1em] py-4 hover:bg-white transition-colors flex items-center justify-center gap-2">
                  CHECKOUT
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </button>
                <button
                  onClick={onClose}
                  className="w-full bg-transparent border border-white/20 text-white font-bold text-[11px] tracking-[0.1em] py-4 hover:bg-white/5 transition-colors"
                >
                  VIEW CART
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-5 pb-2">
                <div className="flex flex-col items-center justify-center text-center gap-2">
                  <Truck className="w-5 h-5 text-white/60" strokeWidth={1} />
                  <div className="flex flex-col text-[8px] tracking-wider text-white/40 uppercase">
                    <span>Free Shipping</span>
                    <span>Orders ₹1999+</span>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center text-center gap-2">
                  <RefreshCcw className="w-5 h-5 text-white/60" strokeWidth={1} />
                  <div className="flex flex-col text-[8px] tracking-wider text-white/40 uppercase">
                    <span>Easy Returns</span>
                    <span>14 Days</span>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center text-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-white/60" strokeWidth={1} />
                  <div className="flex flex-col text-[8px] tracking-wider text-white/40 uppercase">
                    <span>Secure Payment</span>
                    <span>100% Safe</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}
