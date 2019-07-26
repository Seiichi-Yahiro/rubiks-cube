import React, { useCallback } from 'react';
import { animateRotation, calculateCubePosition, cubeIsTransitioning, generateCubes, rotate } from './CubeUtils';
import Cube from './Cube';
import { ICube } from './CubeTypes';
import { D3Group } from './D3';
import createClassName from '../utils/createClassName';
import CubeArrows from './CubeArrows';
import useOnUpdate from '../hooks/useOnUpdate';
import useComplexState from '../hooks/useComplexState';
import Maybe from '../utils/Maybe';
import { AlgorithmStatus } from '../states/AlgorithmPlayerState';
import { flow, partialRight } from 'lodash';
import { useGlobalState } from '../states/State';
import { playAlgorithmAction, stopAlgorithmAction } from '../states/AlgorithmPlayerActions';

interface IRubiksCubeState {
    cubes: ICube[];
    rotationAnimation: Maybe<D3Group>;
}

const RubiksCube: React.FunctionComponent = () => {
    const [globalState, dispatch] = useGlobalState();
    const { numberOfCubes, cubeSize, moveGenerator, playerStatus, reset } = globalState;

    const sizeOfCube = cubeSize / numberOfCubes;

    const [state, setState] = useComplexState<IRubiksCubeState>(() => ({
        cubes: generateCubes(numberOfCubes, sizeOfCube),
        rotationAnimation: Maybe.none(),
        moveGenerator: Maybe.none()
    }));

    const rotateCubesOnClick = useCallback((rotationAxes: D3Group) => {
        const generator = function*() {
            yield rotationAxes;
        };
        const generateMoveGenerator = () => Maybe.some(generator());
        dispatch(playAlgorithmAction(generateMoveGenerator));
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
    }, [cubeSize]);

    const onTransitionEnd = (event: TransitionEvent) => {
        const isTransform = event.propertyName === 'transform';
        const hasCubeIsTransitioningClass = (event.target as HTMLElement).className.includes(cubeIsTransitioning);

        if (!isTransform || !hasCubeIsTransitioningClass) {
            return;
        }

        window.removeEventListener('transitionend', onTransitionEnd);

        setState(({ cubes, rotationAnimation }) => ({
            cubes: rotate(cubes, numberOfCubes, rotationAnimation.get()),
            rotationAnimation: Maybe.none()
        }));
    };

    const animate = (rotationAxes: D3Group) => {
        window.addEventListener('transitionend', onTransitionEnd);

        setState(({ cubes }) => ({
            cubes: animateRotation(cubes, rotationAxes),
            rotationAnimation: Maybe.some(rotationAxes)
        }));
    };

    useOnUpdate(() => {
        if (playerStatus === AlgorithmStatus.PLAYING && state.rotationAnimation.isNone()) {
            moveGenerator
                .let(it => it.next().value)
                .ifIsSome(animate)
                .ifIsNone(() => dispatch(stopAlgorithmAction()));
        } else if (playerStatus === AlgorithmStatus.JUMP_TO_END) {
            setState(({ cubes }) => {
                const moves = [...moveGenerator.get()].map(d3Group => partialRight(rotate, numberOfCubes, d3Group));
                const applyMoves: (cubes: ICube[]) => ICube[] = flow(...moves);

                return {
                    cubes: applyMoves(cubes)
                };
            });
            dispatch(stopAlgorithmAction());
        }
    }, [playerStatus, state.rotationAnimation]);

    const cubeSceneStyle: React.CSSProperties = {
        width: cubeSize,
        height: cubeSize,
        margin: 80,
        perspective: 1000
    };

    const cubeStyle: React.CSSProperties = {
        width: cubeSize,
        height: cubeSize,
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
                        size={cubeSize}
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
