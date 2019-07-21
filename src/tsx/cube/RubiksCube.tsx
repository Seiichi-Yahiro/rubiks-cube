import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { animateRotation, calculateCubePosition, cubeIsTransitioning, generateCubes, rotate } from './CubeUtils';
import Cube from './Cube';
import { isFunction } from 'lodash';
import { settingsContext } from '../context/SettingsContext';
import { ICube } from './CubeTypes';
import { D3Group } from './D3';
import createClassName from '../utils/createClassName';
import CubeArrows from './CubeArrows';

const RubiksCube: React.FunctionComponent = () => {
    const { numberOfCubes, size, moveGenerator } = useContext(settingsContext);
    const sizeOfCube = size / numberOfCubes;
    const isTransitioning = useRef(false);

    const [cubes, updateCubes] = useState<ICube[]>([]);
    const rotateCubes = useCallback(
        (rotationAxes: D3Group) => {
            const onTransitionEnd = (event: TransitionEvent) => {
                if (
                    event.propertyName === 'transform' &&
                    (event.target as HTMLElement).className.includes(cubeIsTransitioning)
                ) {
                    isTransitioning.current = false;
                    updateCubes(prevState => rotate(prevState, numberOfCubes, rotationAxes));
                    window.removeEventListener('transitionend', onTransitionEnd);
                }
            };
            window.addEventListener('transitionend', onTransitionEnd);

            isTransitioning.current = true;
            updateCubes(prevState => animateRotation(prevState, rotationAxes));
        },
        [numberOfCubes]
    );

    useEffect(() => {
        updateCubes(generateCubes(numberOfCubes, sizeOfCube));
    }, [numberOfCubes]);

    useEffect(() => {
        updateCubes(prevState =>
            prevState.map(cube => ({
                ...cube,
                translation: calculateCubePosition(cube.id, numberOfCubes, sizeOfCube)
            }))
        );
    }, [size]);

    const applyMoveSet = async (moveSet: D3Group[] | (() => D3Group[]), wait: number = 1000, loop: boolean = false) => {
        const applyMove = (move: D3Group) =>
            new Promise(resolve => {
                setTimeout(() => {
                    rotateCubes(move);
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
        moveGenerator.ifIsSome(generator => {
            applyMoveSet([...generator], 1200, false);
        });
    }, [moveGenerator]);

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
                className={createClassName({
                    'rubiks-cube--is-transitioning': isTransitioning.current
                })}
                style={cubeStyle}
            >
                <div style={cubesWrapperStyle}>
                    <div>
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
                    <CubeArrows
                        size={size}
                        sizeOfCube={sizeOfCube}
                        numberOfCubes={numberOfCubes}
                        rotate={rotateCubes}
                    />
                </div>
            </div>
        </div>
    );
};

export default RubiksCube;
