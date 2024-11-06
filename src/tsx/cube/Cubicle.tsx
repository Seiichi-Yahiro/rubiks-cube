import React from 'react';
import { Mat4, toCss } from 'src/utils/matrix4';
import { CubeAxis, IFace } from 'src/tsx/cube/cubeTypes';
import Face from 'src/tsx/cube/Face';
import { generateFaceArrowCommand } from 'src/tsx/cube/cubeUtils';

export const cubicleClassname = 'cubicle';

interface ICubicleProps {
    axis: CubeAxis;
    faces: IFace[];
    animatedTransform: string;
    transform: Mat4;
    size: number;
    rotationDuration: number;
}

const Cubicle: React.FC<ICubicleProps> = ({
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
        <div
            className={`${cubicleClassname} absolute [transform-style:preserve-3d]`}
            style={style}
        >
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
