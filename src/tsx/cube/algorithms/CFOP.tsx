import { Color } from '../CubeTypes';
import { AlgorithmTree } from './AlgorithmTree';

const { YELLOW, ORANGE, RED, GREEN, BLUE, DEFAULT, TRANSPARENT } = Color;

const Look2CFOP: AlgorithmTree = {
    name: '2 Look CFOP',
    groups: [
        {
            name: 'OLL',
            groups: [
                {
                    name: 'Edges',
                    algorithms: [
                        {
                            name: 'Dot',
                            notation: "F (R U R' U') F' f (R U R' U') f'",
                            startConfiguration: [
                                [
                                    TRANSPARENT,
                                    TRANSPARENT,
                                    TRANSPARENT,
                                    TRANSPARENT,
                                    TRANSPARENT,
                                ],
                                [
                                    TRANSPARENT,
                                    DEFAULT,
                                    DEFAULT,
                                    DEFAULT,
                                    TRANSPARENT,
                                ],
                                [
                                    TRANSPARENT,
                                    DEFAULT,
                                    YELLOW,
                                    DEFAULT,
                                    TRANSPARENT,
                                ],
                                [
                                    TRANSPARENT,
                                    DEFAULT,
                                    DEFAULT,
                                    DEFAULT,
                                    TRANSPARENT,
                                ],
                                [
                                    TRANSPARENT,
                                    TRANSPARENT,
                                    TRANSPARENT,
                                    TRANSPARENT,
                                    TRANSPARENT,
                                ],
                            ],
                        },
                        {
                            name: 'L',
                            notation: "f (R U R' U') f'",
                            startConfiguration: [
                                [
                                    TRANSPARENT,
                                    TRANSPARENT,
                                    TRANSPARENT,
                                    TRANSPARENT,
                                    TRANSPARENT,
                                ],
                                [
                                    TRANSPARENT,
                                    DEFAULT,
                                    DEFAULT,
                                    DEFAULT,
                                    TRANSPARENT,
                                ],
                                [
                                    TRANSPARENT,
                                    DEFAULT,
                                    YELLOW,
                                    YELLOW,
                                    TRANSPARENT,
                                ],
                                [
                                    TRANSPARENT,
                                    DEFAULT,
                                    YELLOW,
                                    DEFAULT,
                                    TRANSPARENT,
                                ],
                                [
                                    TRANSPARENT,
                                    TRANSPARENT,
                                    TRANSPARENT,
                                    TRANSPARENT,
                                    TRANSPARENT,
                                ],
                            ],
                        },
                        {
                            name: 'Line',
                            notation: "F (R U R' U') F'",
                            startConfiguration: [
                                [
                                    TRANSPARENT,
                                    TRANSPARENT,
                                    TRANSPARENT,
                                    TRANSPARENT,
                                    TRANSPARENT,
                                ],
                                [
                                    TRANSPARENT,
                                    DEFAULT,
                                    DEFAULT,
                                    DEFAULT,
                                    TRANSPARENT,
                                ],
                                [
                                    TRANSPARENT,
                                    YELLOW,
                                    YELLOW,
                                    YELLOW,
                                    TRANSPARENT,
                                ],
                                [
                                    TRANSPARENT,
                                    DEFAULT,
                                    DEFAULT,
                                    DEFAULT,
                                    TRANSPARENT,
                                ],
                                [
                                    TRANSPARENT,
                                    TRANSPARENT,
                                    TRANSPARENT,
                                    TRANSPARENT,
                                    TRANSPARENT,
                                ],
                            ],
                        },
                    ],
                },
                {
                    name: 'Corners',
                    groups: [
                        {
                            name: 'No Corners solved',
                            algorithms: [
                                {
                                    name: 'H',
                                    notation: "F (R U R' U')3 F'",
                                    startConfiguration: [
                                        [
                                            TRANSPARENT,
                                            YELLOW,
                                            TRANSPARENT,
                                            YELLOW,
                                            TRANSPARENT,
                                        ],
                                        [
                                            TRANSPARENT,
                                            DEFAULT,
                                            YELLOW,
                                            DEFAULT,
                                            TRANSPARENT,
                                        ],
                                        [
                                            TRANSPARENT,
                                            YELLOW,
                                            YELLOW,
                                            YELLOW,
                                            TRANSPARENT,
                                        ],
                                        [
                                            TRANSPARENT,
                                            DEFAULT,
                                            YELLOW,
                                            DEFAULT,
                                            TRANSPARENT,
                                        ],
                                        [
                                            TRANSPARENT,
                                            YELLOW,
                                            TRANSPARENT,
                                            YELLOW,
                                            TRANSPARENT,
                                        ],
                                    ],
                                },
                                {
                                    name: 'Pi',
                                    notation: "R U2 (R2 U' R2 U' R2) U2 R",
                                    startConfiguration: [
                                        [
                                            TRANSPARENT,
                                            TRANSPARENT,
                                            TRANSPARENT,
                                            YELLOW,
                                            TRANSPARENT,
                                        ],
                                        [
                                            YELLOW,
                                            DEFAULT,
                                            YELLOW,
                                            DEFAULT,
                                            TRANSPARENT,
                                        ],
                                        [
                                            TRANSPARENT,
                                            YELLOW,
                                            YELLOW,
                                            YELLOW,
                                            TRANSPARENT,
                                        ],
                                        [
                                            YELLOW,
                                            DEFAULT,
                                            YELLOW,
                                            DEFAULT,
                                            TRANSPARENT,
                                        ],
                                        [
                                            TRANSPARENT,
                                            TRANSPARENT,
                                            TRANSPARENT,
                                            YELLOW,
                                            TRANSPARENT,
                                        ],
                                    ],
                                },
                            ],
                        },
                        {
                            name: '1 Corner solved',
                            algorithms: [
                                {
                                    name: 'Sune',
                                    notation: "R U R' U R U2 R'",
                                    startConfiguration: [
                                        [
                                            TRANSPARENT,
                                            YELLOW,
                                            TRANSPARENT,
                                            TRANSPARENT,
                                            TRANSPARENT,
                                        ],
                                        [
                                            TRANSPARENT,
                                            DEFAULT,
                                            YELLOW,
                                            DEFAULT,
                                            YELLOW,
                                        ],
                                        [
                                            TRANSPARENT,
                                            YELLOW,
                                            YELLOW,
                                            YELLOW,
                                            TRANSPARENT,
                                        ],
                                        [
                                            TRANSPARENT,
                                            YELLOW,
                                            YELLOW,
                                            DEFAULT,
                                            TRANSPARENT,
                                        ],
                                        [
                                            TRANSPARENT,
                                            TRANSPARENT,
                                            TRANSPARENT,
                                            YELLOW,
                                            TRANSPARENT,
                                        ],
                                    ],
                                },
                                {
                                    name: 'Anti-Sune',
                                    notation: "L' U' L U' L' U2 L",
                                    startConfiguration: [
                                        [
                                            TRANSPARENT,
                                            TRANSPARENT,
                                            TRANSPARENT,
                                            YELLOW,
                                            TRANSPARENT,
                                        ],
                                        [
                                            YELLOW,
                                            DEFAULT,
                                            YELLOW,
                                            DEFAULT,
                                            TRANSPARENT,
                                        ],
                                        [
                                            TRANSPARENT,
                                            YELLOW,
                                            YELLOW,
                                            YELLOW,
                                            TRANSPARENT,
                                        ],
                                        [
                                            TRANSPARENT,
                                            DEFAULT,
                                            YELLOW,
                                            YELLOW,
                                            TRANSPARENT,
                                        ],
                                        [
                                            TRANSPARENT,
                                            YELLOW,
                                            TRANSPARENT,
                                            TRANSPARENT,
                                            TRANSPARENT,
                                        ],
                                    ],
                                },
                            ],
                        },
                        {
                            name: '2 Corners solved',
                            algorithms: [
                                {
                                    name: 'L',
                                    notation: "x (R' U R D') (R' U' R D) x'",
                                    startConfiguration: [
                                        [
                                            TRANSPARENT,
                                            TRANSPARENT,
                                            TRANSPARENT,
                                            TRANSPARENT,
                                            TRANSPARENT,
                                        ],
                                        [
                                            TRANSPARENT,
                                            YELLOW,
                                            YELLOW,
                                            DEFAULT,
                                            YELLOW,
                                        ],
                                        [
                                            TRANSPARENT,
                                            YELLOW,
                                            YELLOW,
                                            YELLOW,
                                            TRANSPARENT,
                                        ],
                                        [
                                            TRANSPARENT,
                                            DEFAULT,
                                            YELLOW,
                                            YELLOW,
                                            TRANSPARENT,
                                        ],
                                        [
                                            TRANSPARENT,
                                            YELLOW,
                                            TRANSPARENT,
                                            TRANSPARENT,
                                            TRANSPARENT,
                                        ],
                                    ],
                                },
                                {
                                    name: 'T',
                                    notation: "x (L U R' U') (L' U R U') x'",
                                    startConfiguration: [
                                        [
                                            TRANSPARENT,
                                            YELLOW,
                                            TRANSPARENT,
                                            TRANSPARENT,
                                            TRANSPARENT,
                                        ],
                                        [
                                            TRANSPARENT,
                                            DEFAULT,
                                            YELLOW,
                                            YELLOW,
                                            TRANSPARENT,
                                        ],
                                        [
                                            TRANSPARENT,
                                            YELLOW,
                                            YELLOW,
                                            YELLOW,
                                            TRANSPARENT,
                                        ],
                                        [
                                            TRANSPARENT,
                                            DEFAULT,
                                            YELLOW,
                                            YELLOW,
                                            TRANSPARENT,
                                        ],
                                        [
                                            TRANSPARENT,
                                            YELLOW,
                                            TRANSPARENT,
                                            TRANSPARENT,
                                            TRANSPARENT,
                                        ],
                                    ],
                                },
                                {
                                    name: 'U',
                                    notation: "R2 D R' U2 R D' R' U2 R'",
                                    startConfiguration: [
                                        [
                                            TRANSPARENT,
                                            TRANSPARENT,
                                            TRANSPARENT,
                                            TRANSPARENT,
                                            TRANSPARENT,
                                        ],
                                        [
                                            TRANSPARENT,
                                            YELLOW,
                                            YELLOW,
                                            YELLOW,
                                            TRANSPARENT,
                                        ],
                                        [
                                            TRANSPARENT,
                                            YELLOW,
                                            YELLOW,
                                            YELLOW,
                                            TRANSPARENT,
                                        ],
                                        [
                                            TRANSPARENT,
                                            DEFAULT,
                                            YELLOW,
                                            DEFAULT,
                                            TRANSPARENT,
                                        ],
                                        [
                                            TRANSPARENT,
                                            YELLOW,
                                            TRANSPARENT,
                                            YELLOW,
                                            TRANSPARENT,
                                        ],
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'Parity',
                    algorithms: [
                        {
                            name: 'Edge flipped',
                            notation:
                                "(2R2 B2 U2) (2L U2) (2R' U2) (2R U2) (F2 2R F2) (2L' B2 2R2)",
                            startConfiguration: [
                                [
                                    TRANSPARENT,
                                    TRANSPARENT,
                                    TRANSPARENT,
                                    TRANSPARENT,
                                    TRANSPARENT,
                                    TRANSPARENT,
                                ],
                                [
                                    TRANSPARENT,
                                    YELLOW,
                                    YELLOW,
                                    YELLOW,
                                    YELLOW,
                                    TRANSPARENT,
                                ],
                                [
                                    TRANSPARENT,
                                    YELLOW,
                                    YELLOW,
                                    YELLOW,
                                    YELLOW,
                                    TRANSPARENT,
                                ],
                                [
                                    TRANSPARENT,
                                    YELLOW,
                                    YELLOW,
                                    YELLOW,
                                    YELLOW,
                                    TRANSPARENT,
                                ],
                                [
                                    TRANSPARENT,
                                    YELLOW,
                                    DEFAULT,
                                    DEFAULT,
                                    YELLOW,
                                    TRANSPARENT,
                                ],
                                [
                                    TRANSPARENT,
                                    TRANSPARENT,
                                    YELLOW,
                                    YELLOW,
                                    TRANSPARENT,
                                    TRANSPARENT,
                                ],
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: 'PLL',
            groups: [
                {
                    name: 'Corners',
                    algorithms: [
                        {
                            name: 'Diagonal',
                            notation:
                                "(F R U' R' U' R U R' F') (R U R' U' R' F R F')",
                            startConfiguration: [
                                [
                                    TRANSPARENT,
                                    DEFAULT,
                                    TRANSPARENT,
                                    DEFAULT,
                                    TRANSPARENT,
                                ],
                                [DEFAULT, YELLOW, YELLOW, YELLOW, DEFAULT],
                                [
                                    TRANSPARENT,
                                    YELLOW,
                                    YELLOW,
                                    YELLOW,
                                    TRANSPARENT,
                                ],
                                [DEFAULT, YELLOW, YELLOW, YELLOW, DEFAULT],
                                [
                                    TRANSPARENT,
                                    DEFAULT,
                                    TRANSPARENT,
                                    DEFAULT,
                                    TRANSPARENT,
                                ],
                            ],
                        },
                        {
                            name: 'Adjacent',
                            notation:
                                "(R U R' U' R' F) R2 (U' R' U' R U R' F')",
                            startConfiguration: [
                                [
                                    TRANSPARENT,
                                    DEFAULT,
                                    TRANSPARENT,
                                    DEFAULT,
                                    TRANSPARENT,
                                ],
                                [ORANGE, YELLOW, YELLOW, YELLOW, DEFAULT],
                                [
                                    TRANSPARENT,
                                    YELLOW,
                                    YELLOW,
                                    YELLOW,
                                    TRANSPARENT,
                                ],
                                [ORANGE, YELLOW, YELLOW, YELLOW, DEFAULT],
                                [
                                    TRANSPARENT,
                                    DEFAULT,
                                    TRANSPARENT,
                                    DEFAULT,
                                    TRANSPARENT,
                                ],
                            ],
                        },
                    ],
                },
                {
                    name: 'Edges',
                    groups: [
                        {
                            name: '3 Edges',
                            algorithms: [
                                {
                                    name: 'Right to Left',
                                    notation: "R U' R U R U R U' R' U' R2",
                                    startConfiguration: [
                                        [
                                            TRANSPARENT,
                                            GREEN,
                                            GREEN,
                                            GREEN,
                                            TRANSPARENT,
                                        ],
                                        [
                                            ORANGE,
                                            YELLOW,
                                            YELLOW,
                                            YELLOW,
                                            TRANSPARENT,
                                        ],
                                        [
                                            DEFAULT,
                                            YELLOW,
                                            YELLOW,
                                            YELLOW,
                                            ORANGE,
                                        ],
                                        [
                                            ORANGE,
                                            YELLOW,
                                            YELLOW,
                                            YELLOW,
                                            TRANSPARENT,
                                        ],
                                        [
                                            TRANSPARENT,
                                            BLUE,
                                            DEFAULT,
                                            BLUE,
                                            TRANSPARENT,
                                        ],
                                    ],
                                },
                                {
                                    name: 'Left to Right',
                                    notation: "R2 U R U R' U' R' U' R' U R'",
                                    startConfiguration: [
                                        [
                                            TRANSPARENT,
                                            GREEN,
                                            GREEN,
                                            GREEN,
                                            TRANSPARENT,
                                        ],
                                        [
                                            TRANSPARENT,
                                            YELLOW,
                                            YELLOW,
                                            YELLOW,
                                            RED,
                                        ],
                                        [RED, YELLOW, YELLOW, YELLOW, DEFAULT],
                                        [
                                            TRANSPARENT,
                                            YELLOW,
                                            YELLOW,
                                            YELLOW,
                                            RED,
                                        ],
                                        [
                                            TRANSPARENT,
                                            BLUE,
                                            DEFAULT,
                                            BLUE,
                                            TRANSPARENT,
                                        ],
                                    ],
                                },
                            ],
                        },
                        {
                            name: '4 Edges',
                            algorithms: [
                                {
                                    name: 'Cross',
                                    notation: "M2 U' M2 U2 M2 U' M2",
                                    startConfiguration: [
                                        [
                                            TRANSPARENT,
                                            GREEN,
                                            BLUE,
                                            GREEN,
                                            TRANSPARENT,
                                        ],
                                        [ORANGE, YELLOW, YELLOW, YELLOW, RED],
                                        [RED, YELLOW, YELLOW, YELLOW, ORANGE],
                                        [ORANGE, YELLOW, YELLOW, YELLOW, RED],
                                        [
                                            TRANSPARENT,
                                            BLUE,
                                            GREEN,
                                            BLUE,
                                            TRANSPARENT,
                                        ],
                                    ],
                                },
                                {
                                    name: 'Diagonal',
                                    notation: "M' U' M2 U' M2 U' M' U2 M2",
                                    startConfiguration: [
                                        [
                                            TRANSPARENT,
                                            GREEN,
                                            ORANGE,
                                            GREEN,
                                            TRANSPARENT,
                                        ],
                                        [ORANGE, YELLOW, YELLOW, YELLOW, RED],
                                        [GREEN, YELLOW, YELLOW, YELLOW, BLUE],
                                        [ORANGE, YELLOW, YELLOW, YELLOW, RED],
                                        [
                                            TRANSPARENT,
                                            BLUE,
                                            RED,
                                            BLUE,
                                            TRANSPARENT,
                                        ],
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'Parity',
                    algorithms: [
                        {
                            name: 'Corners / Edges swapped',
                            notation: '2R2 U2 2R2 u2 2R2 2U2',
                            startConfiguration: [
                                [
                                    TRANSPARENT,
                                    GREEN,
                                    BLUE,
                                    BLUE,
                                    GREEN,
                                    TRANSPARENT,
                                ],
                                [
                                    TRANSPARENT,
                                    YELLOW,
                                    YELLOW,
                                    YELLOW,
                                    YELLOW,
                                    TRANSPARENT,
                                ],
                                [
                                    TRANSPARENT,
                                    YELLOW,
                                    YELLOW,
                                    YELLOW,
                                    YELLOW,
                                    TRANSPARENT,
                                ],
                                [
                                    TRANSPARENT,
                                    YELLOW,
                                    YELLOW,
                                    YELLOW,
                                    YELLOW,
                                    TRANSPARENT,
                                ],
                                [
                                    TRANSPARENT,
                                    YELLOW,
                                    YELLOW,
                                    YELLOW,
                                    YELLOW,
                                    TRANSPARENT,
                                ],
                                [
                                    TRANSPARENT,
                                    BLUE,
                                    GREEN,
                                    GREEN,
                                    BLUE,
                                    TRANSPARENT,
                                ],
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};

export default Look2CFOP;
