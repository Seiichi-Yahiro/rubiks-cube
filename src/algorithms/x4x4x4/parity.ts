import type { AlgorithmGroup } from 'src/algorithms/algorithmTypes';
import { CubeColorKey } from 'src/tsx/cube/cubeTypes';

const { FRONT, BACK, LEFT, RIGHT, UP, DOWN } = CubeColorKey;

export const parity: AlgorithmGroup = {
    name: 'algorithm.4x4x4.parity.title',
    algorithms: [
        {
            name: 'algorithm.4x4x4.parity.edge-flipped',
            notation:
                "(2R2 B2 U2) (2L U2) (2R' U2) (2R U2) (F2 2R F2) (2L' B2 2R2)",
            startConfiguration: {
                front: [
                    [FRONT, UP, UP, FRONT],
                    [FRONT, FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT, FRONT],
                ],
                back: [
                    [BACK, BACK, BACK, BACK],
                    [BACK, BACK, BACK, BACK],
                    [BACK, BACK, BACK, BACK],
                    [BACK, BACK, BACK, BACK],
                ],
                left: [
                    [LEFT, LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT, LEFT],
                ],
                right: [
                    [RIGHT, RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT, RIGHT],
                ],
                up: [
                    [UP, UP, UP, UP],
                    [UP, UP, UP, UP],
                    [UP, UP, UP, UP],
                    [UP, FRONT, FRONT, UP],
                ],
                down: [
                    [DOWN, DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN, DOWN],
                ],
            },
        },
        {
            name: 'algorithm.4x4x4.parity.corners-edges-swapped',
            notation: '2R2 U2 2R2 u2 2R2 2U2',
            startConfiguration: {
                front: [
                    [FRONT, BACK, BACK, FRONT],
                    [FRONT, FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT, FRONT],
                ],
                back: [
                    [BACK, FRONT, FRONT, BACK],
                    [BACK, BACK, BACK, BACK],
                    [BACK, BACK, BACK, BACK],
                    [BACK, BACK, BACK, BACK],
                ],
                left: [
                    [LEFT, LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT, LEFT],
                ],
                right: [
                    [RIGHT, RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT, RIGHT],
                ],
                up: [
                    [UP, UP, UP, UP],
                    [UP, UP, UP, UP],
                    [UP, UP, UP, UP],
                    [UP, UP, UP, UP],
                ],
                down: [
                    [DOWN, DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN, DOWN],
                ],
            },
        },
    ],
};
