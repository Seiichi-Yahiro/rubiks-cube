import { debounce } from 'lodash';
import React, { useEffect, useRef } from 'react';
import { rotationCommandToCssRotation } from 'src/algorithms/rotationCommand';
import { useAppDispatch, useRedux } from 'src/hooks/redux';
import { cubeActions } from 'src/redux/cube/cubeActions';
import { PlayerStatus } from 'src/redux/player/playerState';
import CubeArrows from 'src/tsx/cube/CubeArrows';
import { canApplyRotationCommand } from 'src/tsx/cube/cubeUtils';
import Cubicle from 'src/tsx/cube/Cubicle';
import createClassName from 'src/utils/createClassName';
import { fromTranslation, toCss } from 'src/utils/matrix4';
import Maybe from 'src/utils/maybe';

const RubiksCube: React.FC = () => {
    const dispatch = useAppDispatch();
    const cubeDimension = useRedux((state) => state.cube.dimension);
    const cubeSize = useRedux((state) => state.cube.size);
    const rotation = useRedux((state) => state.cube.rotation);
    const isStopped =
        useRedux((state) => state.player.status) === PlayerStatus.STOPPED;

    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!container.current) {
            return;
        }

        const resizeObserver = new ResizeObserver(
            debounce(() => {
                const width = container.current!.offsetWidth;
                const height = container.current!.offsetHeight;
                const containerSize = Math.min(width, height);
                dispatch(cubeActions.setCubeSize(containerSize / 2));
            }),
        );

        resizeObserver.observe(container.current);

        return () => resizeObserver.disconnect();
    }, [dispatch, container.current]);

    const cubicleSize = cubeSize / cubeDimension;

    const style: React.CSSProperties = {
        width: cubeSize,
        height: cubeSize,
        transform: toCss(rotation),
    };

    const positionCorrectionStyle = (): React.CSSProperties => {
        const offset = (cubeSize * (cubeDimension - 1)) / (2 * cubeDimension);
        const mat = fromTranslation(offset, offset, 0);
        return {
            transform: toCss(mat),
            transformStyle: 'preserve-3d',
        };
    };

    return (
        <div
            ref={container}
            className="flex max-h-[30rem] flex-1 items-center justify-center p-2 [perspective:1000px] md:mt-10"
        >
            <div
                className={createClassName(
                    'relative [transform-style:preserve-3d]',
                    {
                        'group/transitioning is-transitioning': !isStopped,
                    },
                )}
                style={style}
            >
                <div style={positionCorrectionStyle()}>
                    <Cubicles cubicleSize={cubicleSize} />
                    {cubeDimension > 1 && (
                        <CubeArrows
                            cubeDimension={cubeDimension}
                            size={cubeSize}
                            cubicleSize={cubicleSize}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

interface CubiclesProps {
    cubicleSize: number;
}

const Cubicles: React.FC<CubiclesProps> = React.memo(({ cubicleSize }) => {
    const cubicles = useRedux((state) => state.cube.cubicles);
    const rotationDuration = useRedux((state) => state.cube.rotationDuration);
    const currentRotationCommand = Maybe.of(
        useRedux((state) => state.player.currentCommand),
    );

    return (
        <div className="contents">
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
});

export default RubiksCube;
