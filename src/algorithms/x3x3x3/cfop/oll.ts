import type { AlgorithmGroup } from 'src/algorithms/algorithmTypes';
import { Color } from 'src/tsx/cube/cubeTypes';

const { YELLOW, WHITE, ORANGE, RED, GREEN, BLUE, DEFAULT } = Color;

export const ollEdges: AlgorithmGroup = {
    name: 'algorithm.3x3x3.oll.edges.title',
    algorithms: [
        {
            name: 'algorithm.3x3x3.oll.edges.dot',
            notation: "F (R U R' U') F' f (R U R' U') f'",
            startConfiguration: {
                front: [
                    [DEFAULT, YELLOW, DEFAULT],
                    [BLUE, BLUE, BLUE],
                    [BLUE, BLUE, BLUE],
                ],
                back: [
                    [DEFAULT, YELLOW, DEFAULT],
                    [GREEN, GREEN, GREEN],
                    [GREEN, GREEN, GREEN],
                ],
                left: [
                    [DEFAULT, YELLOW, DEFAULT],
                    [ORANGE, ORANGE, ORANGE],
                    [ORANGE, ORANGE, ORANGE],
                ],
                right: [
                    [DEFAULT, YELLOW, DEFAULT],
                    [RED, RED, RED],
                    [RED, RED, RED],
                ],
                top: [
                    [DEFAULT, DEFAULT, DEFAULT],
                    [DEFAULT, YELLOW, DEFAULT],
                    [DEFAULT, DEFAULT, DEFAULT],
                ],
                bottom: [
                    [WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE],
                ],
            },
        },
        {
            name: 'algorithm.3x3x3.oll.edges.l',
            notation: "f (R U R' U') f'",
            startConfiguration: {
                front: [
                    [DEFAULT, DEFAULT, DEFAULT],
                    [BLUE, BLUE, BLUE],
                    [BLUE, BLUE, BLUE],
                ],
                back: [
                    [DEFAULT, YELLOW, DEFAULT],
                    [GREEN, GREEN, GREEN],
                    [GREEN, GREEN, GREEN],
                ],
                left: [
                    [DEFAULT, YELLOW, DEFAULT],
                    [ORANGE, ORANGE, ORANGE],
                    [ORANGE, ORANGE, ORANGE],
                ],
                right: [
                    [DEFAULT, DEFAULT, DEFAULT],
                    [RED, RED, RED],
                    [RED, RED, RED],
                ],
                top: [
                    [DEFAULT, DEFAULT, DEFAULT],
                    [DEFAULT, YELLOW, YELLOW],
                    [DEFAULT, YELLOW, DEFAULT],
                ],
                bottom: [
                    [WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE],
                ],
            },
        },
        {
            name: 'algorithm.3x3x3.oll.edges.line',
            notation: "F (R U R' U') F'",
            startConfiguration: {
                front: [
                    [DEFAULT, YELLOW, DEFAULT],
                    [BLUE, BLUE, BLUE],
                    [BLUE, BLUE, BLUE],
                ],
                back: [
                    [DEFAULT, YELLOW, DEFAULT],
                    [GREEN, GREEN, GREEN],
                    [GREEN, GREEN, GREEN],
                ],
                left: [
                    [DEFAULT, DEFAULT, DEFAULT],
                    [ORANGE, ORANGE, ORANGE],
                    [ORANGE, ORANGE, ORANGE],
                ],
                right: [
                    [DEFAULT, DEFAULT, DEFAULT],
                    [RED, RED, RED],
                    [RED, RED, RED],
                ],
                top: [
                    [DEFAULT, DEFAULT, DEFAULT],
                    [YELLOW, YELLOW, YELLOW],
                    [DEFAULT, DEFAULT, DEFAULT],
                ],
                bottom: [
                    [WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE],
                ],
            },
        },
    ],
};

