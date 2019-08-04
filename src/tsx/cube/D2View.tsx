import React, { useMemo } from 'react';
import { CubeColors, ICube, Side } from './CubeTypes';
import Face from './Face';
import D3, { D3Group } from './D3';

interface ID2ViewProps {
    cubes: ICube[];
    rotateOnClick: (rotationAxes: D3Group) => void;
    cubeSize: number;
    sizeOfCube: number;
    numberOfCubes: number;
}

const D2View: React.FunctionComponent<ID2ViewProps> = ({
    cubes,
    rotateOnClick,
    cubeSize,
    sizeOfCube,
    numberOfCubes
}) => {
    const d2FaceTransforms = useMemo(
        () => ({
            [Side.LEFT]: `translate3d(-${cubeSize}px, 0, 0) rotateZ(90deg)`,
            [Side.RIGHT]: `scale(-1, 1) translate3d(-${cubeSize}px, 0, 0) rotateZ(90deg)`,
            [Side.UP]: `scale(1, -1) translate3d(0, ${cubeSize}px, 0)`,
            [Side.DOWN]: `translate3d(0, ${cubeSize}px, 0)`,
            [Side.FRONT]: 'translate3d(0, 0, 0)',
            [Side.BACK]: `translate3d(0, ${2 * cubeSize}px, 0) scale(1, -1)`
        }),
        [cubeSize]
    );

    const calculate2DFacePosition = (side: Side, sideCoordinates: D3, axes: D3) => {
        const offset = sizeOfCube * (numberOfCubes / 2 - 0.5);

        const [x, y] = sideCoordinates
            .map(it => (it === 0 ? 1 : 0))
            .mul(axes)
            .toVector()
            .filter(it => it !== 0);

        const xTranslate = (x - 1) * sizeOfCube - offset;
        const yTranslate = (y - 1) * sizeOfCube - offset;

        return `${d2FaceTransforms[side]} translate3d(${xTranslate}px, ${yTranslate}px, 0)`;
    };

    return (
        <>
            {cubes.flatMap(cube =>
                cube.faces
                    .filter(face => face.color !== CubeColors.DEFAULT)
                    .map(face => (
                        <Face
                            key={face.side}
                            size={sizeOfCube}
                            color={face.color}
                            rotate={rotateOnClick}
                            arrowAxes={face.arrowAxes}
                            transform={calculate2DFacePosition(face.side, face.sideCoordinates, cube.axes)}
                        />
                    ))
            )}
        </>
    );
};

export default D2View;
