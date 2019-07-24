import { IAlgorithm } from './AlgorithmTypes';

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
                            children: [],
                            notation: "F (R U R' U') F' f (R U R' U') f'"
                        },
                        {
                            name: 'L',
                            children: [],
                            notation: "f (R U R' U') f'"
                        },
                        {
                            name: 'Line',
                            children: [],
                            notation: "F (R U R' U') F'"
                        }
                    ]
                },
                {
                    name: 'No Corners solved',
                    children: [
                        {
                            name: 'H',
                            children: [],
                            notation: "F (R U R' U')3 F'"
                        },
                        {
                            name: 'Pi',
                            children: [],
                            notation: "R U2 (R2 U' R2 U' R2) U2 R"
                        }
                    ]
                },
                {
                    name: '1 Corner solved',
                    children: [
                        {
                            name: 'Sune',
                            children: [],
                            notation: "R U R' U R U2 R'"
                        },
                        {
                            name: 'Anti-Sune',
                            children: [],
                            notation: "L' U' L U' L' U2 L"
                        }
                    ]
                },
                {
                    name: '2 Corners solved',
                    children: [
                        {
                            name: 'L',
                            children: [],
                            notation: "x (R' U R D') (R' U' R D) x'"
                        },
                        {
                            name: 'T',
                            children: [],
                            notation: "x (L U R' U') (L' U R U') x'"
                        },
                        {
                            name: 'U',
                            children: [],
                            notation: "R2 D R' U2 R D' R' U2 R'"
                        }
                    ]
                },
                {
                    name: 'Parity',
                    children: [
                        {
                            name: 'Edge flipped',
                            children: [],
                            notation: "(2R2 B2 U2) (2L U2) (2R' U2) (2R U2) (F2 2R F2) (2L' B2 2R2)"
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
                            children: [],
                            notation: "(F R U' R' U' R U R' F') (R U R' U' R' F R F')"
                        },
                        {
                            name: 'Adjacent',
                            children: [],
                            notation: "(R U R' U' R' F) R2 (U' R' U' R U R' F')"
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
                                    children: [],
                                    notation: "R U' R U R U R U' R' U' R2"
                                },
                                {
                                    name: 'Left to Right',
                                    children: [],
                                    notation: "R2 U R U R' U' R' U' R' U R'"
                                }
                            ]
                        },
                        {
                            name: '4 Edges',
                            children: [
                                {
                                    name: 'Cross',
                                    children: [],
                                    notation: "M2 U' M2 U2 M2 U' M2"
                                },
                                {
                                    name: 'Diagonal',
                                    children: [],
                                    notation: "M' U' M2 U' M2 U' M' U2 M2"
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'Parity',
                    children: [
                        {
                            name: 'Corners / Edges swapped',
                            children: [],
                            notation: '2R2 U2 2R2 u2 2R2 2U2'
                        }
                    ]
                }
            ]
        }
    ]
};

export default Look2CFOP;
