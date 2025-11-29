import { debounce } from 'es-toolkit';
import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useRedux } from 'src/hooks/redux';
import { cubeActions } from 'src/redux/cube/cubeActions';
import { PlayerStatus } from 'src/redux/player/playerReducer';
import CubeArrows from 'src/tsx/cube/CubeArrows';
import Cubicles from 'src/tsx/cube/Cubicles';
import cn from 'src/utils/cn';
import { fromTranslation, toCss } from 'src/utils/matrix4';

interface RubiksCubeProps {
    className?: string;
}

const maxCubeSize = 250;

const RubiksCube: React.FC<RubiksCubeProps> = ({ className }) => {
    const dispatch = useAppDispatch();
    const cubeDimension = useRedux((state) => state.cube.dimension);
    const cubeSize = useRedux((state) => state.cube.size);
    const rotation = useRedux((state) => state.cube.rotation);
    const isStopped = useRedux(
        (state) => state.player.status === PlayerStatus.STOPPED,
    );

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
                const cubeSize = Math.min(containerSize / 2, maxCubeSize);
                dispatch(cubeActions.setCubeSize(cubeSize));
            }, 50),
        );

        resizeObserver.observe(container.current);

        return () => resizeObserver.disconnect();
    }, [dispatch]);

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
            className={cn(
                'flex items-center justify-center p-2 [perspective:1000px]',
                className,
            )}
            style={{
                minHeight: maxCubeSize / 1.5,
                maxHeight: maxCubeSize * 2,
            }}
        >
            <div
                className={cn('relative [transform-style:preserve-3d]', {
                    'group/transitioning is-transitioning': !isStopped,
                })}
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

export default RubiksCube;
