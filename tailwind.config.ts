import type { Config } from "tailwindcss";

/**
 * Aikido palette (aiki.*): the 8 colours of the image chart, shared by the illustrations.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // unit themeColor classes are written in the content
    "./content/niveaux/**/*.yaml",
  ],
  theme: {
    extend: {
      colors: {
        aiki: {
          // charte de docs/images/prompt-antigravity.md (8 jetons, valeurs exactes)
          ai: '#22325A',        // indigo du hakama
          'ai-fonce': '#16213D',
          kinari: '#F6F1E7',    // écru du keikogi
          shu: '#D2462D',       // vermillon du sceau (hanko)
          sumi: '#1C1C1E',      // encre
          bois: '#C8A46A',
          tatami: '#CFC79A',
          gris: '#8A8F99',
          // dérivés propres à l'interface (hors charte des images)
          nuit: '#0B1020',      // fond du thème sombre
          'shu-fonce': '#A8331F',
          'ai-clair': '#8EA2F0', // indigo lisible sur fond sombre
        },
        duo: {
          red: "#FF4B4B",
          redDark: "#D33131",
          yellow: "#FFC800",
          yellowDark: "#E5A400",
          cardBorder: "#E5E5E5",
          grayText: "#777777",
          bgGray: "#F7F7F7",
        },
      },
      boxShadow: {
        '3d-seal': '0 4px 0 #A8331F',
        '3d-indigo': '0 4px 0 #16213D',
        '3d-yellow': '0 4px 0 #E5A400',
        '3d-red': '0 4px 0 #D33131',
        '3d-card': '0 4px 0 #1E293B',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        jp: ['"Hiragino Mincho ProN"', '"Yu Mincho"', '"Noto Serif JP"', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
