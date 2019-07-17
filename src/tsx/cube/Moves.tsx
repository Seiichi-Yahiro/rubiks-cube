import { isNumber, sample, values } from 'lodash';
import { Direction, IMove, Layer, IMoveSet } from './CubeTypes';

const randomLayer = (): Layer => sample(values(Layer)) as Layer;
const randomDirection = (): Direction => (sample(values(Direction).filter(isNumber)) as unknown) as Direction;

export namespace Move {
    export const F: IMove = {
        layer: Layer.FRONT,
        direction: Direction.CLOCKWISE
    };

    export const FP: IMove = {
        layer: Layer.FRONT,
        direction: Direction.ANTI_CLOCKWISE
    };

    export const B: IMove = {
        layer: Layer.BACK,
        direction: Direction.CLOCKWISE
    };

    export const BP: IMove = {
        layer: Layer.BACK,
        direction: Direction.ANTI_CLOCKWISE
    };

    export const U: IMove = {
        layer: Layer.UP,
        direction: Direction.CLOCKWISE
    };

    export const UP: IMove = {
        layer: Layer.UP,
        direction: Direction.ANTI_CLOCKWISE
    };

    export const D: IMove = {
        layer: Layer.DOWN,
        direction: Direction.CLOCKWISE
    };

    export const DP: IMove = {
        layer: Layer.DOWN,
        direction: Direction.ANTI_CLOCKWISE
    };

    export const L: IMove = {
        layer: Layer.LEFT,
        direction: Direction.CLOCKWISE
    };

    export const LP: IMove = {
        layer: Layer.LEFT,
        direction: Direction.ANTI_CLOCKWISE
    };

    export const R: IMove = {
        layer: Layer.RIGHT,
        direction: Direction.CLOCKWISE
    };

    export const RP: IMove = {
        layer: Layer.RIGHT,
        direction: Direction.ANTI_CLOCKWISE
    };
}

export namespace MoveSet {
    // @ts-ignore
    const { F, FP, B, BP, U, UP, D, DP, L, LP, R, RP } = Move;

    export const sexy: IMoveSet = [R, U, RP, UP];
}

export const randomMove = (): IMoveSet => [
    {
        layer: randomLayer(),
        direction: randomDirection()
    }
];
