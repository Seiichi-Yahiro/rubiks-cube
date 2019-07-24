import React, { useCallback, useContext } from 'react';
import { animateRotation, calculateCubePosition, cubeIsTransitioning, generateCubes, rotate } from './CubeUtils';
import Cube from './Cube';
import { settingsContext } from '../context/SettingsContext';
import { ICube } from './CubeTypes';
import { D3Group } from './D3';
import createClassName from '../utils/createClassName';
import CubeArrows from './CubeArrows';
import useOnUpdate from '../hooks/useOnUpdate';
import useComplexState from '../hooks/useComplexState';
import Maybe from '../utils/Maybe';
import { algorithmPlayerContext, AlgorithmStatus } from '../context/AlgorithmPlayerContext';
import { flow, partialRight } from 'lodash';

interface IRubiksCubeState {
    cubes: ICube[];
    rotationAnimation: Maybe<D3Group>;
}

const RubiksCube: React.FunctionComponent = () => {
    const { numberOfCubes, size } = useContext(settingsContext);
    const { moveGenerator, status: playerStatus, reset, setAlgorithmPlayerState } = useContext(algorithmPlayerContext);

    const sizeOfCube = size / numberOfCubes;

    const [state, setState] = useComplexState<IRubiksCubeState>(() => ({
        cubes: generateCubes(numberOfCubes, sizeOfCube),
        rotationAnimation: Maybe.none(),
        moveGenerator: Maybe.none()
    }));

    const rotateCubesOnClick = useCallback((rotationAxes: D3Group) => {
        const generator = function*() {
            yield rotationAxes;
        };

        setAlgorithmPlayerState({
            status: AlgorithmStatus.PLAYING,
            moveGenerator: Maybe.some(generator())
        });
    }, []);

    useOnUpdate(() => {
        setState({ cubes: generateCubes(numberOfCubes, sizeOfCube) });
    }, [numberOfCubes, reset]);

    useOnUpdate(() => {
        setState(({ cubes }) => ({
            cubes: cubes.map(cube => ({
                ...cube,
                translation: calculateCubePosition(cube.id, numberOfCubes, sizeOfCube)
            }))
        }));
    }, [size]);

    useOnUpdate(() => {
        if (playerStatus === AlgorithmStatus.PLAYING && state.rotationAnimation.isNone()) {
            moveGenerator
                .let(it => it.next().value)
                .ifIsSome(rotationAxes => {
                    setState(({ cubes }) => ({
                        cubes: animateRotation(cubes, rotationAxes),
                        rotationAnimation: Maybe.some(rotationAxes)
                    }));
                })
                .ifIsNone(() => {
                    setAlgorithmPlayerState({
                        status: AlgorithmStatus.STOPPED,
                        moveGenerator: Maybe.none()
                    });
                });
        } else if (playerStatus === AlgorithmStatus.JUMP_TO_END) {
            setState(({ cubes }) => {
                const moves = [...moveGenerator.get()].map(d3Group => partialRight(rotate, numberOfCubes, d3Group));
                const applyMoves: (cubes: ICube[]) => ICube[] = flow(...moves);

                return {
                    cubes: applyMoves(cubes)
                };
            });
            setAlgorithmPlayerState({
                status: AlgorithmStatus.STOPPED,
                moveGenerator: Maybe.none()
            });
        }
    }, [playerStatus, state.rotationAnimation]);

    useOnUpdate(() => {
        if (state.rotationAnimation.isNone()) {
            return;
        }

        const onTransitionEnd = (event: TransitionEvent) => {
            if (
                event.propertyName === 'transform' &&
                (event.target as HTMLElement).className.includes(cubeIsTransitioning)
            ) {
                window.removeEventListener('transitionend', onTransitionEnd);
                setState(({ cubes, rotationAnimation }) => ({
                    cubes: rotate(cubes, numberOfCubes, rotationAnimation.get()),
                    rotationAnimation: Maybe.none()
                }));
            }
        };

        window.addEventListener('transitionend', onTransitionEnd);

        return () => {
            window.removeEventListener('transitionend', onTransitionEnd);
        };
    }, [state.rotationAnimation]);

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
                    'rubiks-cube--is-transitioning': playerStatus !== AlgorithmStatus.STOPPED
                })}
                style={cubeStyle}
            >
                <div style={cubesWrapperStyle}>
                    <div style={{ display: 'contents' }}>
                        {state.cubes.map((cube, index) => (
                            <Cube
                                key={index}
                                size={sizeOfCube}
                                rotation={cube.rotation}
                                rotationAnimation={cube.rotationAnimation}
                                translation={cube.translation}
                                colors={cube.colors}
                                faceArrows={cube.faceArrows}
                                rotate={rotateCubesOnClick}
                            />
                        ))}
                    </div>
                    <CubeArrows
                        size={size}
                        sizeOfCube={sizeOfCube}
                        numberOfCubes={numberOfCubes}
                        rotate={rotateCubesOnClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default RubiksCube;
