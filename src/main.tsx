import { createRoot } from "react-dom/client";
import { AnimatePresence } from "motion/react";
import App from "./app/App.tsx";
import { ScrollProvider } from "./store/ScrollContext.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <ScrollProvider>
    <AnimatePresence mode="wait">
      <App />
    </AnimatePresence>
  </ScrollProvider>
);