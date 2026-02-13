import React from 'react';
import { CubeAxis, IFace } from 'src/tsx/cube/cubeTypes';
import { generateFaceArrowCommand } from 'src/tsx/cube/cubeUtils';
import Face from 'src/tsx/cube/Face';
import { Mat4, toCss } from 'src/utils/matrix4';

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
    transform: cubicleTransform,
    size,
    rotationDuration,
}) => {
    const style: React.CSSProperties = {
        transform: animatedTransform + toCss(cubicleTransform),
        width: size,
        height: size,
        transition:
            animatedTransform === 'rotate(0)'
                ? ''
                : `transform ${rotationDuration}ms`,
    };

    return (
        <div
            className={`${cubicleClassname} absolute [transform-style:preserve-3d]`}
            style={style}
        >
            {faces.map(({ id, transform: faceTransform, colorKey }) => (
                <Face
                    key={id}
                    transform={faceTransform}
                    colorKey={colorKey}
                    generateArrowCommand={(faceArrow) =>
                        generateFaceArrowCommand(
                            axis,
                            cubicleTransform,
                            id,
                            faceArrow,
                        )
                    }
                />
            ))}
        </div>
    );
};

export default React.memo(Cubicle);
