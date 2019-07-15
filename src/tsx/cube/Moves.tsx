import { isNumber, sample, values } from 'lodash';
import { Direction, Layer, MoveSet } from './CubeTypes';

export const randomLayer = (): Layer => sample(values(Layer)) as Layer;
export const randomDirection = (): Direction => (sample(values(Direction).filter(isNumber)) as unknown) as Direction;

export const randomMove = (): MoveSet => [
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
