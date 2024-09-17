/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            container: {
                center: true,
                padding: "1rem",
                screens: {
                    lg: "1250px",
                },
            },
            backgroundColor: {
                primary: "#5c523e",
                second: "#8a7a5d",
                third: "#a49e87",
            },
            colors: {
                primary: "#ed6436",
            },
            borderRadius: {
                999: "999px",
                custom: "25% 25% 46% 54% / 0% 0% 73% 72%",
            },
            fontFamily: {
                roboto: ["Nunito Sans", "sans-serif"],
            },
            rotate: {
                30: "10deg",
                12: "12deg",
            },
            transform: ["hover", "focus"],
            scale: {
                110: "1.10",
            },
            transitionDuration: {
                300: "300ms",
            },
        },
    },
    plugins: [],
};
