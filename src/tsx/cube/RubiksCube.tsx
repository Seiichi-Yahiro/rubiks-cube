import React from 'react';
import { useRedux } from '../states/States';
import { toCss, multiply, fromScale, fromTranslation } from '../utils/Matrix4';
import Cubicle from './Cubicle';
import './RubiksCube.scss';
import Maybe from '../utils/Maybe';
import { rotationCommandToCssRotation } from './algorithms/RotationCommand';
import createClassName from '../utils/createClassName';

const RubiksCube: React.FunctionComponent = () => {
    const cubicles = useRedux((state) => state.cube.cubicles);
    const cubeDimension = useRedux((state) => state.cube.dimension);
    const cubeSize = useRedux((state) => state.cube.size);
    const scale = useRedux((state) => state.cube.scale);
    const rotation = useRedux((state) => state.cube.rotation);
    const rotationDuration = useRedux((state) => state.cube.rotationDuration);
    const currentRotationCommand = Maybe.of(
        useRedux((state) => state.player.currentCommand)
    );

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
        <div className="app__cube">
            <div
                className={createClassName('rubiks-cube', {
                    'rubiks-cube--is-transitioning': currentRotationCommand.isSome(),
                })}
                style={style}
            >
                <div style={positionCorrectionStyle()}>
                    {cubicles.map(({ id, faces, transform, axis }) => {
                        const animatedTransform = currentRotationCommand
                            .filter(({ axis: rotationAxis, slices }) =>
                                slices.includes(axis[rotationAxis])
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
            </div>
        </div>
    );
};

export default RubiksCube;
