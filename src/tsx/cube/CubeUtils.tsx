import { flow, range, values } from 'lodash';
import Quaternion from 'quaternion';
import { CubeColors, ICube, IFace, Side } from './CubeTypes';
import D3, { D3Group } from './D3';
import Maybe from '../utils/Maybe';
import { mapSideCoordinatesToSide, mapSideToArrowAxes, mapSideToColor, mapSideToSideCoordinates } from './Mappers';

export const cubeIsTransitioning = 'cube--is-transitioning';

export const calculate3DCubePosition = (d3: D3, numberOfCubes: number, sizeOfCube: number): D3 => {
    const offset = sizeOfCube * (numberOfCubes / 2 - 0.5);
    const [x, y, z] = d3.sub(1).toVector();

    return d3
        .clone()
        .setX(x * sizeOfCube - offset)
        .setY(y * sizeOfCube - offset)
        .setZ(-z * sizeOfCube + offset);
};

const isSideColored = (side: Side, axes: D3, numberOfCubes: number) => {
    const [x, y, z] = axes.toVector();

    switch (side) {
        case Side.FRONT:
            return z === 1;
        case Side.BACK:
            return z === numberOfCubes;
        case Side.UP:
            return y === 1;
        case Side.DOWN:
            return y === numberOfCubes;
        case Side.LEFT:
            return x === 1;
        case Side.RIGHT:
            return x === numberOfCubes;
        default:
            return false;
    }
};

const isCubeVisible = (axes: D3, numberOfCubes: number) =>
    axes.toVector().some(dimension => dimension === 1 || dimension === numberOfCubes);

export const generateCubes = (numberOfCubes: number) => {
    const cubes: ICube[] = [];
    const indexes = range(1, numberOfCubes + 1);

    for (const z of indexes) {
        for (const y of indexes) {
            for (const x of indexes) {
                const axes = new D3(x, y, z);

                if (!isCubeVisible(axes, numberOfCubes)) {
                    continue;
                }

                const cube: ICube = {
                    id: axes.clone(),
                    faces: [],
                    rotation: new Quaternion(),
                    axes,
                    rotationAnimation: Maybe.none()
                };

                for (const side of values(Side) as Side[]) {
                    const isFaceColored = isSideColored(side, axes, numberOfCubes);

                    cube.faces.push({
                        side,
                        sideCoordinates: isFaceColored ? mapSideToSideCoordinates(side, numberOfCubes) : new D3(),
                        color: isFaceColored ? mapSideToColor(side) : CubeColors.DEFAULT,
                        arrowAxes: isFaceColored ? mapSideToArrowAxes(side, axes) : []
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

    const newFaces = cube.faces.map(face => {
        const sideCoordinates = face.sideCoordinates.rotate(axesRotation, degree90).map(Math.round);

        return {
            ...face,
            side: mapSideCoordinatesToSide(sideCoordinates),
            sideCoordinates,
            arrowAxes: face.arrowAxes.map(arrowAxis =>
                arrowAxis
                    .unit()
                    .rotate(rotationAxis.invert(), degree90)
                    .map(Math.round)
                    .mul(newAxes)
            )
        } as IFace;
    });

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
