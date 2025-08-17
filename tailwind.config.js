// tailwind.config.js
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(), // Flowbite
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"), // DaisyUI plugin
    flowbite.plugin(),  // Flowbite plugin
  ],
  darkMode: "class",
};
