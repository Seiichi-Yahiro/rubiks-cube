import React, { useMemo } from 'react';
import { keys } from 'lodash';
import { defaultColors } from './CubeUtils';
import useCubeAnimation from './useCubeAnimation';
import { Face, Layer, Layers, Slerp } from './CubeTypes';
import D3 from './D3';
import Arrows from './Arrows';
import Maybe from '../utils/Maybe';

interface CubeProps {
    size: number;
    translation: D3;
    rotation: Slerp;
    faceArrows: Layers<Maybe<[D3, D3]>>;
    rotate: (axis: D3) => void;
    colors?: Partial<Layers<string>>;
}

const Cube: React.FunctionComponent<CubeProps> = ({
    size,
    translation,
    rotation,
    faceArrows,
    rotate,
    colors: colorProps = defaultColors
}) => {
    const faces: Layers<Face> = useMemo(() => {
        const colors: Layers<string> = {
            ...defaultColors,
            ...colorProps
        };

        const halfCubeSize = size / 2;

        const rotations: Layers<string> = {
            [Layer.FRONT]: `translateZ(${halfCubeSize}px)`,
            [Layer.BACK]: `rotateY(180deg) translateZ(${halfCubeSize}px)`,
            [Layer.RIGHT]: `rotateY(90deg) translateZ(${halfCubeSize}px)`,
            [Layer.LEFT]: `rotateY(-90deg) translateZ(${halfCubeSize}px)`,
            [Layer.UP]: `rotateX(90deg) translateZ(${halfCubeSize}px)`,
            [Layer.DOWN]: `rotateX(-90deg) translateZ(${halfCubeSize}px)`
        };

        return keys(rotations)
            .map(
                face =>
                    ({
                        [face]: {
                            rotation: rotations[face],
                            color: colors[face],
                            arrowAxes: faceArrows[face]
                        }
                    } as Partial<Face>)
            )
            .reduce((a, b) => ({ ...a, ...b })) as Layers<Face>;
    }, [colorProps, size, faceArrows]);

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

    return (
        <div style={cubeStyle}>
            {keys(faces).map(face => {
                const { rotation: faceRotation, color, arrowAxes } = faces[face] as Face;

                return (
                    <Faces
                        key={faceRotation}
                        size={size}
                        color={color}
                        rotation={faceRotation}
                        rotate={rotate}
                        arrowAxes={arrowAxes}
                    />
                );
            })}
        </div>
    );
};

interface FaceProps {
    size: number;
    color: string;
    rotation: string;
    rotate: (axis: D3) => void;
    arrowAxes: Maybe<[D3, D3]>;
}

const Faces: React.FunctionComponent<FaceProps> = React.memo(({ size, color, rotation, rotate, arrowAxes }) => {
    const faceStyle: React.CSSProperties = {
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: 5,
        border: '2px solid #333'
    };

    return (
        <div
            style={{
                ...faceStyle,
                backgroundColor: color,
                transform: rotation
            }}
        >
            {arrowAxes.letOrElse(
                ([up, right]) => (
                    <Arrows
                        up={() => rotate(up)}
                        down={() => rotate(up.invert())}
                        right={() => rotate(right)}
                        left={() => rotate(right.invert())}
                    />
                ),
                undefined!
            )}
        </div>
    );
});

export default React.memo(Cube);
