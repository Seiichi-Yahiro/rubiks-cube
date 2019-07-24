import Quaternion from 'quaternion';
import D3 from './D3';
import Maybe from '../utils/Maybe';

export enum Direction {
    CLOCKWISE = 1,
    ANTI_CLOCKWISE = -1
}

export interface ICube {
    id: D3;
    colors: Partial<IFaces<string>>;
    translation: D3;
    rotation: Quaternion;
    rotationAnimation: Maybe<D3>;
    axes: D3;
    faceArrows: IFaces<Maybe<[D3, D3]>>; // Up and Right Axes
}

export interface IFaces<T> {
    FRONT: T;
    BACK: T;
    UP: T;
    DOWN: T;
    RIGHT: T;
    LEFT: T;
}

export interface IFace {
    rotation: string;
    color: string;
    arrowAxes: Maybe<[D3, D3]>;
}
