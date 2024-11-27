import { debounce } from 'lodash';
import React, { TransitionEvent, useCallback, useMemo } from 'react';
import { rotationCommandToCssRotation } from 'src/algorithms/rotationCommand';
import { useAppDispatch, useRedux } from 'src/hooks/redux';
import { cubeActions } from 'src/redux/cube/cubeActions';
import Cubicle, { cubicleClassname } from 'src/tsx/cube/Cubicle';
import { canApplyRotationCommand } from 'src/tsx/cube/cubeUtils';
import Maybe from 'src/utils/maybe';

interface CubiclesProps {
    cubicleSize: number;
}

const Cubicles: React.FC<CubiclesProps> = ({ cubicleSize }) => {
    const dispatch = useAppDispatch();
    const cubicles = useRedux((state) => state.cube.cubicles);
    const rotationDuration = useRedux((state) => state.cube.rotationDuration);
    const currentRotationCommand = Maybe.of(
        useRedux((state) => state.player.currentCommand),
    );

    const debouncedAnimationFinishedDispatch = useMemo(
        () => debounce(() => dispatch(cubeActions.animationFinished()), 50),
        [dispatch],
    );

    const sendAnimationFinishedEvents = useCallback(
        (event: TransitionEvent) => {
            const isCorrectEvent =
                event.propertyName === 'transform' &&
                (event.target as HTMLElement).className.includes(
                    cubicleClassname,
                );

            if (isCorrectEvent) {
                debouncedAnimationFinishedDispatch();
            }
        },
        [debouncedAnimationFinishedDispatch],
    );

    return (
        <div className="contents" onTransitionEnd={sendAnimationFinishedEvents}>
            {cubicles.map(({ id, faces, transform, axis }) => {
                const animatedTransform = currentRotationCommand
                    .filter((command) => canApplyRotationCommand(axis, command))
                    .map(rotationCommandToCssRotation)
                    .unwrapOr('rotate(0)');

                return (
                    <Cubicle
                        key={id.join(',')}
                        axis={axis}
                        faces={faces}
                        animatedTransform={animatedTransform}
                        transform={transform}
                        size={cubicleSize}
                        rotationDuration={rotationDuration}
                    />
                );
            })}
        </div>
    );
};

export default React.memo(Cubicles);
