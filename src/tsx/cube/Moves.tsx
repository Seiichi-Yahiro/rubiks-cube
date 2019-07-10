import { Direction, Layer, randomDirection, randomLayer } from './CubeUtils';

export interface Move {
    layer: Layer;
    direction: Direction;
}

export type MoveSet = Array<Move>;

export const random = (): MoveSet => [
    {
        layer: randomLayer(),
        direction: randomDirection()
    }
];

export const sexyMove: MoveSet = [
    {
        layer: Layer.RIGHT,
        direction: Direction.CLOCKWISE
    },
    {
        layer: Layer.UP,
        direction: Direction.CLOCKWISE
    },
    {
        layer: Layer.RIGHT,
        direction: Direction.ANTI_CLOCKWISE
    },
    {
        layer: Layer.UP,
        direction: Direction.ANTI_CLOCKWISE
    }
];
