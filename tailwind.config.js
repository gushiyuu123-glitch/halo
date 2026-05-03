/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "clamp(20px, 4vw, 56px)",
        lg: "clamp(28px, 4.4vw, 72px)",
        xl: "clamp(32px, 5vw, 88px)",
        "2xl": "clamp(40px, 5.4vw, 104px)",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1120px",
        xl: "1440px",
        "2xl": "1680px",
      },
    },

    extend: {
      colors: {
        halo: {
          /* ✅ 全体の暗さを少しだけ持ち上げる */
          black: "rgb(11 11 10 / <alpha-value>)",
          night: "rgb(16 16 15 / <alpha-value>)",
          deep: "rgb(22 21 19 / <alpha-value>)",

          ink: "rgb(243 239 230 / <alpha-value>)",
          bone: "rgb(226 218 202 / <alpha-value>)",
          ash: "rgb(170 162 148 / <alpha-value>)",
          gold: "rgb(151 126 83 / <alpha-value>)",
          line: "rgb(243 239 230 / <alpha-value>)",
        },
      },

      /* ✅ HALOフォント統一：Inter（UI） + Zen Old Mincho（日本語Serif） */
      fontFamily: {
        display: ['"Zen Old Mincho"', '"Noto Serif JP"', "serif"],
        serif: ['"Zen Old Mincho"', '"Noto Serif JP"', "serif"],
        sans: ['"Inter"', '"Noto Sans JP"', "system-ui", "sans-serif"],
      },

      letterSpacing: {
        halo: "0.16em",
        "halo-wide": "0.26em",
        "halo-tight": "-0.025em",
        "halo-soft": "0.04em",
      },

      lineHeight: {
        "halo-none": "0.9",
        "halo-tight": "1.02",
        "halo-title": "1.08",
        "halo-lead": "1.85",
        "halo-body": "2.05",
      },

      fontSize: {
        "halo-meta": ["11px", { lineHeight: "1.3", letterSpacing: "0.22em" }],
        "halo-caption": ["12px", { lineHeight: "1.8" }],
        "halo-body": ["14px", { lineHeight: "2.05" }],
        "halo-lead": ["clamp(17px, 1.35vw, 23px)", { lineHeight: "1.9" }],
        "halo-title": ["clamp(44px, 6.2vw, 112px)", { lineHeight: "1.02" }],
        "halo-huge": ["clamp(76px, 12vw, 208px)", { lineHeight: "0.9" }],
        "halo-mark": ["clamp(120px, 18vw, 320px)", { lineHeight: "0.82" }],
      },

      maxWidth: {
        "halo-read": "680px",
        "halo-body": "920px",
        "halo-rail": "1240px",
        "halo-stage": "1520px",
        "halo-wide": "1680px",
        "halo-full": "1920px",
      },

      spacing: {
        "halo-gutter": "clamp(20px, 5vw, 88px)",
        "halo-edge": "clamp(16px, 3vw, 40px)",
        "halo-section": "clamp(120px, 15vw, 260px)",
        "halo-section-sm": "clamp(80px, 10vw, 160px)",
        "halo-section-lg": "clamp(160px, 20vw, 340px)",
        "halo-shift": "clamp(56px, 9vw, 150px)",
      },

      borderRadius: {
        halo: "28px",
        "halo-sm": "14px",
        "halo-lg": "40px",
      },

      boxShadow: {
        halo: "0 28px 100px rgba(0, 0, 0, 0.48)",
        "halo-soft": "0 18px 70px rgba(0, 0, 0, 0.32)",
        "halo-inner": "inset 0 0 0 1px rgba(243, 239, 230, 0.12)",
        "halo-glow": "0 0 80px rgba(243, 239, 230, 0.085)",
      },

      backgroundImage: {
        "halo-veil":
          "radial-gradient(900px 520px at 22% 12%, rgba(243,239,230,0.08), rgba(11,11,10,0) 64%), radial-gradient(760px 560px at 84% 22%, rgba(151,126,83,0.085), rgba(11,11,10,0) 68%)",

        "halo-line":
          "linear-gradient(90deg, rgba(243,239,230,0), rgba(243,239,230,0.18), rgba(243,239,230,0))",

        "halo-bottom":
          "linear-gradient(180deg, rgba(11,11,10,0), rgba(11,11,10,0.84))",

        "halo-top":
          "linear-gradient(180deg, rgba(11,11,10,0.88), rgba(11,11,10,0))",
      },

      transitionTimingFunction: {
        halo: "cubic-bezier(0.22, 0.56, 0.18, 1)",
        "halo-soft": "cubic-bezier(0.18, 0.62, 0.2, 1)",
        "halo-out": "cubic-bezier(0.16, 0.78, 0.16, 1)",
      },

      transitionDuration: {
        halo: "900ms",
        "halo-slow": "1200ms",
        "halo-deep": "1600ms",
      },
    },
  },

  plugins: [],
};