import React from 'react';
import { identity, Mat4, toCss } from '../utils/Matrix4';
import { CubeAxis, IFace } from './CubeTypes';
import Face from './Face';
import { generateFaceArrowCommand } from './CubeUtils';

interface ICubicleProps {
    axis: CubeAxis;
    faces: IFace[];
    animatedTransform: Mat4;
    transform: Mat4;
    size: number;
    rotationDuration: number;
}

const Cubicle: React.FunctionComponent<ICubicleProps> = ({
    axis,
    faces,
    animatedTransform,
    transform,
    size,
    rotationDuration,
}) => {
    const style: React.CSSProperties = {
        transform: toCss(animatedTransform) + toCss(transform),
        width: size,
        height: size,
        transition:
            animatedTransform === identity
                ? ''
                : `transform ${rotationDuration}ms`,
    };

    const generateArrowCommand = generateFaceArrowCommand(axis, transform);

    return (
        <div className="rubiks-cube__cubicle" style={style}>
            {faces.map(({ id, transform, color }) => (
                <Face
                    key={id}
                    transform={transform}
                    color={color}
                    generateArrowCommand={generateArrowCommand(id)}
                />
            ))}
        </div>
    );
};

export default React.memo(Cubicle);
