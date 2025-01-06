import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/keepincrm": {
        // Проксі працює лише для цього префіксу
        target: "https://api.keepincrm.com",
        ws: true,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