export const ollCornersZero: AlgorithmGroup = {
    name: 'algorithm.3x3x3.oll.corners.zero.title',
    algorithms: [
        {
            name: 'algorithm.3x3x3.oll.corners.zero.h',
            notation: "F (R U R' U')3 F'",
            startConfiguration: {
                front: [
                    [DEFAULT, DEFAULT, DEFAULT],
                    [BLUE, BLUE, BLUE],
                    [BLUE, BLUE, BLUE],
                ],
                back: [
                    [DEFAULT, DEFAULT, DEFAULT],
                    [GREEN, GREEN, GREEN],
                    [GREEN, GREEN, GREEN],
                ],
                left: [
                    [YELLOW, DEFAULT, YELLOW],
                    [ORANGE, ORANGE, ORANGE],
                    [ORANGE, ORANGE, ORANGE],
                ],
                right: [
                    [YELLOW, DEFAULT, YELLOW],
                    [RED, RED, RED],
                    [RED, RED, RED],
                ],
                top: [
                    [DEFAULT, YELLOW, DEFAULT],
                    [YELLOW, YELLOW, YELLOW],
                    [DEFAULT, YELLOW, DEFAULT],
                ],
                bottom: [
                    [WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE],
                ],
            },
        },
        {
            name: 'algorithm.3x3x3.oll.corners.zero.pi',
            notation: "R U2 (R2 U' R2 U' R2) U2 R",
            startConfiguration: {
                front: [
                    [DEFAULT, DEFAULT, YELLOW],
                    [BLUE, BLUE, BLUE],
                    [BLUE, BLUE, BLUE],
                ],
                back: [
                    [YELLOW, DEFAULT, DEFAULT],
                    [GREEN, GREEN, GREEN],
                    [GREEN, GREEN, GREEN],
                ],
                left: [
                    [YELLOW, DEFAULT, YELLOW],
                    [ORANGE, ORANGE, ORANGE],
                    [ORANGE, ORANGE, ORANGE],
                ],
                right: [
                    [DEFAULT, DEFAULT, DEFAULT],
                    [RED, RED, RED],
                    [RED, RED, RED],
                ],
                top: [
                    [DEFAULT, YELLOW, DEFAULT],
                    [YELLOW, YELLOW, YELLOW],
                    [DEFAULT, YELLOW, DEFAULT],
                ],
                bottom: [
                    [WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE],
                ],
            },
        },
    ],
};

export const ollCornersOne: AlgorithmGroup = {
    name: 'algorithm.3x3x3.oll.corners.one.title',
    algorithms: [
        {
            name: 'algorithm.3x3x3.oll.corners.one.sune',
            notation: "R U R' U R U2 R'",
            startConfiguration: {
                front: [
                    [DEFAULT, DEFAULT, YELLOW],
                    [BLUE, BLUE, BLUE],
                    [BLUE, BLUE, BLUE],
                ],
                back: [
                    [DEFAULT, DEFAULT, YELLOW],
                    [GREEN, GREEN, GREEN],
                    [GREEN, GREEN, GREEN],
                ],
                left: [
                    [DEFAULT, DEFAULT, DEFAULT],
                    [ORANGE, ORANGE, ORANGE],
                    [ORANGE, ORANGE, ORANGE],
                ],
                right: [
                    [DEFAULT, DEFAULT, YELLOW],
                    [RED, RED, RED],
                    [RED, RED, RED],
                ],
                top: [
                    [DEFAULT, YELLOW, DEFAULT],
                    [YELLOW, YELLOW, YELLOW],
                    [YELLOW, YELLOW, DEFAULT],
                ],
                bottom: [
                    [WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE],
                ],
            },
        },
        {
            name: 'algorithm.3x3x3.oll.corners.one.anti-sune',
            notation: "L' U' L U' L' U2 L",
            startConfiguration: {
                front: [
                    [YELLOW, DEFAULT, DEFAULT],
                    [BLUE, BLUE, BLUE],
                    [BLUE, BLUE, BLUE],
                ],
                back: [
                    [YELLOW, DEFAULT, DEFAULT],
                    [GREEN, GREEN, GREEN],
                    [GREEN, GREEN, GREEN],
                ],
                left: [
                    [YELLOW, DEFAULT, DEFAULT],
                    [ORANGE, ORANGE, ORANGE],
                    [ORANGE, ORANGE, ORANGE],
                ],
                right: [
                    [DEFAULT, DEFAULT, DEFAULT],
                    [RED, RED, RED],
                    [RED, RED, RED],
                ],
                top: [
                    [DEFAULT, YELLOW, DEFAULT],
                    [YELLOW, YELLOW, YELLOW],
                    [DEFAULT, YELLOW, YELLOW],
                ],
                bottom: [
                    [WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE],
                ],
            },
        },
    ],
};

