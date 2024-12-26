import type { AlgorithmGroup } from 'src/algorithms/algorithmTypes';
import { CubeColorKey } from 'src/tsx/cube/cubeTypes';

const { FRONT, BACK, LEFT, RIGHT, UP, DOWN, UNKNOWN } = CubeColorKey;

export const pllOneCorner: AlgorithmGroup = {
    name: 'algorithm.3x3x3.pll.corners.two.title',
    algorithms: [
        {
            name: 'algorithm.3x3x3.pll.corners.two.diagonal',
            notation: "(F R U' R' U' R U R' F') (R U R' U' R' F R F')",
            startConfiguration: {
                front: [
                    [FRONT, UNKNOWN, BACK],
                    [FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT],
                ],
                back: [
                    [BACK, UNKNOWN, FRONT],
                    [BACK, BACK, BACK],
                    [BACK, BACK, BACK],
                ],
                left: [
                    [RIGHT, UNKNOWN, LEFT],
                    [LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT],
                ],
                right: [
                    [LEFT, UNKNOWN, RIGHT],
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
            helpArrows: [{ from: [0, 0], to: [2, 2], doubleEnded: true }],
        },
        {
            name: 'algorithm.3x3x3.pll.corners.two.adjacent',
            notation: "(R U R' U' R' F) R2 (U' R' U' R U R' F')",
            startConfiguration: {
                front: [
                    [FRONT, UNKNOWN, RIGHT],
                    [FRONT, FRONT, FRONT],
                    [FRONT, FRONT, FRONT],
                ],
                back: [
                    [RIGHT, UNKNOWN, BACK],
                    [BACK, BACK, BACK],
                    [BACK, BACK, BACK],
                ],
                left: [
                    [LEFT, UNKNOWN, LEFT],
                    [LEFT, LEFT, LEFT],
                    [LEFT, LEFT, LEFT],
                ],
                right: [
                    [BACK, UNKNOWN, FRONT],
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
            helpArrows: [{ from: [2, 0], to: [2, 2], doubleEnded: true }],
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
            helpArrows: [
                { from: [1, 0], to: [1, 2], doubleEnded: true },
                { from: [0, 1], to: [2, 1], doubleEnded: true },
            ],
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
            helpArrows: [
                { from: [0, 1], to: [1, 0], doubleEnded: true },
                { from: [1, 2], to: [2, 1], doubleEnded: true },
            ],
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
            helpArrows: [
                { from: [0, 1], to: [1, 2] },
                { from: [1, 2], to: [2, 1] },
                { from: [2, 1], to: [0, 1] },
            ],
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
            helpArrows: [
                { from: [1, 2], to: [0, 1] },
                { from: [2, 1], to: [1, 2] },
                { from: [0, 1], to: [2, 1] },
            ],
        },
    ],
};
