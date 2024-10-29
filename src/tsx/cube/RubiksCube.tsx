import React from 'react';
import { useRedux } from '../states/States';
import { fromScale, fromTranslation, multiply, toCss } from '../utils/Matrix4';
import Cubicle from './Cubicle';
import Maybe from '../utils/Maybe';
import { rotationCommandToCssRotation } from './algorithms/RotationCommand';
import createClassName from '../utils/createClassName';
import { canApplyRotationCommand } from './CubeUtils';
import CubeArrows from './CubeArrows';
import { PlayerStatus } from '../states/player/PlayerState';

const RubiksCube: React.FunctionComponent = () => {
    const cubeDimension = useRedux((state) => state.cube.dimension);
    const cubeSize = useRedux((state) => state.cube.size);
    const scale = useRedux((state) => state.cube.scale);
    const rotation = useRedux((state) => state.cube.rotation);
    const isStopped =
        useRedux((state) => state.player.status) === PlayerStatus.STOPPED;

    const cubicleSize = cubeSize / cubeDimension;

    const style: React.CSSProperties = {
        width: cubeSize,
        height: cubeSize,
        transform: toCss(multiply(rotation, fromScale(scale))),
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
        <div className="[perspective:1000px]">
            <div
                className={createClassName(
                    'relative [transform-style:preserve-3d]',
                    {
                        'group/transitioning is-transitioning': !isStopped,
                    }
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

const Cubicles: React.FunctionComponent<CubiclesProps> = React.memo(
    ({ cubicleSize }) => {
        const cubicles = useRedux((state) => state.cube.cubicles);
        const rotationDuration = useRedux(
            (state) => state.cube.rotationDuration
        );
        const currentRotationCommand = Maybe.of(
            useRedux((state) => state.player.currentCommand)
        );

        return (
            <div className="contents">
                {cubicles.map(({ id, faces, transform, axis }) => {
                    const animatedTransform = currentRotationCommand
                        .filter((command) =>
                            canApplyRotationCommand(axis, command)
                        )
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
    }
);

export default RubiksCube;
