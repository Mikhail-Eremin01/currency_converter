import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  build: {
      outDir: "build",
      chunkSizeWarningLimit: 1000,
  },
  server: {
      open: true,
      port: 3000,
  },
  plugins: [react(), svgr(), basicSsl()],
});