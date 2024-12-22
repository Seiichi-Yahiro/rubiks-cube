import type { AlgorithmGroup } from 'src/algorithms/algorithmTypes';
import { CubeColorKey } from 'src/tsx/cube/cubeTypes';

const { FRONT, BACK, LEFT, RIGHT, UP, DOWN, INSIDE } = CubeColorKey;

export const pllOneCorner: AlgorithmGroup = {
    name: 'algorithm.3x3x3.pll.corners.two.title',
    algorithms: [
        {
            name: 'algorithm.3x3x3.pll.corners.two.diagonal',
            notation: "(F R U' R' U' R U R' F') (R U R' U' R' F R F')",
            startConfiguration: {
                front: [
                    [FRONT, INSIDE, BACK],
                    [FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT],
                ],
                back: [
                    [BACK, INSIDE, FRONT],
                    [BACK, BACK, BACK],
                    [BACK, BACK, BACK],
                ],
                left: [
                    [RIGHT, INSIDE, LEFT],
                    [LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT],
                ],
                right: [
                    [LEFT, INSIDE, RIGHT],
                    [RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT],
                ],
                up: [
                    [UP, UP, UP],
                    [UP, UP, UP],
                    [UP, UP, UP],
                ],
                down: [
                    [DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN],
                ],
            },
        },
        {
            name: 'algorithm.3x3x3.pll.corners.two.adjacent',
            notation: "(R U R' U' R' F) R2 (U' R' U' R U R' F')",
            startConfiguration: {
                front: [
                    [FRONT, INSIDE, RIGHT],
                    [FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT],
                ],
                back: [
                    [RIGHT, INSIDE, BACK],
                    [BACK, BACK, BACK],
                    [BACK, BACK, BACK],
                ],
                left: [
                    [LEFT, INSIDE, LEFT],
                    [LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT],
                ],
                right: [
                    [BACK, INSIDE, FRONT],
                    [RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT],
                ],
                up: [
                    [UP, UP, UP],
                    [UP, UP, UP],
                    [UP, UP, UP],
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

export const pllEdgesZero: AlgorithmGroup = {
    name: 'algorithm.3x3x3.pll.edges.zero.title',
    algorithms: [
        {
            name: 'algorithm.3x3x3.pll.edges.zero.cross',
            notation: "M2 U' M2 U2 M2 U' M2",
            startConfiguration: {
                front: [
                    [FRONT, BACK, FRONT],
                    [FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT],
                ],
                back: [
                    [BACK, FRONT, BACK],
                    [BACK, BACK, BACK],
                    [BACK, BACK, BACK],
                ],
                left: [
                    [LEFT, RIGHT, LEFT],
                    [LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT],
                ],
                right: [
                    [RIGHT, LEFT, RIGHT],
                    [RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT],
                ],
                up: [
                    [UP, UP, UP],
                    [UP, UP, UP],
                    [UP, UP, UP],
                ],
                down: [
                    [DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN],
                ],
            },
        },
        {
            name: 'algorithm.3x3x3.pll.edges.zero.diagonal',
            notation: "M' U' M2 U' M2 U' M' U2 M2",
            startConfiguration: {
                front: [
                    [FRONT, RIGHT, FRONT],
                    [FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT],
                ],
                back: [
                    [BACK, LEFT, BACK],
                    [BACK, BACK, BACK],
                    [BACK, BACK, BACK],
                ],
                left: [
                    [LEFT, BACK, LEFT],
                    [LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT],
                ],
                right: [
                    [RIGHT, FRONT, RIGHT],
                    [RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT],
                ],
                up: [
                    [UP, UP, UP],
                    [UP, UP, UP],
                    [UP, UP, UP],
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

export const pllEdgesOne: AlgorithmGroup = {
    name: 'algorithm.3x3x3.pll.edges.one.title',
    algorithms: [
        {
            name: 'algorithm.3x3x3.pll.edges.one.counterclockwise',
            notation: "R U' R U R U R U' R' U' R2",
            startConfiguration: {
                front: [
                    [FRONT, RIGHT, FRONT],
                    [FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT],
                ],
                back: [
                    [BACK, BACK, BACK],
                    [BACK, BACK, BACK],
                    [BACK, BACK, BACK],
                ],
                left: [
                    [LEFT, FRONT, LEFT],
                    [LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT],
                ],
                right: [
                    [RIGHT, LEFT, RIGHT],
                    [RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT],
                ],
                up: [
                    [UP, UP, UP],
                    [UP, UP, UP],
                    [UP, UP, UP],
                ],
                down: [
                    [DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN],
                    [DOWN, DOWN, DOWN],
                ],
            },
        },
        {
            name: 'algorithm.3x3x3.pll.edges.one.clockwise',
            notation: "R2 U R U R' U' R' U' R' U R'",
            startConfiguration: {
                front: [
                    [FRONT, LEFT, FRONT],
                    [FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT],
                ],
                back: [
                    [BACK, BACK, BACK],
                    [BACK, BACK, BACK],
                    [BACK, BACK, BACK],
                ],
                left: [
                    [LEFT, RIGHT, LEFT],
                    [LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT],
                ],
                right: [
                    [RIGHT, FRONT, RIGHT],
                    [RIGHT, RIGHT, RIGHT],
                    [RIGHT, RIGHT, RIGHT],
                ],
                up: [
                    [UP, UP, UP],
                    [UP, UP, UP],
                    [UP, UP, UP],
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
