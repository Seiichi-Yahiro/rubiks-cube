import * as tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/tsx/**/*.tsx'],
    theme: {
        extend: {
            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
                breath: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(0.95)' },
                },
            },
            animation: {
                wiggle: 'wiggle 1s ease-in-out infinite',
                breath: 'breath 1.5s ease-in-out infinite',
            },
            colors: {
                white: '#ffffff',
                disabled: '#7A7A7A',
                'arrow-gray': '#383838',
                'cube-gray': '#333333',
                'cube-blue': '#3D81F6',
                'cube-green': '#009D54',
                'cube-red': '#DC422F',
                'cube-orange': '#FF6C00',
                'cube-yellow': '#FDCC09',
                error: '#F44336',
            },
            screens: {
                'pointer-coarse': { raw: '(pointer: coarse)' },
            },
        },
    },
    plugins: [tailwindcssAnimate],
};
