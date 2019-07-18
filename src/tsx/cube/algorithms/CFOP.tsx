import { Move } from '../Moves';
import { IAlgorithm } from './AlgorithmTypes';

// @ts-ignore
const { F, FP, B, BP, U, UP, D, DP, L, LP, R, RP } = Move;

const Look2CFOP: IAlgorithm = {
    name: '2 Look CFOP',
    children: [
        {
            name: 'OLL',
            children: [
                {
                    name: 'Edges',
                    children: [
                        {
                            name: 'Dot',
                            children: []
                        },
                        {
                            name: 'L',
                            children: []
                        },
                        {
                            name: 'Line',
                            children: [],
                            moves: []
                        }
                    ]
                },
                {
                    name: 'No Corners solved',
                    children: [
                        {
                            name: 'H',
                            children: [],
                            moves: []
                        },
                        {
                            name: 'Pi',
                            children: [],
                            moves: []
                        }
                    ]
                },
                {
                    name: '1 Corner solved',
                    children: [
                        {
                            name: 'Sune',
                            children: []
                        },
                        {
                            name: 'Anti-Sune',
                            children: []
                        }
                    ]
                },
                {
                    name: '2 Corners solved',
                    children: [
                        {
                            name: 'L',
                            children: []
                        },
                        {
                            name: 'T',
                            children: []
                        },
                        {
                            name: 'U',
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            name: 'PLL',
            children: [
                {
                    name: 'Corners',
                    children: [
                        {
                            name: 'Diagonal',
                            children: []
                        },
                        {
                            name: 'Adjacent',
                            children: []
                        }
                    ]
                },
                {
                    name: 'Edges',
                    children: [
                        {
                            name: '3 Edges',
                            children: [
                                {
                                    name: 'Right to Left',
                                    children: []
                                },
                                {
                                    name: 'Left to Right',
                                    children: []
                                }
                            ]
                        },
                        {
                            name: '4 Edges',
                            children: [
                                {
                                    name: 'Cross',
                                    children: []
                                },
                                {
                                    name: 'Diagonal',
                                    children: []
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

export default Look2CFOP;

/*
Edges:
Dot: F (R U R' U') F' f (R U R' U') f'
L shape: f (R U R' U') f'
Line: F (R U R' U') F'

No corners solved:
H: F (R U R' U')3 F'
Pi: R U2 (R2 U' R2 U' R2) U2 R

1 corner solved:
Sune: R U R' U R U2 R'
Antisune: L' U' L U' L' U2 L

2 corners solved:
L: x (R' U R D') (R' U' R D) [x means face the bottom]
T: x (L U R' U') (L' U R U') [x means face the bottom]
U: R2 D R' U2 R D' R' U2 R'




Diagonal Corner Swap:
(F R U' R' U' R U R' F') (R U R' U' R' F R F')
Adjacent Corner Swap:
(R U R' U' R' F) R2 (U' R' U' R U R' F')

3-Edges:
1. R U' R U R U R U' R' U' R2
2. R2 U R U R' U' R' U' R' U R'

4-Edges:
1. M2 U' M2 U2 M2 U' M2
2. M' U' M2 U' M2 U' M' U2 M2 (M' goes upwards)

*/
