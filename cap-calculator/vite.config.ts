import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Optional: Add these for better alias support
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
