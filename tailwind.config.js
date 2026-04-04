/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "sans-serif",
        ],
      },
      colors: {
        brand: {
          bg: "#040816",
          panel: "#081120",
          panelSoft: "#0b1426",
          line: "rgba(255,255,255,0.10)",
          text: "#F8FAFC",
          muted: "#94A3B8",
          blue: "#4F7CFF",
          blueSoft: "#60A5FA",
          violet: "#7C5CFF",
          emerald: "#1ED7A5",
          amber: "#F59E0B",
          rose: "#F43F5E",
        },
      },
      boxShadow: {
        premium:
          "0 18px 60px rgba(10,20,40,0.34), 0 0 40px rgba(60,100,255,0.08)",
        panel:
          "0 0 0 1px rgba(255,255,255,0.02) inset, 0 24px 80px rgba(5,12,28,0.42), 0 0 60px rgba(60,100,255,0.10)",
        glowBlue: "0 0 40px rgba(79,124,255,0.18)",
        glowEmerald: "0 0 40px rgba(30,215,165,0.18)",
        glowViolet: "0 0 40px rgba(124,92,255,0.18)",
        button:
          "0 10px 30px rgba(79,124,255,0.28), 0 0 40px rgba(79,124,255,0.12)",
      },
      backgroundImage: {
        "brand-radial":
          "radial-gradient(circle at top left, rgba(79,124,255,0.18), transparent 28%), radial-gradient(circle at top right, rgba(30,215,165,0.12), transparent 24%), radial-gradient(circle at bottom left, rgba(124,92,255,0.14), transparent 24%)",
        "dashboard-grid":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "brand-button":
          "linear-gradient(135deg, rgba(79,124,255,1), rgba(99,102,241,1), rgba(59,130,246,0.96))",
        "panel-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        fadeUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(12px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        softPulse: {
          "0%, 100%": {
            opacity: "0.82",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.015)",
          },
        },
        glowFloat: {
          "0%, 100%": {
            filter: "drop-shadow(0 0 0 rgba(79,124,255,0))",
            transform: "translateY(0)",
          },
          "50%": {
            filter: "drop-shadow(0 0 24px rgba(79,124,255,0.18))",
            transform: "translateY(-2px)",
          },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out both",
        "soft-pulse": "softPulse 3s ease-in-out infinite",
        glow: "glowFloat 5s ease-in-out infinite",
      },
      maxWidth: {
        "8xl": "90rem",
      },
      gridTemplateColumns: {
        dashboard: "280px minmax(0, 1fr)",
      },
    },
  },
  plugins: [],
};