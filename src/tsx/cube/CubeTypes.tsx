import Quaternion from 'quaternion';
import D3 from './D3';
import Maybe from '../utils/Maybe';

export enum Direction {
    CLOCKWISE = 1,
    ANTI_CLOCKWISE = -1
}

export interface ICube {
    id: D3;
    translation: D3;
    rotation: Quaternion;
    rotationAnimation: Maybe<D3>;
    axes: D3;
    faces: IFace[];
}

export interface IFace {
    side: D3;
    rotation: string;
    color: CubeColors;
    arrowAxes: D3[];
}

export enum Side {
    FRONT = 'FRONT',
    BACK = 'BACK',
    UP = 'UP',
    DOWN = 'DOWN',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT'
}

export enum CubeColors {
    BLUE = '#3d81f6',
    GREEN = '#009d54',
    RED = '#dc422f',
    ORANGE = '#ff6c00',
    WHITE = '#ffffff',
    YELLOW = '#fdcc09',
    DEFAULT = '#383838',
    TRANSPARENT = 'transparent'
}
