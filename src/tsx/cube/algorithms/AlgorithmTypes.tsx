import { INamedMoveSet } from '../CubeTypes';

export interface IAlgorithm {
    name: string;
    children: IAlgorithm[];
    moves?: INamedMoveSet;
}
