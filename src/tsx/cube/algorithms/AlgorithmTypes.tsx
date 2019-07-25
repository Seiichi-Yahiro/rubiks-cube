import { CubeColors } from '../CubeUtils';

export interface IAlgorithm {
    name: string;
    children: IAlgorithm[];
    notation?: string;
    startConfiguration?: CubeColors[][];
}
