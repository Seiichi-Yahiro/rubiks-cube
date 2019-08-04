import React, { useCallback } from 'react';
import { animateRotation, cubeIsTransitioning, generateCubes, rotate } from './CubeUtils';
import { ICube, ViewType } from './CubeTypes';
import { D3Group } from './D3';
import createClassName from '../utils/createClassName';
import useOnUpdate from '../hooks/useOnUpdate';
import useComplexState from '../hooks/useComplexState';
import Maybe from '../utils/Maybe';
import { AlgorithmStatus } from '../states/AlgorithmPlayerState';
import { flow, partialRight } from 'lodash';
import { useGlobalState } from '../states/State';
import { playAlgorithmAction, stopAlgorithmAction } from '../states/AlgorithmPlayerActions';
import D3View from './D3View';
import D2View from './D2View';

interface IRubiksCubeState {
    cubes: ICube[];
    rotationAnimation: Maybe<D3Group>;
}

const RubiksCube: React.FunctionComponent = () => {
    const [globalState, dispatch] = useGlobalState();
    const { numberOfCubes, cubeSize, moveGenerator, playerStatus, reset, view } = globalState;

    const sizeOfCube = cubeSize / numberOfCubes;

    const [state, setState] = useComplexState<IRubiksCubeState>(() => ({
        cubes: generateCubes(numberOfCubes),
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
        setState({ cubes: generateCubes(numberOfCubes) });
    }, [numberOfCubes, reset]);

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

    return (
        <div
            className={createClassName('app__cube', {
                'rubiks-cube--is-transitioning': playerStatus !== AlgorithmStatus.STOPPED
            })}
            style={cubeSceneStyle}
        >
            {view === ViewType.D3 ? (
                <D3View
                    cubes={state.cubes}
                    rotateOnClick={rotateCubesOnClick}
                    cubeSize={cubeSize}
                    sizeOfCube={sizeOfCube}
                    numberOfCubes={numberOfCubes}
                />
            ) : (
                <D2View
                    cubes={state.cubes}
                    rotateOnClick={rotateCubesOnClick}
                    cubeSize={cubeSize}
                    sizeOfCube={sizeOfCube}
                    numberOfCubes={numberOfCubes}
                />
            )}
        </div>
    );
};

export default RubiksCube;
