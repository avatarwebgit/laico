import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      // 👇 allow JSX in .js files too
      jsxRuntime: "automatic",
      babel: {
        presets: [],
        plugins: [],
      },
      include: ["**/*.jsx", "**/*.js"], // add .js here
    }),
  ],
});
