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
                rotate3d: {
                    '0%': { transform: 'rotateX(-45deg) rotateY(-45deg)' },
                    '100%': { transform: 'rotateX(-45deg) rotateY(315deg)' },
                },
            },
            animation: {
                wiggle: 'wiggle 1s ease-in-out infinite',
                breath: 'breath 1.5s ease-in-out infinite',
                rotate3d: 'rotate3d 5s linear infinite',
            },
            colors: {
                white: '#ffffff',
                disabled: '#7A7A7A',
                error: 'rgb(var(--error) / <alpha-value>)',
                'arrow-gray': '#383838',
                'cube-gray': '#333333',
                'cube-blue': '#3D81F6',
                'cube-green': '#009D54',
                'cube-red': '#DC422F',
                'cube-orange': '#FF6C00',
                'cube-yellow': '#FDCC09',
            },
            screens: {
                'pointer-fine': { raw: '(pointer: fine)' },
                'pointer-coarse': { raw: '(pointer: coarse)' },
                'hover-hover': { raw: '(hover: hover)' },
            },
        },
    },
    plugins: [tailwindcssAnimate],
};
