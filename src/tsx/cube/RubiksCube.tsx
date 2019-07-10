import React, { useEffect, useState } from 'react';
import { generateCubes, ICube, rotate } from './CubeUtils';
import Cube from './Cube';
import { isFunction } from 'lodash';
import { Move, MoveSet, random } from './Moves';

const RubiksCube: React.FunctionComponent = () => {
    const size = 300;
    const numberOfCubes = 3;
    const sizeOfCube = size / numberOfCubes;

    const [cubes, updateCubes] = useState<ICube[]>(generateCubes(numberOfCubes, sizeOfCube));

    const applyMoveSet = async (moveSet: MoveSet | (() => MoveSet), wait: number = 1000, loop: boolean = false) => {
        const applyMove = (move: Move) =>
            new Promise(resolve => {
                setTimeout(() => {
                    updateCubes(prevState => rotate(prevState, move.layer, move.direction));
                    resolve();
                }, wait);
            });

        const set = isFunction(moveSet) ? moveSet() : moveSet;

        for (const move of set) {
            await applyMove(move);
        }

        if (loop) {
            applyMoveSet(moveSet, wait, loop);
        }
    };

    useEffect(() => {
        applyMoveSet(random, 500, true);
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
