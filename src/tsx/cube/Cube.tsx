import React, { useContext, useMemo } from 'react';
import { keys } from 'lodash';
import { defaultColors, cubeIsTransitioning } from './CubeUtils';
import { Face, Layer, Layers } from './CubeTypes';
import D3 from './D3';
import Maybe from '../utils/Maybe';
import Quaternion from 'quaternion';
import { settingsContext } from '../context/SettingsContext';
import Faces from './Faces';
import createClassName from '../utils/createClassName';

interface CubeProps {
    size: number;
    translation: D3;
    rotation: Quaternion;
    rotationAnimation: Maybe<D3>;
    faceArrows: Layers<Maybe<[D3, D3]>>;
    rotate: (axis: D3) => void;
    colors: Partial<Layers<string>>;
}

const Cube: React.FunctionComponent<CubeProps> = ({
    size,
    translation,
    rotation,
    rotationAnimation,
    faceArrows,
    rotate,
    colors
}) => {
    const { rotationAnimationSpeed } = useContext(settingsContext);

    const faceRotations = useMemo(() => {
        const halfCubeSize = size / 2;

        return {
            [Layer.FRONT]: `translateZ(${halfCubeSize}px)`,
            [Layer.BACK]: `rotateY(180deg) translateZ(${halfCubeSize}px)`,
            [Layer.RIGHT]: `rotateY(90deg) translateZ(${halfCubeSize}px)`,
            [Layer.LEFT]: `rotateY(-90deg) translateZ(${halfCubeSize}px)`,
            [Layer.UP]: `rotateX(90deg) translateZ(${halfCubeSize}px)`,
            [Layer.DOWN]: `rotateX(-90deg) translateZ(${halfCubeSize}px)`
        } as Layers<string>;
    }, [size]);

    const faceColors: Layers<Face> = useMemo(
        () =>
            (({
                ...defaultColors,
                ...colors
            } as unknown) as Layers<Face>),
        [colors]
    );

    const rotationMatrix3d = rotation.toMatrix4().map(Math.round);
    const rotate3d = rotationAnimation.let(it => it.toVector().join(',')).getOrElse('0,0,0');

    const cubeStyle: React.CSSProperties = {
        transformStyle: 'preserve-3d',
        transform: `matrix3d(${rotationMatrix3d}) rotate3d(${rotate3d}, 90deg) translate3d(${translation.x}px, ${translation.y}px, ${translation.z}px)`,
        width: size,
        height: size,
        position: 'absolute',
        transition: rotationAnimation.isSome() ? `transform ${rotationAnimationSpeed}ms` : 'unset'
    };

    return (
        <div className={createClassName({ [cubeIsTransitioning]: rotationAnimation.isSome() })} style={cubeStyle}>
            {keys(faceRotations).map(key => (
                <Faces
                    key={faceRotations[key]}
                    size={size}
                    color={faceColors[key]}
                    rotation={faceRotations[key]}
                    rotate={rotate}
                    arrowAxes={faceArrows[key]}
                />
            ))}
        </div>
    );
};

export default React.memo(Cube);
