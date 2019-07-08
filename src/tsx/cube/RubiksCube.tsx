import React from 'react';
import { ICube } from './CubeUtils';
import { range } from 'lodash';
import Cube from './Cube';

const RubiksCube: React.FunctionComponent = () => {
    const size = 300;
    const cubes: ICube[] = [];
    const numberOfCubes = 3;
    const sizeOfCube = size / numberOfCubes;

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
                    rotation: {
                        x: 0,
                        y: 0,
                        z: 0
                    }
                };

                if (z === 0) {
                    cube.colors.front = '#3d81f6';
                } else if (z === numberOfCubes - 1) {
                    cube.colors.back = '#009d54';
                }

                if (y === 0) {
                    cube.colors.top = '#fdcc09';
                } else if (y === numberOfCubes - 1) {
                    cube.colors.bottom = '#ffffff';
                }

                if (x === 0) {
                    cube.colors.left = '#ff6c00';
                } else if (x === numberOfCubes - 1) {
                    cube.colors.right = '#dc422f';
                }

                cubes.push(cube);
            }
        }
    }

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
