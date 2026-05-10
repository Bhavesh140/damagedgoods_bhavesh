import React from 'react';
import { Instagram, Twitter, Facebook, ArrowRight, Heart } from 'lucide-react';
import { products } from '../data/products';

export function Footer() {
  return (
    <footer className="w-full pt-24 pb-8 px-6 md:px-12 mt-auto relative z-10 bg-[#111111]">
      {/* Silver separating line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E0E0E0] to-transparent opacity-40" />

      <div className="max-w-[1400px] mx-auto">

        {/* Top Section - 6 Columns */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-6 mb-20">

          {/* Col 1: Brand & Newsletter (Takes up more space) */}
          <div className="w-full lg:w-[28%] flex flex-col pr-4">
            <h2 className="text-sm font-black tracking-[0.25em] uppercase text-white mb-6">DAMAGED GOODS</h2>
            <p className="text-[11px] text-white/50 leading-loose mb-8 max-w-xs pr-4">
              Redefining modern aesthetics through premium materials and meticulous attention to detail. The archive of tomorrow.
            </p>

            {/* Socials */}
            <div className="flex gap-3 mb-12">
              {['ig', 'tw', 'tk', 'pi'].map((social) => (
                <a key={social} href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all duration-300">
                  {social === 'ig' && <Instagram className="w-3.5 h-3.5" />}
                  {social === 'tw' && <Twitter className="w-3.5 h-3.5" />}
                  {social === 'tk' && <span className="text-[10px] font-bold">t</span>}
                  {social === 'pi' && <span className="text-[10px] font-bold">p</span>}
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white mb-3">JOIN THE ARCHIVE</h3>
              <p className="text-[11px] text-white/50 leading-relaxed mb-4">
                Be the first to know about new drops, exclusive releases and special offers.
              </p>
              <div className="flex border border-white/10 rounded-sm overflow-hidden mt-2 max-w-xs">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent w-full px-4 py-3 text-[11px] text-white outline-none placeholder:text-white/30"
                />
                <button className="bg-transparent border-l border-white/10 px-4 py-3 text-[9px] font-bold tracking-widest text-white hover:bg-white/5 transition-colors">
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="w-full lg:w-[12%] flex flex-col gap-3">
            <h3 className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/70 mb-4">COLLECTIONS</h3>
            {['Outerwear', 'Tops', 'Bottoms', 'Footwear', 'Accessories', 'All Products', 'New Arrivals', 'Best Sellers', 'Archive'].map(link => (
              <a key={link} href="#" className="text-[11px] text-white/40 hover:text-white transition-colors py-0.5">{link}</a>
            ))}
          </div>

          <div className="w-full lg:w-[12%] flex flex-col gap-3">
            <h3 className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/70 mb-4">SUPPORT</h3>
            {['FAQ', 'Shipping & Returns', 'Size Guide', 'Track Order', 'Contact Us', 'Care Instructions'].map(link => (
              <a key={link} href="#" className="text-[11px] text-white/40 hover:text-white transition-colors py-0.5">{link}</a>
            ))}
          </div>

          <div className="w-full lg:w-[12%] flex flex-col gap-3">
            <h3 className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/70 mb-4">COMPANY</h3>
            {['Our Story', 'Manifesto', 'Philosophy', 'Sustainability', 'Careers', 'Store Locator'].map(link => (
              <a key={link} href="#" className="text-[11px] text-white/40 hover:text-white transition-colors py-0.5">{link}</a>
            ))}
          </div>

          <div className="w-full lg:w-[12%] flex flex-col gap-3">
            <h3 className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/70 mb-4">LEGAL</h3>
            {['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Terms & Conditions'].map(link => (
              <a key={link} href="#" className="text-[11px] text-white/40 hover:text-white transition-colors py-0.5">{link}</a>
            ))}
          </div>

          {/* Col 6: Latest Drop */}
          <div className="w-full lg:w-[20%] flex flex-col lg:pl-4">
            <h3 className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/70 mb-4">LATEST DROP</h3>
            <div className="mb-4">
              <p className="text-xs font-bold tracking-widest text-white mb-1">DROP_07</p>
              <p className="text-[9px] font-medium tracking-widest text-white/40 uppercase">AVAILABLE NOW</p>
            </div>

            <div className="relative group overflow-hidden bg-white/5 rounded-sm aspect-[4/5] mb-4 w-48">
              <img
                src={products[products.length - 1]?.image || "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop"}
                alt="Latest Drop"
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            </div>

            <a href="#" className="inline-flex items-center gap-2 text-[9px] font-bold tracking-widest text-white group">
              <span className="border-b border-white/30 group-hover:border-white pb-0.5 transition-colors">SHOP NOW</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="relative pt-8 mt-4 flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 lg:gap-0">

          {/* Silver separating line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E0E0E0] to-transparent opacity-40" />

          {/* Col 1 */}
          <div className="text-[9px] font-bold tracking-widest text-white/50 uppercase leading-relaxed text-center lg:text-left">
            <p>© 2026 DAMAGED GOODS.</p>
            <p>ALL RIGHTS RESERVED.</p>
          </div>

          {/* Col 2 */}
          <div className="text-[9px] font-bold tracking-widest text-white/50 uppercase leading-relaxed flex items-center lg:items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/70 mt-1 shrink-0"></span>
            <div>
              <p>ONLINE</p>
              <p>WORLDWIDE SHIPPING</p>
            </div>
          </div>

          {/* Col 3 */}
          <div className="flex items-center gap-2 text-[9px] font-bold tracking-widest text-white/60 uppercase cursor-pointer hover:text-white transition-colors">
            INDIA / INR
            <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Col 4 */}
          <div className="flex items-center gap-4 opacity-60">
            <span className="text-[11px] font-black italic tracking-tighter text-white">VISA</span>
            <div className="flex -space-x-2">
              <div className="w-5 h-5 rounded-full bg-white/80 mix-blend-screen"></div>
              <div className="w-5 h-5 rounded-full bg-white/40 mix-blend-screen"></div>
            </div>
            <span className="text-[10px] font-bold tracking-widest italic text-white">UPI</span>
            <span className="text-[10px] font-bold italic text-white">PayPal</span>
            <span className="text-[11px] font-semibold flex items-center gap-1 text-white">
              <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="mb-0.5">
                <path d="M8.28105 5.8643C8.25875 4.39217 9.4855 3.66661 9.53008 3.63316C8.83857 2.62261 7.7679 2.47021 7.41108 2.44786C6.49652 2.35852 5.60426 2.99127 5.12832 2.99127C4.65239 2.99127 3.9163 2.47021 3.14304 2.49253C2.14668 2.51486 1.23955 3.07297 0.726514 3.94364C-0.344158 5.79667 0.458849 8.52044 1.48492 10.0385C1.99043 10.7753 2.58514 11.579 3.37295 11.5567C4.13845 11.5344 4.42842 11.0879 5.34298 11.0879C6.25754 11.0879 6.5029 11.5567 7.3055 11.5344C8.13039 11.5121 8.64344 10.7976 9.13417 10.0609C9.71412 9.21248 9.95948 8.3864 9.98179 8.34175C9.95948 8.31942 8.30335 7.6943 8.28105 5.8643ZM6.7419 1.62181C7.1434 1.153 7.43336 0.483216 7.34414 -0.164215C6.7865 -0.141889 6.09499 0.215324 5.67119 0.684166C5.31437 1.0637 4.97985 1.7558 5.06907 2.40325C5.69363 2.4479 6.34052 2.06836 6.7419 1.62181Z" />
              </svg>
              Pay
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}
