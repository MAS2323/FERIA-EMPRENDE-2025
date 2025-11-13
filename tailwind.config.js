module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00A9F2",
        secondary: "#172D9D",
        accent: "#787CFE",
        teal: "#48BED9",
        cyan: "#00E2E0",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      fontWeight: {
        extrabold: "800",
        semibold: "600",
      },
    },
  },
  plugins: [],
};
