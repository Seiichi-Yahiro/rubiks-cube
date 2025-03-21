import * as tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/tsx/**/*.tsx'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Roboto', 'sans-serif'],
                mono: ['Roboto Mono', 'monospace'],
            },
            keyframes: {
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
                breath: 'breath 1.5s ease-in-out infinite',
                rotate3d: 'rotate3d 5s linear infinite',
            },
            colors: {
                'app-text': 'var(--color-app-text)',
                'app-text-inverted': 'var(--color-app-text-inverted)',
                'app-text-highlighted': 'var(--color-app-text-highlighted)',
                'app-text-error': 'var(--color-app-text-error)',
                'app-text-disabled': 'var(--color-app-text-disabled)',

                'app-bg': 'var(--color-app-bg)',
                'app-bg-highlighted': 'var(--color-app-bg-highlighted)',
                'app-bg-error': 'var(--color-app-bg-error)',
                'app-bg-code': 'var(--color-app-bg-code)',
                'app-bg-hover': 'var(--color-app-bg-hover)',
                'app-bg-hover-highlighted':
                    'var(--color-app-bg-hover-highlighted)',
                'app-bg-active': 'var(--color-app-bg-active)',
                'app-bg-ripple': 'var(--color-app-bg-ripple)',
                'app-bg-disabled': 'var(--color-app-bg-disabled)',
                'app-bg-inactive': 'var(--color-app-bg-inactive)',

                'app-border': 'var(--color-app-border)',
                'app-border-highlighted': 'var(--color-app-border-highlighted)',
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
