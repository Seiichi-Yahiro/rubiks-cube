import { isNumber, range, sample, values } from 'lodash';
import Quaternion from 'quaternion';

export enum Direction {
    CLOCKWISE = 1,
    ANTI_CLOCKWISE = -1
}

export type Slerp = (pct: number) => Quaternion;
type Axis = [number, number, number];

export enum Layer {
    FRONT = 'FRONT',
    BACK = 'BACK',
    UP = 'UP',
    DOWN = 'DOWN',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT'
}

export interface ICube {
    colors: Partial<Layers<string>>;
    translation: Dimensions;
    rotation: Slerp;
    layers: Layer[];
}

export interface Dimensions {
    x: number;
    y: number;
    z: number;
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
}

export const defaultColors: Layers<string> = {
    [Layer.FRONT]: '#383838',
    [Layer.BACK]: '#383838',
    [Layer.UP]: '#383838',
    [Layer.DOWN]: '#383838',
    [Layer.RIGHT]: '#383838',
    [Layer.LEFT]: '#383838'
};

export const generateCubes = (numberOfCubes: number, sizeOfCube: number) => {
    const cubes: ICube[] = [];

    for (let z of range(numberOfCubes)) {
        for (let y of range(numberOfCubes)) {
            for (let x of range(numberOfCubes)) {
                if (![x, y, z].some(dimension => dimension === 0 || dimension === numberOfCubes - 1)) {
                    continue;
                }

                const cube: ICube = {
                    colors: {},
                    translation: {
                        x: x * sizeOfCube - sizeOfCube,
                        y: y * sizeOfCube - sizeOfCube,
                        z: -z * sizeOfCube + sizeOfCube
                    },
                    rotation: () => new Quaternion(),
                    layers: []
                };

                if (z === 0) {
                    cube.colors.FRONT = '#3d81f6';
                    cube.layers.push(Layer.FRONT);
                } else if (z === numberOfCubes - 1) {
                    cube.colors.BACK = '#009d54';
                    cube.layers.push(Layer.BACK);
                }

                if (y === 0) {
                    cube.colors.UP = '#fdcc09';
                    cube.layers.push(Layer.UP);
                } else if (y === numberOfCubes - 1) {
                    cube.colors.DOWN = '#ffffff';
                    cube.layers.push(Layer.DOWN);
                }

                if (x === 0) {
                    cube.colors.LEFT = '#ff6c00';
                    cube.layers.push(Layer.LEFT);
                } else if (x === numberOfCubes - 1) {
                    cube.colors.RIGHT = '#dc422f';
                    cube.layers.push(Layer.RIGHT);
                }

                cubes.push(cube);
            }
        }
    }

    return cubes;
};

const axisCycles = {
    x: [Layer.FRONT, Layer.UP, Layer.BACK, Layer.DOWN],
    y: [Layer.FRONT, Layer.LEFT, Layer.BACK, Layer.RIGHT],
    z: [Layer.UP, Layer.RIGHT, Layer.DOWN, Layer.LEFT]
};

const layerCycles = {
    [Layer.FRONT]: axisCycles.z,
    [Layer.BACK]: axisCycles.z.slice().reverse(),
    [Layer.UP]: axisCycles.y,
    [Layer.DOWN]: axisCycles.y.slice().reverse(),
    [Layer.RIGHT]: axisCycles.x,
    [Layer.LEFT]: axisCycles.x.slice().reverse()
};

const layerToAxis = (layer: Layer): Axis => {
    // All clockwise
    switch (
        layer // tslint:disable-line
    ) {
        case Layer.FRONT:
            return [0, 0, -1];
        case Layer.BACK:
            return [0, 0, 1];
        case Layer.UP:
            return [0, 1, 0];
        case Layer.DOWN:
            return [0, -1, 0];
        case Layer.RIGHT:
            return [-1, 0, 0];
        case Layer.LEFT:
            return [1, 0, 0];
    }
};

const rotateLayers = (cubeLayers: Layer[], layer: Layer, direction: Direction): Layer[] => {
    const cycle = direction === 1 ? layerCycles[layer] : layerCycles[layer].slice().reverse();

    return cubeLayers
        .filter(cubeLayer => cubeLayer !== layer)
        .map(cubeLayer => cycle.indexOf(cubeLayer))
        .map(index => cycle[(index + 1) % cycle.length])
        .concat(layer);
};

const slerp = (currentRotation: Quaternion, layer: Layer, direction: Direction): Slerp => {
    const axis = layerToAxis(layer);
    const angle = (Math.PI / 2) * direction;
    const rotation = Quaternion.fromAxisAngle(axis, angle);
    return currentRotation.slerp(currentRotation.mul(rotation));
};

export const randomLayer = (): Layer => sample(values(Layer)) as Layer;
export const randomDirection = (): Direction => (sample(values(Direction).filter(isNumber)) as unknown) as Direction;

export const rotate = (
    cubes: ICube[],
    layer: Layer = randomLayer(),
    direction: Direction = randomDirection()
): ICube[] =>
    cubes.map(cube => {
        if (!cube.layers.includes(layer)) {
            return cube;
        }

        return {
            ...cube,
            layers: rotateLayers(cube.layers, layer, direction),
            rotation: slerp(cube.rotation(1), layer, direction)
        };
    });
