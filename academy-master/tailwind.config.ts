import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        /* ── Warm charcoal surfaces ── */
        surface: {
          0: "#0e0c0b",
          1: "#141210",
          2: "#1a1816",
          3: "#211e1c",
          4: "#2a2623",
          5: "#332e2b",
        },

        /* ── Amber/gold accent ── */
        gold: {
          DEFAULT: "#f5a623",
          light: "#fbbf55",
          muted: "#c27d0e",
          dim: "rgba(245,166,35,0.12)",
        },

        /* ── Semantic status ── */
        success: {
          DEFAULT: "#3ecf8e",
          muted: "rgba(62,207,142,0.12)",
        },
        danger: {
          DEFAULT: "#ef4444",
          muted: "rgba(239,68,68,0.12)",
        },
        info: {
          DEFAULT: "#60a5fa",
          muted: "rgba(96,165,250,0.12)",
        },

        /* ── Warm neutrals ── */
        warm: {
          50:  "#faf8f5",
          100: "#f0ece5",
          200: "#ddd6cc",
          300: "#c4bab0",
          400: "#a8998d",
          500: "#8c7d72",
          600: "#72645a",
          700: "#5a4f47",
          800: "#433b35",
          900: "#2e2924",
          950: "#1a1614",
        },
      },

      borderRadius: {
        sm: "0.375rem",
        DEFAULT: "0.625rem",
        md: "0.625rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },

      boxShadow: {
        "gold":    "0 0 18px rgba(245,166,35,0.28)",
        "gold-lg": "0 0 36px rgba(245,166,35,0.18), 0 0 8px rgba(245,166,35,0.35)",
        "card":    "0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)",
        "card-hover": "0 8px 28px rgba(0,0,0,0.55), 0 0 0 1px rgba(245,166,35,0.2)",
        "inset-top": "inset 0 1px 0 rgba(255,255,255,0.07)",
        "topbar":  "0 1px 0 rgba(255,255,255,0.04)",
      },

      backgroundImage: {
        "gradient-gold":    "linear-gradient(135deg, #f5a623 0%, #fbbf55 60%, #f5c842 100%)",
        "gradient-gold-v":  "linear-gradient(180deg, #f5a623 0%, #d4870d 100%)",
        "gradient-surface": "linear-gradient(180deg, #1a1816 0%, #0e0c0b 100%)",
        "gradient-card":    "linear-gradient(135deg, rgba(245,166,35,0.06) 0%, rgba(245,166,35,0.01) 100%)",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "fade-up":        "fade-up 0.35s ease-out",
        "scale-in":       "scale-in 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
