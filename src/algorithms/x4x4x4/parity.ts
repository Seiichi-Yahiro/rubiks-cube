import type { AlgorithmGroup } from 'src/algorithms/algorithmTypes';
import { Color } from 'src/tsx/cube/cubeTypes';

const { YELLOW, WHITE, ORANGE, RED, GREEN, BLUE } = Color;

const parity: AlgorithmGroup = {
    name: 'algorithm.4x4x4.parity.title',
    algorithms: [
        {
            name: 'algorithm.4x4x4.parity.edge-flipped',
            notation:
                "(2R2 B2 U2) (2L U2) (2R' U2) (2R U2) (F2 2R F2) (2L' B2 2R2)",
            startConfiguration: {
                front: [
                    [BLUE, YELLOW, YELLOW, BLUE],
                    [BLUE, BLUE, BLUE, BLUE],
                    [BLUE, BLUE, BLUE, BLUE],
                    [BLUE, BLUE, BLUE, BLUE],
                ],
                back: [
                    [GREEN, GREEN, GREEN, GREEN],
                    [GREEN, GREEN, GREEN, GREEN],
                    [GREEN, GREEN, GREEN, GREEN],
                    [GREEN, GREEN, GREEN, GREEN],
                ],
                left: [
                    [ORANGE, ORANGE, ORANGE, ORANGE],
                    [ORANGE, ORANGE, ORANGE, ORANGE],
                    [ORANGE, ORANGE, ORANGE, ORANGE],
                    [ORANGE, ORANGE, ORANGE, ORANGE],
                ],
                right: [
                    [RED, RED, RED, RED],
                    [RED, RED, RED, RED],
                    [RED, RED, RED, RED],
                    [RED, RED, RED, RED],
                ],
                top: [
                    [YELLOW, YELLOW, YELLOW, YELLOW],
                    [YELLOW, YELLOW, YELLOW, YELLOW],
                    [YELLOW, YELLOW, YELLOW, YELLOW],
                    [YELLOW, BLUE, BLUE, YELLOW],
                ],
                bottom: [
                    [WHITE, WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE, WHITE],
                ],
            },
        },
        {
            name: 'algorithm.4x4x4.parity.corners-edges-swapped',
            notation: '2R2 U2 2R2 u2 2R2 2U2',
            startConfiguration: {
                front: [
                    [BLUE, GREEN, GREEN, BLUE],
                    [BLUE, BLUE, BLUE, BLUE],
                    [BLUE, BLUE, BLUE, BLUE],
                    [BLUE, BLUE, BLUE, BLUE],
                ],
                back: [
                    [GREEN, BLUE, BLUE, GREEN],
                    [GREEN, GREEN, GREEN, GREEN],
                    [GREEN, GREEN, GREEN, GREEN],
                    [GREEN, GREEN, GREEN, GREEN],
                ],
                left: [
                    [ORANGE, ORANGE, ORANGE, ORANGE],
                    [ORANGE, ORANGE, ORANGE, ORANGE],
                    [ORANGE, ORANGE, ORANGE, ORANGE],
                    [ORANGE, ORANGE, ORANGE, ORANGE],
                ],
                right: [
                    [RED, RED, RED, RED],
                    [RED, RED, RED, RED],
                    [RED, RED, RED, RED],
                    [RED, RED, RED, RED],
                ],
                top: [
                    [YELLOW, YELLOW, YELLOW, YELLOW],
                    [YELLOW, YELLOW, YELLOW, YELLOW],
                    [YELLOW, YELLOW, YELLOW, YELLOW],
                    [YELLOW, YELLOW, YELLOW, YELLOW],
                ],
                bottom: [
                    [WHITE, WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE, WHITE],
                    [WHITE, WHITE, WHITE, WHITE],
                ],
            },
        },
    ],
};

export default parity;
