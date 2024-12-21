import type { AlgorithmGroup } from 'src/algorithms/algorithmTypes';
import { Color } from 'src/tsx/cube/cubeTypes';

const { YELLOW, WHITE, ORANGE, RED, GREEN, BLUE, DEFAULT } = Color;

export const pllOneCorner: AlgorithmGroup = {
    name: 'algorithm.3x3x3.pll.corners.two.title',
    algorithms: [
        {
            name: 'algorithm.3x3x3.pll.corners.two.diagonal',
            notation: "(F R U' R' U' R U R' F') (R U R' U' R' F R F')",
            startConfiguration: {
                front: [
                    [BLUE, DEFAULT, GREEN],
                    [BLUE, BLUE, BLUE],
                    [BLUE, BLUE, BLUE],
                ],
                back: [
                    [GREEN, DEFAULT, BLUE],
                    [GREEN, GREEN, GREEN],
                    [GREEN, GREEN, GREEN],
                ],
                left: [
                    [RED, DEFAULT, ORANGE],
                    [ORANGE, ORANGE, ORANGE],
                    [ORANGE, ORANGE, ORANGE],
                ],
                right: [
                    [ORANGE, DEFAULT, RED],
                    [RED, RED, RED],
                    [RED, RED, RED],
                ],
                top: [
                    [YELLOW, YELLOW, YELLOW],
                    [YELLOW, YELLOW, YELLOW],
                    [YELLOW, YELLOW, YELLOW],
                ],
                bottom: [
                    [WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE],
                ],
            },
        },
        {
            name: 'algorithm.3x3x3.pll.corners.two.adjacent',
            notation: "(R U R' U' R' F) R2 (U' R' U' R U R' F')",
            startConfiguration: {
                front: [
                    [BLUE, DEFAULT, RED],
                    [BLUE, BLUE, BLUE],
                    [BLUE, BLUE, BLUE],
                ],
                back: [
                    [RED, DEFAULT, GREEN],
                    [GREEN, GREEN, GREEN],
                    [GREEN, GREEN, GREEN],
                ],
                left: [
                    [ORANGE, DEFAULT, ORANGE],
                    [ORANGE, ORANGE, ORANGE],
                    [ORANGE, ORANGE, ORANGE],
                ],
                right: [
                    [GREEN, DEFAULT, BLUE],
                    [RED, RED, RED],
                    [RED, RED, RED],
                ],
                top: [
                    [YELLOW, YELLOW, YELLOW],
                    [YELLOW, YELLOW, YELLOW],
                    [YELLOW, YELLOW, YELLOW],
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

export const pllEdgesZero: AlgorithmGroup = {
    name: 'algorithm.3x3x3.pll.edges.zero.title',
    algorithms: [
        {
            name: 'algorithm.3x3x3.pll.edges.zero.cross',
            notation: "M2 U' M2 U2 M2 U' M2",
            startConfiguration: {
                front: [
                    [BLUE, GREEN, BLUE],
                    [BLUE, BLUE, BLUE],
                    [BLUE, BLUE, BLUE],
                ],
                back: [
                    [GREEN, BLUE, GREEN],
                    [GREEN, GREEN, GREEN],
                    [GREEN, GREEN, GREEN],
                ],
                left: [
                    [ORANGE, RED, ORANGE],
                    [ORANGE, ORANGE, ORANGE],
                    [ORANGE, ORANGE, ORANGE],
                ],
                right: [
                    [RED, ORANGE, RED],
                    [RED, RED, RED],
                    [RED, RED, RED],
                ],
                top: [
                    [YELLOW, YELLOW, YELLOW],
                    [YELLOW, YELLOW, YELLOW],
                    [YELLOW, YELLOW, YELLOW],
                ],
                bottom: [
                    [WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE],
                ],
            },
        },
        {
            name: 'algorithm.3x3x3.pll.edges.zero.diagonal',
            notation: "M' U' M2 U' M2 U' M' U2 M2",
            startConfiguration: {
                front: [
                    [BLUE, RED, BLUE],
                    [BLUE, BLUE, BLUE],
                    [BLUE, BLUE, BLUE],
                ],
                back: [
                    [GREEN, ORANGE, GREEN],
                    [GREEN, GREEN, GREEN],
                    [GREEN, GREEN, GREEN],
                ],
                left: [
                    [ORANGE, GREEN, ORANGE],
                    [ORANGE, ORANGE, ORANGE],
                    [ORANGE, ORANGE, ORANGE],
                ],
                right: [
                    [RED, BLUE, RED],
                    [RED, RED, RED],
                    [RED, RED, RED],
                ],
                top: [
                    [YELLOW, YELLOW, YELLOW],
                    [YELLOW, YELLOW, YELLOW],
                    [YELLOW, YELLOW, YELLOW],
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

export const pllEdgesOne: AlgorithmGroup = {
    name: 'algorithm.3x3x3.pll.edges.one.title',
    algorithms: [
        {
            name: 'algorithm.3x3x3.pll.edges.one.counterclockwise',
            notation: "R U' R U R U R U' R' U' R2",
            startConfiguration: {
                front: [
                    [BLUE, RED, BLUE],
                    [BLUE, BLUE, BLUE],
                    [BLUE, BLUE, BLUE],
                ],
                back: [
                    [GREEN, GREEN, GREEN],
                    [GREEN, GREEN, GREEN],
                    [GREEN, GREEN, GREEN],
                ],
                left: [
                    [ORANGE, BLUE, ORANGE],
                    [ORANGE, ORANGE, ORANGE],
                    [ORANGE, ORANGE, ORANGE],
                ],
                right: [
                    [RED, ORANGE, RED],
                    [RED, RED, RED],
                    [RED, RED, RED],
                ],
                top: [
                    [YELLOW, YELLOW, YELLOW],
                    [YELLOW, YELLOW, YELLOW],
                    [YELLOW, YELLOW, YELLOW],
                ],
                bottom: [
                    [WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE],
                ],
            },
        },
        {
            name: 'algorithm.3x3x3.pll.edges.one.clockwise',
            notation: "R2 U R U R' U' R' U' R' U R'",
            startConfiguration: {
                front: [
                    [BLUE, ORANGE, BLUE],
                    [BLUE, BLUE, BLUE],
                    [BLUE, BLUE, BLUE],
                ],
                back: [
                    [GREEN, GREEN, GREEN],
                    [GREEN, GREEN, GREEN],
                    [GREEN, GREEN, GREEN],
                ],
                left: [
                    [ORANGE, RED, ORANGE],
                    [ORANGE, ORANGE, ORANGE],
                    [ORANGE, ORANGE, ORANGE],
                ],
                right: [
                    [RED, BLUE, RED],
                    [RED, RED, RED],
                    [RED, RED, RED],
                ],
                top: [
                    [YELLOW, YELLOW, YELLOW],
                    [YELLOW, YELLOW, YELLOW],
                    [YELLOW, YELLOW, YELLOW],
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
