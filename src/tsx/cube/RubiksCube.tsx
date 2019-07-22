import React, { useCallback, useContext } from 'react';
import { animateRotation, calculateCubePosition, cubeIsTransitioning, generateCubes, rotate } from './CubeUtils';
import Cube from './Cube';
import { settingsContext } from '../context/SettingsContext';
import { ICube } from './CubeTypes';
import { D3Group } from './D3';
import createClassName from '../utils/createClassName';
import CubeArrows from './CubeArrows';
import { interpretNotation } from './algorithms/Interpreter';
import useOnUpdate from '../hooks/useOnUpdate';
import useComplexState from '../hooks/useComplexState';
import Maybe from '../utils/Maybe';
import { algorithmPlayerContext, AlgorithmStatus } from '../context/AlgorithmPlayerContext';

interface RubiksCubeState {
    cubes: ICube[];
    isTransitioning: boolean;
    rotationAnimation: Maybe<D3Group>;
    moveGenerator: Maybe<IterableIterator<D3Group>>;
}

const RubiksCube: React.FunctionComponent = () => {
    const { numberOfCubes, size } = useContext(settingsContext);
    const { notation: playerNotation, status: playerStatus, setAlgorithmPlayerState } = useContext(
        algorithmPlayerContext
    );

    const sizeOfCube = size / numberOfCubes;

    const [state, setState] = useComplexState<RubiksCubeState>(() => ({
        cubes: generateCubes(numberOfCubes, sizeOfCube),
        isTransitioning: false,
        rotationAnimation: Maybe.none(),
        moveGenerator: Maybe.none()
    }));

    const rotateCubes = useCallback(
        (rotationAxes: D3Group) => {
            setAlgorithmPlayerState({ status: AlgorithmStatus.START });
            setState(() => ({
                moveGenerator: Maybe.some(
                    (function*() {
                        yield rotationAxes;
                    })()
                )
            }));
        },
        [numberOfCubes]
    );

    useOnUpdate(() => {
        setState({ cubes: generateCubes(numberOfCubes, sizeOfCube) });
    }, [numberOfCubes]);

    useOnUpdate(() => {
        setState(({ cubes }) => ({
            cubes: cubes.map(cube => ({
                ...cube,
                translation: calculateCubePosition(cube.id, numberOfCubes, sizeOfCube)
            }))
        }));
    }, [size]);

    useOnUpdate(() => {
        if (playerStatus === AlgorithmStatus.START && state.moveGenerator.isNone()) {
            const generator = interpretNotation(playerNotation, numberOfCubes);
            setState({
                moveGenerator: Maybe.some(generator)
            });
        }
    }, [playerStatus]);

    useOnUpdate(() => {
        if (state.rotationAnimation.isNone() && state.moveGenerator.isSome()) {
            state.moveGenerator
                .let(it => it.next().value)
                .ifIsSome(rotationAxes => {
                    setState(({ cubes }) => ({
                        cubes: animateRotation(cubes, rotationAxes),
                        isTransitioning: true,
                        rotationAnimation: Maybe.some(rotationAxes)
                    }));
                })
                .ifIsNone(() => {
                    setState({ moveGenerator: Maybe.none() });
                    setAlgorithmPlayerState({ status: AlgorithmStatus.STOPPED });
                });
        }
    }, [state.moveGenerator, state.rotationAnimation]);

    useOnUpdate(() => {
        if (state.isTransitioning) {
            const onTransitionEnd = (event: TransitionEvent) => {
                if (
                    event.propertyName === 'transform' &&
                    (event.target as HTMLElement).className.includes(cubeIsTransitioning)
                ) {
                    window.removeEventListener('transitionend', onTransitionEnd);
                    setState(({ cubes, rotationAnimation }) => ({
                        cubes: rotate(cubes, numberOfCubes, rotationAnimation.get()),
                        isTransitioning: false,
                        rotationAnimation: Maybe.none()
                    }));
                }
            };

            window.addEventListener('transitionend', onTransitionEnd);

            return () => {
                window.removeEventListener('transitionend', onTransitionEnd);
            };
        }

        return;
    }, [state.isTransitioning]);

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
                    'rubiks-cube--is-transitioning': state.isTransitioning || playerStatus !== AlgorithmStatus.STOPPED
                })}
                style={cubeStyle}
            >
                <div style={cubesWrapperStyle}>
                    <div>
                        {state.cubes.map((cube, index) => (
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
