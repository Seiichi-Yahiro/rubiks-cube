import React, { useCallback, useMemo } from 'react';
import Cube from './Cube';
import CubeArrows from './CubeArrows';
import { ICube, Side } from './CubeTypes';
import { D3Group } from './D3';

interface ID3ViewProps {
    cubes: ICube[];
    rotateOnClick: (rotationAxes: D3Group) => void;
    cubeSize: number;
    sizeOfCube: number;
    numberOfCubes: number;
}

const D3View: React.FunctionComponent<ID3ViewProps> = ({
    cubes,
    rotateOnClick,
    cubeSize,
    sizeOfCube,
    numberOfCubes
}) => {
    const cubeStyle: React.CSSProperties = {
        width: cubeSize,
        height: cubeSize,
        position: 'relative',
        transformStyle: 'preserve-3d',
        transform: 'rotateX(-45deg) rotateY(-45deg)'
    };

    // Offset the translation origin to the center for small cubes
    const cubesWrapperStyle: React.CSSProperties = {
        transform: `translate3d(${sizeOfCube}px, ${sizeOfCube}px, 0px)`,
        transformStyle: 'preserve-3d'
    };

    const faceTransforms = useMemo(() => {
        const halfCubeSize = sizeOfCube / 2;

        return {
            [Side.FRONT]: `translateZ(${halfCubeSize}px)`,
            [Side.BACK]: `rotateY(180deg) translateZ(${halfCubeSize}px)`,
            [Side.UP]: `rotateX(90deg) translateZ(${halfCubeSize}px)`,
            [Side.DOWN]: `rotateX(-90deg) translateZ(${halfCubeSize}px)`,
            [Side.LEFT]: `rotateY(-90deg) translateZ(${halfCubeSize}px)`,
            [Side.RIGHT]: `rotateY(90deg) translateZ(${halfCubeSize}px)`
        };
    }, [sizeOfCube]);

    const getFaceTransform = useCallback((side: Side) => faceTransforms[side], [faceTransforms]);

    return (
        <div style={cubeStyle}>
            <div style={cubesWrapperStyle}>
                <div style={{ display: 'contents' }}>
                    {cubes.map(cube => (
                        <Cube
                            key={cube.id.toString()}
                            id={cube.id}
                            size={sizeOfCube}
                            faces={cube.faces}
                            rotation={cube.rotation}
                            rotationAnimation={cube.rotationAnimation}
                            rotate={rotateOnClick}
                            getFaceTransform={getFaceTransform}
                        />
                    ))}
                </div>
                <CubeArrows
                    size={cubeSize}
                    sizeOfCube={sizeOfCube}
                    numberOfCubes={numberOfCubes}
                    rotate={rotateOnClick}
                />
            </div>
        </div>
    );
};

export default D3View;
