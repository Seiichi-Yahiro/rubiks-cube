import Quaternion from 'quaternion';
import D3 from './D3';
import Maybe from '../utils/Maybe';

export enum Direction {
    CLOCKWISE = 1,
    ANTI_CLOCKWISE = -1
}

export enum Layer {
    FRONT = 'FRONT',
    BACK = 'BACK',
    UP = 'UP',
    DOWN = 'DOWN',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT'
}

export interface ICube {
    id: D3;
    colors: Partial<Layers<string>>;
    translation: D3;
    rotation: Quaternion;
    rotationAnimation: Maybe<D3>;
    axes: D3;
    faceArrows: Layers<Maybe<[D3, D3]>>; // Up and Right Axes
}

export interface Layers<T> {
    [Layer.FRONT]: T;
    [Layer.BACK]: T;
    [Layer.UP]: T;
    [Layer.DOWN]: T;
    [Layer.RIGHT]: T;
    [Layer.LEFT]: T;
}

export interface Face {
    rotation: string;
    color: string;
    arrowAxes: Maybe<[D3, D3]>;
}
