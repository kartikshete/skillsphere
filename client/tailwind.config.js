/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#6366f1", // Match skillsphere primary
                secondary: "#06b6d4",
                dark: "#020617",
                card: "#1e293b",
                text: "#f8fafc",
            },
            fontFamily: {
                sans: ['Outfit', 'Inter', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        },
    },
    plugins: [],
}
