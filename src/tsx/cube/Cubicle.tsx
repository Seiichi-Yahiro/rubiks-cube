import React from 'react';
import { Mat4, toCss } from '../utils/Matrix4';
import { IFace } from './CubeTypes';
import Face from './Face';

interface ICubicleProps {
    faces: IFace[];
    transform: Mat4;
    size: number;
}

const Cubicle: React.FunctionComponent<ICubicleProps> = ({
    faces,
    transform,
    size,
}) => {
    const style: React.CSSProperties = {
        transform: toCss(transform),
        width: size,
        height: size,
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
