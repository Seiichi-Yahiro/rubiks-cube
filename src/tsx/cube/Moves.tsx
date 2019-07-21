import { isNumber, sample, values } from 'lodash';
import { Direction, Layer, IMoveSet } from './CubeTypes';

const randomLayer = (): Layer => sample(values(Layer)) as Layer;
const randomDirection = (): Direction => (sample(values(Direction).filter(isNumber)) as unknown) as Direction;

export const randomMove = (): IMoveSet => [
    {
        layer: randomLayer(),
        direction: randomDirection()
    }
];
