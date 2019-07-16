import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
    animateRotation,
    calculateCubePosition,
    generateCubes,
    rotate,
    cubeIsTransitioning,
    repeatForAllAxes
} from './CubeUtils';
import Cube from './Cube';
import { isFunction } from 'lodash';
import { settingsContext } from '../context/SettingsContext';
import { ICube, Move, MoveSet } from './CubeTypes';
import D3 from './D3';
import createClassName from '../utils/createClassName';

const RubiksCube: React.FunctionComponent = () => {
    const { numberOfCubes, size } = useContext(settingsContext);
    const sizeOfCube = size / numberOfCubes;
    const isTransitioning = useRef(false);

    const [cubes, updateCubes] = useState<ICube[]>([]);
    const rotateCubes = useCallback(
        (rotationAxis: D3, allAxes: boolean = false) => {
            const onTransitionEnd = (event: TransitionEvent) => {
                if (
                    event.propertyName === 'transform' &&
                    (event.target as HTMLElement).className.includes(cubeIsTransitioning)
                ) {
                    isTransitioning.current = false;
                    updateCubes(prevState =>
                        allAxes ? repeatForAllAxes(prevState, rotationAxis, rotate) : rotate(prevState, rotationAxis)
                    );
                    window.removeEventListener('transitionend', onTransitionEnd);
                }
            };
            window.addEventListener('transitionend', onTransitionEnd);

            isTransitioning.current = true;
            updateCubes(prevState =>
                allAxes
                    ? repeatForAllAxes(prevState, rotationAxis, animateRotation)
                    : animateRotation(prevState, rotationAxis)
            );
        },
        [numberOfCubes]
    );

    useEffect(() => {
        updateCubes(generateCubes(numberOfCubes, sizeOfCube));
    }, [numberOfCubes]);

    useEffect(() => {
        updateCubes(prevState =>
            prevState.map(cube => ({ ...cube, translation: calculateCubePosition(cube.id, numberOfCubes, sizeOfCube) }))
        );
    }, [size]);

    const applyMoveSet = async (moveSet: MoveSet | (() => MoveSet), wait: number = 1000, loop: boolean = false) => {
        const applyMove = (move: Move) =>
            new Promise(resolve => {
                setTimeout(() => {
                    rotateCubes(D3.fromMove(move, numberOfCubes));
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
        // applyMoveSet(random, 1000, false);
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
        <div className="app__cube" style={cubeSceneStyle}>
            <div
                className={createClassName({ 'rubiks-cube--is-transitioning': isTransitioning.current })}
                style={cubeStyle}
            >
                <div style={cubesWrapperStyle}>
                    {cubes.map((cube, index) => (
                        <Cube
                            key={index}
                            size={sizeOfCube}
                            rotation={cube.rotation}
                            rotationAnimation={cube.rotationAnimation}
                            translation={cube.translation}
                            colors={cube.colors}
                            faceArrows={cube.faceArrows}
                            rotate={rotateCubes}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RubiksCube;
