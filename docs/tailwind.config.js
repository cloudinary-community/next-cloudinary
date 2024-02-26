/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", 'html[class~="dark"]'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,md,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary':'#3448C5',
      }
    },
  },
  plugins: [],
}

