import { flow, mapValues, range } from 'lodash';
import Quaternion from 'quaternion';
import { ICube, IFaces } from './CubeTypes';
import D3, { D3Group } from './D3';
import Maybe from '../utils/Maybe';

export const cubeIsTransitioning = 'cube--is-transitioning';

export function createLayers<T>(initialValue: T): IFaces<T> {
    const initialLayers = {
        FRONT: undefined,
        BACK: undefined,
        UP: undefined,
        DOWN: undefined,
        RIGHT: undefined,
        LEFT: undefined
    } as IFaces<undefined>;

    return mapValues(initialLayers, () => initialValue);
}

export const defaultColors: IFaces<string> = createLayers('#383838');

export const calculateCubePosition = (d3: D3, numberOfCubes: number, sizeOfCube: number): D3 => {
    const offset = sizeOfCube * (numberOfCubes / 2 - 0.5);
    const [x, y, z] = d3.sub(1).toVector();

    return d3
        .clone()
        .setX(x * sizeOfCube - offset)
        .setY(y * sizeOfCube - offset)
        .setZ(-z * sizeOfCube + offset);
};

export const generateCubes = (numberOfCubes: number, sizeOfCube: number) => {
    const cubes: ICube[] = [];

    const indexes = range(1, numberOfCubes + 1);

    for (const z of indexes) {
        for (const y of indexes) {
            for (const x of indexes) {
                if (![x, y, z].some(dimension => dimension === 1 || dimension === numberOfCubes)) {
                    continue;
                }

                const axes = new D3(x, y, z);

                const cube: ICube = {
                    id: axes.clone(),
                    colors: {},
                    translation: calculateCubePosition(axes, numberOfCubes, sizeOfCube),
                    rotation: new Quaternion(),
                    axes,
                    faceArrows: createLayers(Maybe.none<[D3, D3]>()),
                    rotationAnimation: Maybe.none()
                };

                if (z === 1) {
                    cube.colors.FRONT = '#3d81f6';
                    cube.faceArrows.FRONT = Maybe.some([new D3().setX(-x), new D3().setY(-y)]);
                } else if (z === numberOfCubes) {
                    cube.colors.BACK = '#009d54';
                    cube.faceArrows.BACK = Maybe.some([new D3().setX(x), new D3().setY(-y)]);
                }

                if (y === 1) {
                    cube.colors.UP = '#fdcc09';
                    cube.faceArrows.UP = Maybe.some([new D3().setX(-x), new D3().setZ(-z)]);
                } else if (y === numberOfCubes) {
                    cube.colors.DOWN = '#ffffff';
                    cube.faceArrows.DOWN = Maybe.some([new D3().setX(-x), new D3().setZ(z)]);
                }

                if (x === 1) {
                    cube.colors.LEFT = '#ff6c00';
                    cube.faceArrows.LEFT = Maybe.some([new D3().setZ(-z), new D3().setY(-y)]);
                } else if (x === numberOfCubes) {
                    cube.colors.RIGHT = '#dc422f';
                    cube.faceArrows.RIGHT = Maybe.some([new D3().setZ(z), new D3().setY(-y)]);
                }

                cubes.push(cube);
            }
        }
    }

    return cubes;
};

const degree90 = Math.PI / 2;
export const rotate = (cubes: ICube[], numberOfCubes: number, rotationAxes: D3Group): ICube[] => {
    const translation = numberOfCubes / 2 + 0.5;

    const multiAxisRotation: (cube: ICube) => ICube = flow(
        ...rotationAxes.map(rotationAxis => {
            // TODO find out why this is necessary to rotate the axes correctly on z rotations
            const axesRotation = rotationAxis.z !== 0 ? rotationAxis.invert() : rotationAxis;
            return rotateAxis(rotationAxis, axesRotation, translation);
        })
    );

    return cubes.map(multiAxisRotation);
};

const rotateAxis = (rotationAxis: D3, axesRotation: D3, translation: number) => (cube: ICube): ICube => {
    if (!cube.axes.hasMatchingAxis(rotationAxis)) {
        return cube;
    }

    const newAxes = cube.axes
        .sub(translation)
        .rotate(axesRotation, degree90)
        .add(translation)
        .map(Math.round);

    const newFaceArrows = mapValues(cube.faceArrows, maybeArrowRotations =>
        maybeArrowRotations.let(
            arrowRotations =>
                arrowRotations.map(arrowRotation =>
                    arrowRotation
                        .unit()
                        .rotate(rotationAxis.invert(), degree90)
                        .map(Math.round)
                        .mul(newAxes)
                ) as [D3, D3]
        )
    );

    return {
        ...cube,
        axes: newAxes,
        rotation: cube.rotation.mul(rotationAxis.toQuaternion(degree90)),
        faceArrows: newFaceArrows,
        rotationAnimation: Maybe.none()
    };
};

export const animateRotation = (cubes: ICube[], rotationAxes: D3Group): ICube[] => {
    const multiAxisRotation: (cube: ICube) => ICube = flow(
        ...rotationAxes.map(rotationAxis => animateRotationAxis(rotationAxis))
    );
    return cubes.map(multiAxisRotation);
};

const animateRotationAxis = (rotationAxis: D3) => (cube: ICube): ICube => {
    if (!cube.axes.hasMatchingAxis(rotationAxis)) {
        return cube;
    }

    const rotationAnimation = cube.rotation
        .rotateVector(
            rotationAxis
                .unit()
                .invert()
                .toVector()
        )
        .map(Math.round);

    return {
        ...cube,
        rotationAnimation: Maybe.some(new D3(...rotationAnimation))
    };
};

// const calculateNumberOfCubes = (cubes: number): number => (12 + Math.sqrt(144 - 24 * (8 - cubes))) / 12;
