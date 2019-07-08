import React from 'react';
import { ICube } from './CubeUtils';
import { range } from 'lodash';
import Cube from './Cube';

const RubiksCube: React.FunctionComponent = () => {
    const size = 300;
    const cubes: ICube[] = [];
    const cubeSize = 3;
    const blockSize = size / 3;

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

    for (let z of range(cubeSize)) {
        for (let y of range(cubeSize)) {
            for (let x of range(cubeSize)) {
                if (z !== 0 && z !== cubeSize - 1 && y !== 0 && y !== cubeSize - 1 && x !== 0 && x !== cubeSize - 1) {
                    continue;
                }

                const cube: ICube = {
                    colors: {},
                    translation: {
                        x: x * blockSize - blockSize,
                        y: y * blockSize - blockSize,
                        z: -z * blockSize + blockSize
                    },
                    rotation: {
                        x: 0,
                        y: 0,
                        z: 0
                    }
                };

                if (z === 0) {
                    cube.colors.front = '#3d81f6';
                } else if (z === cubeSize - 1) {
                    cube.colors.back = '#009d54';
                }

                if (y === 0) {
                    cube.colors.top = '#fdcc09';
                } else if (y === cubeSize - 1) {
                    cube.colors.bottom = '#ffffff';
                }

                if (x === 0) {
                    cube.colors.left = '#ff6c00';
                } else if (x === cubeSize - 1) {
                    cube.colors.right = '#dc422f';
                }

                cubes.push(cube);
            }
        }
    }

    // Offset the translation origin to the center for small cubes
    const cubesWrapperStyle: React.CSSProperties = {
        transform: `translate3d(${blockSize}px, ${blockSize}px, 0px)`,
        transformStyle: 'preserve-3d'
    };

    return (
        <div style={cubeSceneStyle}>
            <div style={cubeStyle}>
                <div style={cubesWrapperStyle}>
                    {cubes.map((cube, index) => (
                        <Cube
                            key={index}
                            size={blockSize}
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
