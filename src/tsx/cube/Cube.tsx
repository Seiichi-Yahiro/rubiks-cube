import React, { useMemo } from 'react';
import { keys } from 'lodash';
import { defaultColors, cubeIsTransitioning } from './CubeUtils';
import { IFace, IFaces } from './CubeTypes';
import D3, { D3Group } from './D3';
import Maybe from '../utils/Maybe';
import Quaternion from 'quaternion';
import Faces from './Faces';
import createClassName from '../utils/createClassName';
import { useGlobalState } from '../states/State';

interface ICubeProps {
    size: number;
    translation: D3;
    rotation: Quaternion;
    rotationAnimation: Maybe<D3>;
    faceArrows: IFaces<Maybe<[D3, D3]>>;
    rotate: (axis: D3Group) => void;
    colors: Partial<IFaces<string>>;
}

const Cube: React.FunctionComponent<ICubeProps> = ({
    size,
    translation,
    rotation,
    rotationAnimation,
    faceArrows,
    rotate,
    colors
}) => {
    const [{ rotationAnimationSpeed }] = useGlobalState();

    const faceRotations = useMemo(() => {
        const halfCubeSize = size / 2;

        return {
            FRONT: `translateZ(${halfCubeSize}px)`,
            BACK: `rotateY(180deg) translateZ(${halfCubeSize}px)`,
            RIGHT: `rotateY(90deg) translateZ(${halfCubeSize}px)`,
            LEFT: `rotateY(-90deg) translateZ(${halfCubeSize}px)`,
            UP: `rotateX(90deg) translateZ(${halfCubeSize}px)`,
            DOWN: `rotateX(-90deg) translateZ(${halfCubeSize}px)`
        } as IFaces<string>;
    }, [size]);

    const faceColors: IFaces<IFace> = useMemo(
        () =>
            (({
                ...defaultColors,
                ...colors
            } as unknown) as IFaces<IFace>),
        [colors]
    );

    const rotationMatrix3d = rotation.toMatrix4().map(Math.round);
    const rotate3d = rotationAnimation.map(it => it.toVector().join(',')).unwrapOr('0,0,0');

    const cubeStyle: React.CSSProperties = {
        transformStyle: 'preserve-3d',
        transform: `matrix3d(${rotationMatrix3d}) rotate3d(${rotate3d}, 90deg) translate3d(${translation.x}px, ${translation.y}px, ${translation.z}px)`,
        width: size,
        height: size,
        position: 'absolute',
        transition: rotationAnimation.isSome() ? `transform ${rotationAnimationSpeed}ms` : 'unset'
    };

    return (
        <div
            className={createClassName({
                [cubeIsTransitioning]: rotationAnimation.isSome()
            })}
            style={cubeStyle}
        >
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
