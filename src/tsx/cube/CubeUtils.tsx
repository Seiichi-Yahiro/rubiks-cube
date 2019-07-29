import { flow, range } from 'lodash';
import Quaternion from 'quaternion';
import { CubeColors, ICube, Side } from './CubeTypes';
import D3, { D3Group } from './D3';
import Maybe from '../utils/Maybe';

export const cubeIsTransitioning = 'cube--is-transitioning';

export const calculateCubePosition = (d3: D3, numberOfCubes: number, sizeOfCube: number): D3 => {
    const offset = sizeOfCube * (numberOfCubes / 2 - 0.5);
    const [x, y, z] = d3.sub(1).toVector();

    return d3
        .clone()
        .setX(x * sizeOfCube - offset)
        .setY(y * sizeOfCube - offset)
        .setZ(-z * sizeOfCube + offset);
};

const getFaceRotations = (sizeOfCube: number) => {
    const halfCubeSize = sizeOfCube / 2;

    return new Map([
        [Side.FRONT, `translateZ(${halfCubeSize}px)`],
        [Side.BACK, `rotateY(180deg) translateZ(${halfCubeSize}px)`],
        [Side.UP, `rotateX(90deg) translateZ(${halfCubeSize}px)`],
        [Side.DOWN, `rotateX(-90deg) translateZ(${halfCubeSize}px)`],
        [Side.LEFT, `rotateY(-90deg) translateZ(${halfCubeSize}px)`],
        [Side.RIGHT, `rotateY(90deg) translateZ(${halfCubeSize}px)`]
    ]);
};

export const generateCubes = (numberOfCubes: number, sizeOfCube: number) => {
    const cubes: ICube[] = [];

    const halfNumberOfCubes = Math.floor(numberOfCubes / 2);
    const indexes = range(1, numberOfCubes + 1);

    for (const z of indexes) {
        for (const y of indexes) {
            for (const x of indexes) {
                if (![x, y, z].some(dimension => dimension === 1 || dimension === numberOfCubes)) {
                    continue;
                }

                const faceRotations = getFaceRotations(sizeOfCube);

                const axes = new D3(x, y, z);

                const cube: ICube = {
                    id: axes.clone(),
                    faces: [],
                    translation: calculateCubePosition(axes, numberOfCubes, sizeOfCube),
                    rotation: new Quaternion(),
                    axes,
                    rotationAnimation: Maybe.none()
                };

                if (z === 1) {
                    cube.faces.push({
                        side: new D3().setZ(-halfNumberOfCubes),
                        rotation: faceRotations.get(Side.FRONT)!,
                        color: CubeColors.BLUE,
                        arrowAxes: [new D3().setX(-x), new D3().setY(-y)]
                    });

                    faceRotations.delete(Side.FRONT);
                } else if (z === numberOfCubes) {
                    cube.faces.push({
                        side: new D3().setZ(halfNumberOfCubes),
                        rotation: faceRotations.get(Side.BACK)!,
                        color: CubeColors.GREEN,
                        arrowAxes: [new D3().setX(x), new D3().setY(-y)]
                    });

                    faceRotations.delete(Side.BACK);
                }

                if (y === 1) {
                    cube.faces.push({
                        side: new D3().setY(-halfNumberOfCubes),
                        rotation: faceRotations.get(Side.UP)!,
                        color: CubeColors.YELLOW,
                        arrowAxes: [new D3().setX(-x), new D3().setZ(-z)]
                    });

                    faceRotations.delete(Side.UP);
                } else if (y === numberOfCubes) {
                    cube.faces.push({
                        side: new D3().setY(halfNumberOfCubes),
                        rotation: faceRotations.get(Side.DOWN)!,
                        color: CubeColors.WHITE,
                        arrowAxes: [new D3().setX(-x), new D3().setZ(z)]
                    });

                    faceRotations.delete(Side.DOWN);
                }

                if (x === 1) {
                    cube.faces.push({
                        side: new D3().setX(-halfNumberOfCubes),
                        rotation: faceRotations.get(Side.LEFT)!,
                        color: CubeColors.ORANGE,
                        arrowAxes: [new D3().setZ(-z), new D3().setY(-y)]
                    });

                    faceRotations.delete(Side.LEFT);
                } else if (x === numberOfCubes) {
                    cube.faces.push({
                        side: new D3().setX(halfNumberOfCubes),
                        rotation: faceRotations.get(Side.RIGHT)!,
                        color: CubeColors.RED,
                        arrowAxes: [new D3().setZ(z), new D3().setY(-y)]
                    });

                    faceRotations.delete(Side.RIGHT);
                }

                for (const rotation of faceRotations.values()) {
                    cube.faces.push({
                        side: new D3(),
                        rotation,
                        color: CubeColors.DEFAULT,
                        arrowAxes: []
                    });
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

    const newFaces = cube.faces.map(face => ({
        ...face,
        side: face.side.rotate(rotationAxis, degree90).map(Math.round),
        arrowAxes: face.arrowAxes.map(arrowAxis =>
            arrowAxis
                .unit()
                .rotate(rotationAxis.invert(), degree90)
                .map(Math.round)
                .mul(newAxes)
        )
    }));

    return {
        ...cube,
        axes: newAxes,
        faces: newFaces,
        rotation: cube.rotation.mul(rotationAxis.toQuaternion(degree90)),
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
