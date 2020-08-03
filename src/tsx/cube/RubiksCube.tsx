import React from 'react';
import { useRedux } from '../states/States';
import { toCss, multiply, fromScale, fromTranslation } from '../utils/Matrix4';
import Cubicle from './Cubicle';
import './RubiksCube.scss';

const RubiksCube: React.FunctionComponent = () => {
    const cubicles = useRedux((state) => state.cube.cubicles);
    const cubeDimension = useRedux((state) => state.cube.dimension);
    const cubeSize = useRedux((state) => state.cube.size);
    const scale = useRedux((state) => state.cube.scale);
    const rotation = useRedux((state) => state.cube.rotation);

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
            <div className="rubiks-cube" style={style}>
                <div style={positionCorrectionStyle()}>
                    {cubicles.map(({ id, faces, transform }) => (
                        <Cubicle key={id} faces={faces} transform={transform} size={cubicleSize} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RubiksCube;
