import { debounce } from 'es-toolkit';
import React, { TransitionEvent, useCallback, useMemo } from 'react';
import { rotationCommandToCssRotation } from 'src/algorithms/rotationCommand';
import { useAppDispatch, useRedux } from 'src/hooks/redux';
import { cubeActions } from 'src/redux/cube/cubeActions';
import Cubicle, { cubicleClassname } from 'src/tsx/cube/Cubicle';
import type { CubeAxis } from 'src/tsx/cube/cubeTypes';
import { canApplyRotationCommand } from 'src/tsx/cube/cubeUtils';

interface CubiclesProps {
    cubicleSize: number;
}

const Cubicles: React.FC<CubiclesProps> = ({ cubicleSize }) => {
    const dispatch = useAppDispatch();
    const cubicles = useRedux((state) => state.cube.cubicles);
    const rotationDuration = useRedux((state) => state.cube.rotationDuration);
    const currentRotationCommand = useRedux((state) => state.cube.animation);

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

    const geAnimatedTransform = (axis: CubeAxis) => {
        if (
            currentRotationCommand &&
            canApplyRotationCommand(axis, currentRotationCommand)
        ) {
            return rotationCommandToCssRotation(currentRotationCommand);
        } else {
            return 'rotate(0)';
        }
    };

    return (
        <div className="contents" onTransitionEnd={sendAnimationFinishedEvents}>
            {cubicles.map(({ id, faces, transform, axis }) => {
                return (
                    <Cubicle
                        key={id.join(',')}
                        axis={axis}
                        faces={faces}
                        animatedTransform={geAnimatedTransform(axis)}
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
