/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // backgroundImage: {
      //   "hero-bg": "url('./assets/hero-image.png')",
      // },
      dropShadow : {
        'navbar' : "0 5px 5px rgba(149, 128, 253,0.5)",
        'search' : "0 10px 10px rgba(149, 128, 253,0.5)"
      },
    },
  },
  plugins: [],
};
