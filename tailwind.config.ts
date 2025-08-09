import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cotton: "#FDF7F8",
        blush: "#FAD3E7",
        sky: "#C9E7FF",
        mint: "#D8F5E1",
        lilac: "#E6D8F7",
        peach: "#FFE3C9",
        ink: "#2E2A32"
      }
    }
  },
  plugins: []
} satisfies Config;