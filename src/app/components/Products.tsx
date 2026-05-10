import { motion } from "motion/react";
import { products } from "../data/products";
import type { Product } from "./ProductPage";

interface ProductsProps {
  onProductClick?: (product: Product) => void;
}

export function Products({ onProductClick }: ProductsProps) {
  return (
    <div className="w-full bg-[#0a0a0a] min-h-screen py-24 px-6 md:px-12 flex items-center">
      <div className="max-w-[1600px] mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.slice(0, 4).map((product) => (
            <div
              key={product.id}
              onClick={() => onProductClick?.(product)}
              className="group cursor-pointer flex flex-col"
            >
              {/* Image Container */}
              <div className="w-full aspect-[4/5] bg-black/5 mb-4 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Text Content */}
              <div className="flex flex-col">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-white font-medium text-sm md:text-base tracking-tight truncate pr-4">
                    {product.name}
                  </h3>
                  <span className="text-white font-medium text-sm md:text-base whitespace-nowrap">
                    {product.price}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span className="text-white text-[10px] font-bold tracking-widest uppercase">
                    {product.category || "Apparel"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

