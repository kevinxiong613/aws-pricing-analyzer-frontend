/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            fontFamily: {
                newsreader: [
                    "__Newsreader_dd4b18",
                ] /* Use the literal next.js font classNames for newsreader*/,
            },
            colors: {
                customWhiteHeader: "#fffefa", // Your specific hex color
                customBlue: "#006898",
                customLightBlue: "#4d97b7",
                customGreen: "#458601",
                customLightGreen: "#73b400",
            },
        },
    },
    plugins: [],
};
