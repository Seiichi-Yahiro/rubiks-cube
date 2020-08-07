import React from 'react';
import { identity, Mat4, toCss } from '../utils/Matrix4';
import { IFace } from './CubeTypes';
import Face from './Face';

interface ICubicleProps {
    faces: IFace[];
    animatedTransform: Mat4;
    transform: Mat4;
    size: number;
    rotationDuration: number;
}

const Cubicle: React.FunctionComponent<ICubicleProps> = ({
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

    return (
        <div className="rubiks-cube__cubicle" style={style}>
            {faces.map(({ id, transform, color }) => (
                <Face key={id} transform={transform} color={color} />
            ))}
        </div>
    );
};

export default React.memo(Cubicle);
