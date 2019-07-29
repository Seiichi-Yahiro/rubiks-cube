import { CubeColors } from '../CubeTypes';

export interface IAlgorithm {
    name: string;
    children: IAlgorithm[];
    notation?: string;
    startConfiguration?: CubeColors[][];
}
