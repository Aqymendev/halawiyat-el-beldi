import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./types/**/*.{ts,tsx}",
    "./styles/**/*.css"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        brand: {
          black: "#0f0b0a",
          coal: "#181111",
          burgundy: "#5b211c",
          mahogany: "#6b2a24",
          gold: "#c8a35a",
          sand: "#ecdcb8",
          cream: "#f4ead5"
        }
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        arch: "999px 999px 2rem 2rem"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"]
      },
      boxShadow: {
        glow: "0 25px 80px rgba(200, 163, 90, 0.18)",
        card: "0 18px 45px rgba(0, 0, 0, 0.28)"
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top, rgba(200, 163, 90, 0.22), transparent 38%), radial-gradient(circle at 80% 10%, rgba(107, 42, 36, 0.3), transparent 22%)",
        "ornament-grid":
          "linear-gradient(to right, rgba(236, 220, 184, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(236, 220, 184, 0.06) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
