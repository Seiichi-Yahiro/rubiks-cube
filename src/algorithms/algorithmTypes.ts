import { Color } from 'src/tsx/cube/cubeTypes';

export interface AlgorithmGroup {
    name: string;
    algorithms: Algorithm[];
}

export interface Algorithm {
    name: string;
    notation: string;
    startConfiguration?: StartConfiguration;
}

export interface StartConfiguration {
    front: Color[][];
    back: Color[][];
    left: Color[][];
    right: Color[][];
    top: Color[][];
    bottom: Color[][];
}
