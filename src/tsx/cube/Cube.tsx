import React, { useMemo } from 'react';
import { keys } from 'lodash';
import { defaultColors, rotations, Faces, Face, Dimensions } from './CubeUtils';

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

        return keys(rotations).map(face => ({
            rotation: rotations[face],
            color: colors[face]
        }));
    }, [colorProps]);

    const cubeFaceStyle: React.CSSProperties = {
        position: 'absolute',
        width: size,
        height: size,
        backgroundColor: 'black'
    };

    const cubeStickerStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        borderRadius: 15
    };

    return (
        <div
            style={{
                transformStyle: 'preserve-3d',
                transform: `translate3d(${transform.x}px, ${transform.y}px, ${transform.z}px)`
            }}
        >
            {faces.map(face => (
                <div
                    key={face.rotation}
                    style={{
                        ...cubeFaceStyle,
                        transform: `${face.rotation} translateZ(${size / 2}px)`
                    }}
                >
                    <div
                        style={{
                            ...cubeStickerStyle,
                            backgroundColor: face.color
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export default React.memo(Cube);