export const ollCornersTwo: AlgorithmGroup = {
    name: 'algorithm.3x3x3.oll.corners.two.title',
    algorithms: [
        {
            name: 'algorithm.3x3x3.oll.corners.two.l',
            notation: "x (R' U R D') (R' U' R D) x'",
            startConfiguration: {
                front: [
                    [YELLOW, DEFAULT, DEFAULT],
                    [BLUE, BLUE, BLUE],
                    [BLUE, BLUE, BLUE],
                ],
                back: [
                    [DEFAULT, DEFAULT, DEFAULT],
                    [GREEN, GREEN, GREEN],
                    [GREEN, GREEN, GREEN],
                ],
                left: [
                    [DEFAULT, DEFAULT, DEFAULT],
                    [ORANGE, ORANGE, ORANGE],
                    [ORANGE, ORANGE, ORANGE],
                ],
                right: [
                    [DEFAULT, DEFAULT, YELLOW],
                    [RED, RED, RED],
                    [RED, RED, RED],
                ],
                top: [
                    [YELLOW, YELLOW, DEFAULT],
                    [YELLOW, YELLOW, YELLOW],
                    [DEFAULT, YELLOW, YELLOW],
                ],
                bottom: [
                    [WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE],
                ],
            },
        },
        {
            name: 'algorithm.3x3x3.oll.corners.two.t',
            notation: "x (L U R' U') (L' U R U') x'",
            startConfiguration: {
                front: [
                    [YELLOW, DEFAULT, DEFAULT],
                    [BLUE, BLUE, BLUE],
                    [BLUE, BLUE, BLUE],
                ],
                back: [
                    [DEFAULT, DEFAULT, YELLOW],
                    [GREEN, GREEN, GREEN],
                    [GREEN, GREEN, GREEN],
                ],
                left: [
                    [DEFAULT, DEFAULT, DEFAULT],
                    [ORANGE, ORANGE, ORANGE],
                    [ORANGE, ORANGE, ORANGE],
                ],
                right: [
                    [DEFAULT, DEFAULT, DEFAULT],
                    [RED, RED, RED],
                    [RED, RED, RED],
                ],
                top: [
                    [DEFAULT, YELLOW, YELLOW],
                    [YELLOW, YELLOW, YELLOW],
                    [DEFAULT, YELLOW, YELLOW],
                ],
                bottom: [
                    [WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE],
                ],
            },
        },
        {
            name: 'algorithm.3x3x3.oll.corners.two.u',
            notation: "R2 D R' U2 R D' R' U2 R'",
            startConfiguration: {
                front: [
                    [YELLOW, DEFAULT, YELLOW],
                    [BLUE, BLUE, BLUE],
                    [BLUE, BLUE, BLUE],
                ],
                back: [
                    [DEFAULT, DEFAULT, DEFAULT],
                    [GREEN, GREEN, GREEN],
                    [GREEN, GREEN, GREEN],
                ],
                left: [
                    [DEFAULT, DEFAULT, DEFAULT],
                    [ORANGE, ORANGE, ORANGE],
                    [ORANGE, ORANGE, ORANGE],
                ],
                right: [
                    [DEFAULT, DEFAULT, DEFAULT],
                    [RED, RED, RED],
                    [RED, RED, RED],
                ],
                top: [
                    [YELLOW, YELLOW, YELLOW],
                    [YELLOW, YELLOW, YELLOW],
                    [DEFAULT, YELLOW, DEFAULT],
                ],
                bottom: [
                    [WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE],
                ],
            },
        },
    ],
};
