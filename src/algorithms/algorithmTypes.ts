import { CubeColorKey } from 'src/tsx/cube/cubeTypes';

export interface AlgorithmGroup {
    name: string;
    algorithms: Algorithm[];
}

export interface Algorithm {
    name: string;
    notation: string;
    startConfiguration?: StartConfiguration;
    helpArrows?: HelpArrow[];
}

export interface StartConfiguration {
    front: CubeColorKey[][];
    back: CubeColorKey[][];
    left: CubeColorKey[][];
    right: CubeColorKey[][];
    up: CubeColorKey[][];
    down: CubeColorKey[][];
}

export interface HelpArrow {
    from: [number, number];
    to: [number, number];
    doubleEnded?: boolean;
}
