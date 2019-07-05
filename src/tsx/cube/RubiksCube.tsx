import React from 'react';
import { ICube } from './CubeUtils';
import { range } from 'lodash';
import Cube from './Cube';

const RubiksCube: React.FunctionComponent = () => {
    const size = 300;

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
        transform: `translateZ(-${size / 2}px) rotateX(-45deg) rotateY(-45deg)`
    };

    const cubes: ICube[] = [];
    const cubeSize = size / 3;

    for (let z of range(3)) {
        for (let y of range(3)) {
            for (let x of range(3)) {
                if (z === 1 && z === y && y === x) {
                    continue;
                }

                const cube: ICube = {
                    colors: {},
                    transform: {
                        x: x * cubeSize,
                        y: y * cubeSize,
                        z: -z * cubeSize
                    }
                };

                if (z === 0) {
                    cube.colors.front = 'blue';
                } else if (z === 2) {
                    cube.colors.back = 'green';
                }

                if (y === 0) {
                    cube.colors.top = 'yellow';
                } else if (y === 2) {
                    cube.colors.bottom = 'white';
                }

                if (x === 0) {
                    cube.colors.left = 'orange';
                } else if (x === 2) {
                    cube.colors.right = 'red';
                }

                cubes.push(cube);
            }
        }
    }

    return (
        <div style={cubeSceneStyle}>
            <div style={cubeStyle}>
                {cubes.map((cube, index) => (
                    <Cube key={index} size={cubeSize} transform={cube.transform} colors={cube.colors} />
                ))}
            </div>
        </div>
    );
};

export default RubiksCube;
