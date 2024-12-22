import type { AlgorithmGroup } from 'src/algorithms/algorithmTypes';
import { CubeColorKey } from 'src/tsx/cube/cubeTypes';

const { FRONT, BACK, LEFT, RIGHT, UP, DOWN, INSIDE } = CubeColorKey;

export const ollEdges: AlgorithmGroup = {
    name: 'algorithm.3x3x3.oll.edges.title',
    algorithms: [
        {
            name: 'algorithm.3x3x3.oll.edges.dot',
            notation: "F (R U R' U') F' f (R U R' U') f'",
            startConfiguration: {
                front: [
                    [INSIDE, UP, INSIDE],
                    [FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT],
                ],
                back: [
                    [INSIDE, UP, INSIDE],
                    [BACK, BACK, BACK],
                    [BACK, BACK, BACK],
                ],
                left: [
                    [INSIDE, UP, INSIDE],
                    [LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT],
                ],
                right: [
                    [INSIDE, UP, INSIDE],
                    [RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT],
                ],
                up: [
                    [INSIDE, INSIDE, INSIDE],
                    [INSIDE, UP, INSIDE],
                    [INSIDE, INSIDE, INSIDE],
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
                    [INSIDE, INSIDE, INSIDE],
                    [FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT],
                ],
                back: [
                    [INSIDE, UP, INSIDE],
                    [BACK, BACK, BACK],
                    [BACK, BACK, BACK],
                ],
                left: [
                    [INSIDE, UP, INSIDE],
                    [LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT],
                ],
                right: [
                    [INSIDE, INSIDE, INSIDE],
                    [RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT],
                ],
                up: [
                    [INSIDE, INSIDE, INSIDE],
                    [INSIDE, UP, UP],
                    [INSIDE, UP, INSIDE],
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
                    [INSIDE, UP, INSIDE],
                    [FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT],
                ],
                back: [
                    [INSIDE, UP, INSIDE],
                    [BACK, BACK, BACK],
                    [BACK, BACK, BACK],
                ],
                left: [
                    [INSIDE, INSIDE, INSIDE],
                    [LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT],
                ],
                right: [
                    [INSIDE, INSIDE, INSIDE],
                    [RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT],
                ],
                up: [
                    [INSIDE, INSIDE, INSIDE],
                    [UP, UP, UP],
                    [INSIDE, INSIDE, INSIDE],
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
                    [INSIDE, INSIDE, INSIDE],
                    [FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT],
                ],
                back: [
                    [INSIDE, INSIDE, INSIDE],
                    [BACK, BACK, BACK],
                    [BACK, BACK, BACK],
                ],
                left: [
                    [UP, INSIDE, UP],
                    [LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT],
                ],
                right: [
                    [UP, INSIDE, UP],
                    [RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT],
                ],
                up: [
                    [INSIDE, UP, INSIDE],
                    [UP, UP, UP],
                    [INSIDE, UP, INSIDE],
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
                    [INSIDE, INSIDE, UP],
                    [FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT],
                ],
                back: [
                    [UP, INSIDE, INSIDE],
                    [BACK, BACK, BACK],
                    [BACK, BACK, BACK],
                ],
                left: [
                    [UP, INSIDE, UP],
                    [LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT],
                ],
                right: [
                    [INSIDE, INSIDE, INSIDE],
                    [RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT],
                ],
                up: [
                    [INSIDE, UP, INSIDE],
                    [UP, UP, UP],
                    [INSIDE, UP, INSIDE],
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
                    [INSIDE, INSIDE, UP],
                    [FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT],
                ],
                back: [
                    [INSIDE, INSIDE, UP],
                    [BACK, BACK, BACK],
                    [BACK, BACK, BACK],
                ],
                left: [
                    [INSIDE, INSIDE, INSIDE],
                    [LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT],
                ],
                right: [
                    [INSIDE, INSIDE, UP],
                    [RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT],
                ],
                up: [
                    [INSIDE, UP, INSIDE],
                    [UP, UP, UP],
                    [UP, UP, INSIDE],
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
                    [UP, INSIDE, INSIDE],
                    [FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT],
                ],
                back: [
                    [UP, INSIDE, INSIDE],
                    [BACK, BACK, BACK],
                    [BACK, BACK, BACK],
                ],
                left: [
                    [UP, INSIDE, INSIDE],
                    [LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT],
                ],
                right: [
                    [INSIDE, INSIDE, INSIDE],
                    [RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT],
                ],
                up: [
                    [INSIDE, UP, INSIDE],
                    [UP, UP, UP],
                    [INSIDE, UP, UP],
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
                    [UP, INSIDE, INSIDE],
                    [FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT],
                ],
                back: [
                    [INSIDE, INSIDE, INSIDE],
                    [BACK, BACK, BACK],
                    [BACK, BACK, BACK],
                ],
                left: [
                    [INSIDE, INSIDE, INSIDE],
                    [LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT],
                ],
                right: [
                    [INSIDE, INSIDE, UP],
                    [RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT],
                ],
                up: [
                    [UP, UP, INSIDE],
                    [UP, UP, UP],
                    [INSIDE, UP, UP],
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
                    [UP, INSIDE, INSIDE],
                    [FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT],
                ],
                back: [
                    [INSIDE, INSIDE, UP],
                    [BACK, BACK, BACK],
                    [BACK, BACK, BACK],
                ],
                left: [
                    [INSIDE, INSIDE, INSIDE],
                    [LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT],
                ],
                right: [
                    [INSIDE, INSIDE, INSIDE],
                    [RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT],
                ],
                up: [
                    [INSIDE, UP, UP],
                    [UP, UP, UP],
                    [INSIDE, UP, UP],
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
                    [UP, INSIDE, UP],
                    [FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT],
                ],
                back: [
                    [INSIDE, INSIDE, INSIDE],
                    [BACK, BACK, BACK],
                    [BACK, BACK, BACK],
                ],
                left: [
                    [INSIDE, INSIDE, INSIDE],
                    [LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT],
                ],
                right: [
                    [INSIDE, INSIDE, INSIDE],
                    [RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT],
                ],
                up: [
                    [UP, UP, UP],
                    [UP, UP, UP],
                    [INSIDE, UP, INSIDE],
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
