/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                halcones: {
                    blue: '#0066FF', // Vibrant modern blue
                    white: '#ffffff',
                    dark: '#0F172A', // Slate-900: Background
                    card: '#4B5563', // Gray-600: Distinct medium gray for cards
                    border: '#6B7280', // Gray-500: Lighter border
                    gray: '#94A3B8', // Slate-400: Readable secondary text
                    gold: '#FFD700', // Accent gold
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Oswald', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
