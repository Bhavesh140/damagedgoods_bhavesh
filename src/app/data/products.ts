import type { Product } from "../components/ProductPage";

export const products: Product[] = [
  {
    id: 1,
    name: "Aetherial Shell",
    price: "$450",
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1764787016268-31d48b3978f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    colSpan: "col-span-12 md:col-span-7",
  },
  {
    id: 2,
    name: "Phase Shift Cargo",
    price: "$280",
    category: "Bottoms",
    image: "https://images.unsplash.com/photo-1768489038056-85fa62638335?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    colSpan: "col-span-12 md:col-span-5",
  },
  {
    id: 3,
    name: "Void Walkers",
    price: "$320",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1736555142217-916540c7f1b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    colSpan: "col-span-12 md:col-span-5",
  },
  {
    id: 4,
    name: "Synapse Base Layer",
    price: "$150",
    category: "Tops",
    image: "https://images.unsplash.com/photo-1765445665914-918f669a6205?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    colSpan: "col-span-12 md:col-span-7",
  },
];
