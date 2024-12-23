import type { AlgorithmGroup } from 'src/algorithms/algorithmTypes';
import { CubeColorKey } from 'src/tsx/cube/cubeTypes';

const { FRONT, BACK, LEFT, RIGHT, UP, DOWN, UNKNOWN } = CubeColorKey;

export const ollEdges: AlgorithmGroup = {
    name: 'algorithm.3x3x3.oll.edges.title',
    algorithms: [
        {
            name: 'algorithm.3x3x3.oll.edges.dot',
            notation: "F (R U R' U') F' f (R U R' U') f'",
            startConfiguration: {
                front: [
                    [UNKNOWN, UP, UNKNOWN],
                    [FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT],
                ],
                back: [
                    [UNKNOWN, UP, UNKNOWN],
                    [BACK, BACK, BACK],
                    [BACK, BACK, BACK],
                ],
                left: [
                    [UNKNOWN, UP, UNKNOWN],
                    [LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT],
                ],
                right: [
                    [UNKNOWN, UP, UNKNOWN],
                    [RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT],
                ],
                up: [
                    [UNKNOWN, UNKNOWN, UNKNOWN],
                    [UNKNOWN, UP, UNKNOWN],
                    [UNKNOWN, UNKNOWN, UNKNOWN],
                ],
                down: [
                    [DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN],
                ],
            },
        },
        {
            name: 'algorithm.3x3x3.oll.edges.l',
            notation: "f (R U R' U') f'",
            startConfiguration: {
                front: [
                    [UNKNOWN, UNKNOWN, UNKNOWN],
                    [FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT],
                ],
                back: [
                    [UNKNOWN, UP, UNKNOWN],
                    [BACK, BACK, BACK],
                    [BACK, BACK, BACK],
                ],
                left: [
                    [UNKNOWN, UP, UNKNOWN],
                    [LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT],
                ],
                right: [
                    [UNKNOWN, UNKNOWN, UNKNOWN],
                    [RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT],
                ],
                up: [
                    [UNKNOWN, UNKNOWN, UNKNOWN],
                    [UNKNOWN, UP, UP],
                    [UNKNOWN, UP, UNKNOWN],
                ],
                down: [
                    [DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN],
                ],
            },
        },
        {
            name: 'algorithm.3x3x3.oll.edges.line',
            notation: "F (R U R' U') F'",
            startConfiguration: {
                front: [
                    [UNKNOWN, UP, UNKNOWN],
                    [FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT],
                ],
                back: [
                    [UNKNOWN, UP, UNKNOWN],
                    [BACK, BACK, BACK],
                    [BACK, BACK, BACK],
                ],
                left: [
                    [UNKNOWN, UNKNOWN, UNKNOWN],
                    [LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT],
                ],
                right: [
                    [UNKNOWN, UNKNOWN, UNKNOWN],
                    [RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT],
                ],
                up: [
                    [UNKNOWN, UNKNOWN, UNKNOWN],
                    [UP, UP, UP],
                    [UNKNOWN, UNKNOWN, UNKNOWN],
                ],
                down: [
                    [DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN],
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
                    [UNKNOWN, UNKNOWN, UNKNOWN],
                    [FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT],
                ],
                back: [
                    [UNKNOWN, UNKNOWN, UNKNOWN],
                    [BACK, BACK, BACK],
                    [BACK, BACK, BACK],
                ],
                left: [
                    [UP, UNKNOWN, UP],
                    [LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT],
                ],
                right: [
                    [UP, UNKNOWN, UP],
                    [RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT],
                ],
                up: [
                    [UNKNOWN, UP, UNKNOWN],
                    [UP, UP, UP],
                    [UNKNOWN, UP, UNKNOWN],
                ],
                down: [
                    [DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN],
                ],
            },
        },
        {
            name: 'algorithm.3x3x3.oll.corners.zero.pi',
            notation: "R U2 (R2 U' R2 U' R2) U2 R",
            startConfiguration: {
                front: [
                    [UNKNOWN, UNKNOWN, UP],
                    [FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT],
                ],
                back: [
                    [UP, UNKNOWN, UNKNOWN],
                    [BACK, BACK, BACK],
                    [BACK, BACK, BACK],
                ],
                left: [
                    [UP, UNKNOWN, UP],
                    [LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT],
                ],
                right: [
                    [UNKNOWN, UNKNOWN, UNKNOWN],
                    [RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT],
                ],
                up: [
                    [UNKNOWN, UP, UNKNOWN],
                    [UP, UP, UP],
                    [UNKNOWN, UP, UNKNOWN],
                ],
                down: [
                    [DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN],
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
                    [UNKNOWN, UNKNOWN, UP],
                    [FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT],
                ],
                back: [
                    [UNKNOWN, UNKNOWN, UP],
                    [BACK, BACK, BACK],
                    [BACK, BACK, BACK],
                ],
                left: [
                    [UNKNOWN, UNKNOWN, UNKNOWN],
                    [LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT],
                ],
                right: [
                    [UNKNOWN, UNKNOWN, UP],
                    [RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT],
                ],
                up: [
                    [UNKNOWN, UP, UNKNOWN],
                    [UP, UP, UP],
                    [UP, UP, UNKNOWN],
                ],
                down: [
                    [DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN],
                ],
            },
        },
        {
            name: 'algorithm.3x3x3.oll.corners.one.anti-sune',
            notation: "L' U' L U' L' U2 L",
            startConfiguration: {
                front: [
                    [UP, UNKNOWN, UNKNOWN],
                    [FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT],
                ],
                back: [
                    [UP, UNKNOWN, UNKNOWN],
                    [BACK, BACK, BACK],
                    [BACK, BACK, BACK],
                ],
                left: [
                    [UP, UNKNOWN, UNKNOWN],
                    [LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT],
                ],
                right: [
                    [UNKNOWN, UNKNOWN, UNKNOWN],
                    [RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT],
                ],
                up: [
                    [UNKNOWN, UP, UNKNOWN],
                    [UP, UP, UP],
                    [UNKNOWN, UP, UP],
                ],
                down: [
                    [DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN],
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
                    [UP, UNKNOWN, UNKNOWN],
                    [FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT],
                ],
                back: [
                    [UNKNOWN, UNKNOWN, UNKNOWN],
                    [BACK, BACK, BACK],
                    [BACK, BACK, BACK],
                ],
                left: [
                    [UNKNOWN, UNKNOWN, UNKNOWN],
                    [LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT],
                ],
                right: [
                    [UNKNOWN, UNKNOWN, UP],
                    [RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT],
                ],
                up: [
                    [UP, UP, UNKNOWN],
                    [UP, UP, UP],
                    [UNKNOWN, UP, UP],
                ],
                down: [
                    [DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN],
                ],
            },
        },
        {
            name: 'algorithm.3x3x3.oll.corners.two.t',
            notation: "x (L U R' U') (L' U R U') x'",
            startConfiguration: {
                front: [
                    [UP, UNKNOWN, UNKNOWN],
                    [FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT],
                ],
                back: [
                    [UNKNOWN, UNKNOWN, UP],
                    [BACK, BACK, BACK],
                    [BACK, BACK, BACK],
                ],
                left: [
                    [UNKNOWN, UNKNOWN, UNKNOWN],
                    [LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT],
                ],
                right: [
                    [UNKNOWN, UNKNOWN, UNKNOWN],
                    [RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT],
                ],
                up: [
                    [UNKNOWN, UP, UP],
                    [UP, UP, UP],
                    [UNKNOWN, UP, UP],
                ],
                down: [
                    [DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN],
                ],
            },
        },
        {
            name: 'algorithm.3x3x3.oll.corners.two.u',
            notation: "R2 D R' U2 R D' R' U2 R'",
            startConfiguration: {
                front: [
                    [UP, UNKNOWN, UP],
                    [FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT],
                ],
                back: [
                    [UNKNOWN, UNKNOWN, UNKNOWN],
                    [BACK, BACK, BACK],
                    [BACK, BACK, BACK],
                ],
                left: [
                    [UNKNOWN, UNKNOWN, UNKNOWN],
                    [LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT],
                ],
                right: [
                    [UNKNOWN, UNKNOWN, UNKNOWN],
                    [RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT],
                ],
                up: [
                    [UP, UP, UP],
                    [UP, UP, UP],
                    [UNKNOWN, UP, UNKNOWN],
                ],
                down: [
                    [DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN],
                ],
            },
        },
    ],
};
