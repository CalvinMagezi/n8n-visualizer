/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          black: "#0D0F10",
          bg: "#131619",
        },
        brand: {
          green: "#1DE52F",
          blue: "#00C6FA",
          black: "#231F20",
          gray: "#dfdfdf",
        },
        app: {
          black: "#0D0F10",
        },
        gray: {
          text: "#828282",
        },
      },
      boxShadow: {
        'neon-green': '0 0 5px theme(colors.brand.green), 0 0 20px theme(colors.brand.green)',
        'neon-blue': '0 0 5px theme(colors.brand.blue), 0 0 20px theme(colors.brand.blue)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px theme(colors.brand.green), 0 0 20px theme(colors.brand.green)' },
          '100%': { boxShadow: '0 0 10px theme(colors.brand.green), 0 0 30px theme(colors.brand.green)' },
        },
      },
    },
  },
  plugins: [],
}