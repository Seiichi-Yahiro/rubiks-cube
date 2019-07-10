import React, { useEffect, useState } from 'react';
import { Direction, generateCubes, ICube, Layer, rotate } from './CubeUtils';
import Cube from './Cube';

const RubiksCube: React.FunctionComponent = () => {
    const size = 300;
    const numberOfCubes = 3;
    const sizeOfCube = size / numberOfCubes;

    const [cubes, updateCubes] = useState<ICube[]>(generateCubes(numberOfCubes, sizeOfCube));

    const sexyMove = () => {
        setTimeout(() => {
            updateCubes(prevState => rotate(prevState, Layer.RIGHT, Direction.CLOCKWISE));

            setTimeout(() => {
                updateCubes(prevState => rotate(prevState, Layer.UP, Direction.CLOCKWISE));

                setTimeout(() => {
                    updateCubes(prevState => rotate(prevState, Layer.RIGHT, Direction.ANTI_CLOCKWISE));

                    setTimeout(() => {
                        updateCubes(prevState => rotate(prevState, Layer.UP, Direction.ANTI_CLOCKWISE));

                        sexyMove();
                    }, 1100);
                }, 1100);
            }, 1100);
        }, 1100);
    };

    const random = () => {
        setTimeout(() => {
            updateCubes(prevState => rotate(prevState));
            random();
        }, 1100);
    };

    useEffect(() => {
        random();
    }, []);

    const cubeSceneStyle: React.CSSProperties = {
        width: size,
        height: size,
        margin: 80,
        perspective: 1000
    };

    const cubeStyle: React.CSSProperties = {
        width: size,
        height: size,
        position: 'relative',
        transformStyle: 'preserve-3d',
        transform: `rotateX(-45deg) rotateY(-45deg)`
    };

    // Offset the translation origin to the center for small cubes
    const cubesWrapperStyle: React.CSSProperties = {
        transform: `translate3d(${sizeOfCube}px, ${sizeOfCube}px, 0px)`,
        transformStyle: 'preserve-3d'
    };

    return (
        <div style={cubeSceneStyle}>
            <div style={cubeStyle}>
                <div style={cubesWrapperStyle}>
                    {cubes.map((cube, index) => (
                        <Cube
                            key={index}
                            size={sizeOfCube}
                            rotation={cube.rotation}
                            translation={cube.translation}
                            colors={cube.colors}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RubiksCube;
