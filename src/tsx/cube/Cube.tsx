import React, { useMemo } from 'react';
import { keys } from 'lodash';
import { defaultColors, Faces, Face, Dimensions } from './CubeUtils';

interface CubeProps {
    size: number;
    transform: Dimensions;
    colors?: Partial<Faces<string>>;
}

const Cube: React.FunctionComponent<CubeProps> = ({ size, transform, colors: colorProps = defaultColors }) => {
    const faces: Face[] = useMemo(() => {
        const colors: Faces<string> = {
            ...defaultColors,
            ...colorProps
        };

        const rotations: Faces<string> = {
            front: `translateZ(${size / 2}px)`,
            back: `translateZ(-${size / 2}px)`,
            right: `rotateY(90deg) translateZ(${size / 2}px)`,
            left: `rotateY(90deg) translateZ(-${size / 2}px)`,
            top: `rotateX(90deg) translateZ(${size / 2}px)`,
            bottom: `rotateX(90deg) translateZ(-${size / 2}px)`
        };

        return keys(rotations).map(face => ({
            rotation: rotations[face],
            color: colors[face]
        }));
    }, [colorProps]);

    const cubeStyle: React.CSSProperties = {
        transformStyle: 'preserve-3d',
        transform: `translate3d(${transform.x}px, ${transform.y}px, ${transform.z}px)`,
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
