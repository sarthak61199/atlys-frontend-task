import App from "@/App.tsx";
import { EquationsProvider } from "@/context/EquationsContext";
import "@/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EquationsProvider>
      <App />
    </EquationsProvider>
  </StrictMode>
);
