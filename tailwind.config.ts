import animatePlugin from "tailwindcss-animate";

import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{ts,tsx}"],
  plugins: [animatePlugin],
} satisfies Config;

export default config;
