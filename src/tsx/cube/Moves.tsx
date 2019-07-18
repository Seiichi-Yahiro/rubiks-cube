import { isNumber, sample, values } from 'lodash';
import { Direction, Layer, IMoveSet, INamedMove } from './CubeTypes';

const randomLayer = (): Layer => sample(values(Layer)) as Layer;
const randomDirection = (): Direction => (sample(values(Direction).filter(isNumber)) as unknown) as Direction;

export namespace Move {
    export const F: INamedMove = {
        layer: Layer.FRONT,
        direction: Direction.CLOCKWISE,
        name: 'F'
    };

    export const FP: INamedMove = {
        layer: Layer.FRONT,
        direction: Direction.ANTI_CLOCKWISE,
        name: "F'"
    };

    export const B: INamedMove = {
        layer: Layer.BACK,
        direction: Direction.CLOCKWISE,
        name: 'B'
    };

    export const BP: INamedMove = {
        layer: Layer.BACK,
        direction: Direction.ANTI_CLOCKWISE,
        name: "B'"
    };

    export const U: INamedMove = {
        layer: Layer.UP,
        direction: Direction.CLOCKWISE,
        name: 'U'
    };

    export const UP: INamedMove = {
        layer: Layer.UP,
        direction: Direction.ANTI_CLOCKWISE,
        name: "U'"
    };

    export const D: INamedMove = {
        layer: Layer.DOWN,
        direction: Direction.CLOCKWISE,
        name: 'D'
    };

    export const DP: INamedMove = {
        layer: Layer.DOWN,
        direction: Direction.ANTI_CLOCKWISE,
        name: "D'"
    };

    export const L: INamedMove = {
        layer: Layer.LEFT,
        direction: Direction.CLOCKWISE,
        name: 'L'
    };

    export const LP: INamedMove = {
        layer: Layer.LEFT,
        direction: Direction.ANTI_CLOCKWISE,
        name: "L'"
    };

    export const R: INamedMove = {
        layer: Layer.RIGHT,
        direction: Direction.CLOCKWISE,
        name: 'R'
    };

    export const RP: INamedMove = {
        layer: Layer.RIGHT,
        direction: Direction.ANTI_CLOCKWISE,
        name: "R'"
    };
}

export const randomMove = (): IMoveSet => [
    {
        layer: randomLayer(),
        direction: randomDirection()
    }
];
