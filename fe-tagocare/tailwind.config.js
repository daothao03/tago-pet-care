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
                primary: "#ed6436",
                secondary: "#1E787D",
                admin: "#94b8b7",
            },
            borderRadius: {
                999: "999px",
                custom: "25% 25% 46% 54% / 0% 0% 73% 72%",
            },
            fontFamily: {
                pacifico: ["Pacifico", "cursive"],
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
