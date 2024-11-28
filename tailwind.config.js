/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.tsx'],
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
                'cube-gray': '#333333',
                'arrow-gray': '#383838',
                error: '#F44336',
            },
        },
    },
    plugins: [],
};
