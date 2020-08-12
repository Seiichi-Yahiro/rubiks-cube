import React from 'react';
import { Mat4, toCss } from '../utils/Matrix4';
import { CubeAxis, IFace } from './CubeTypes';
import Face from './Face';
import { generateFaceArrowCommand } from './CubeUtils';

interface ICubicleProps {
    axis: CubeAxis;
    faces: IFace[];
    animatedTransform: string;
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
        transform: animatedTransform + toCss(transform),
        width: size,
        height: size,
        transition:
            animatedTransform === 'rotate(0)'
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
