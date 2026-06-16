import { create } from 'zustand';

interface UIStore {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  setIsMenuOpen: (isOpen: boolean) => void;
  phase: "jacket" | "transition" | "products";
  setPhase: (phase: "jacket" | "transition" | "products") => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  setIsMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
  phase: "jacket",
  setPhase: (phase) => set({ phase }),
}));
