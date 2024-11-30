/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,tsx}'],
    theme: {
        extend: {
            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
            },
            animation: {
                wiggle: 'wiggle 1s ease-in-out infinite',
            },
            colors: {
                white: '#ffffff',
                'arrow-gray': '#383838',
                'cube-gray': '#333333',
                'cube-blue': '#3D81F6',
                'cube-green': '#009D54',
                'cube-red': '#DC422F',
                'cube-orange': '#FF6C00',
                'cube-yellow': '#FDCC09',
                error: '#F44336',
            },
        },
    },
    plugins: [],
};
