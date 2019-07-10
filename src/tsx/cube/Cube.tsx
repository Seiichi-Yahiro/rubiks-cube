import React, { useMemo } from 'react';
import { keys } from 'lodash';
import { defaultColors, Dimensions, Face, Layer, Layers, Slerp } from './CubeUtils';
import useCubeAnimation from './useCubeAnimation';

interface CubeProps {
    size: number;
    translation: Dimensions;
    rotation: Slerp;
    colors?: Partial<Layers<string>>;
}

const Cube: React.FunctionComponent<CubeProps> = ({
    size,
    translation,
    rotation,
    colors: colorProps = defaultColors
}) => {
    const faces: Face[] = useMemo(() => {
        const colors: Layers<string> = {
            ...defaultColors,
            ...colorProps
        };

        const rotations: Layers<string> = {
            [Layer.FRONT]: `translateZ(${size / 2}px)`,
            [Layer.BACK]: `translateZ(-${size / 2}px)`,
            [Layer.RIGHT]: `rotateY(90deg) translateZ(${size / 2}px)`,
            [Layer.LEFT]: `rotateY(90deg) translateZ(-${size / 2}px)`,
            [Layer.UP]: `rotateX(90deg) translateZ(${size / 2}px)`,
            [Layer.DOWN]: `rotateX(90deg) translateZ(-${size / 2}px)`
        };

        return keys(rotations).map(face => ({
            rotation: rotations[face],
            color: colors[face]
        }));
    }, [colorProps, size]);

    const percent = useCubeAnimation(0.05, rotation);

    const cubeStyle: React.CSSProperties = {
        transformStyle: 'preserve-3d',
        transform: `matrix3d(${rotation(percent).toMatrix4()}) translate3d(${translation.x}px, ${translation.y}px, ${
            translation.z
        }px)`,
        width: size,
        height: size,
        position: 'absolute'
    };

    const faceStyle: React.CSSProperties = {
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: 5,
        border: '2px solid #333'
    };

    return (
        <div style={cubeStyle}>
            {faces.map(face => (
                <div
                    key={face.rotation}
                    style={{
                        ...faceStyle,
                        backgroundColor: face.color,
                        transform: `${face.rotation}`
                    }}
                />
            ))}
        </div>
    );
};

export default React.memo(Cube);
