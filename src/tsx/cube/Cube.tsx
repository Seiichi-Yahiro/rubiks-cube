import React from 'react';
import { cubeIsTransitioning } from './CubeUtils';
import { IFace } from './CubeTypes';
import D3, { D3Group } from './D3';
import Maybe from '../utils/Maybe';
import Quaternion from 'quaternion';
import Faces from './Faces';
import createClassName from '../utils/createClassName';
import { useGlobalState } from '../states/State';

interface ICubeProps {
    size: number;
    faces: IFace[];
    translation: D3;
    rotation: Quaternion;
    rotationAnimation: Maybe<D3>;
    rotate: (axis: D3Group) => void;
}

const Cube: React.FunctionComponent<ICubeProps> = ({
    size,
    faces,
    translation,
    rotation,
    rotationAnimation,
    rotate
}) => {
    const [{ rotationAnimationSpeed }] = useGlobalState();

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
        <div
            className={createClassName({
                [cubeIsTransitioning]: rotationAnimation.isSome()
            })}
            style={cubeStyle}
        >
            {faces.map(face => (
                <Faces
                    key={face.rotation}
                    size={size}
                    color={face.color}
                    rotation={face.rotation}
                    rotate={rotate}
                    arrowAxes={face.arrowAxes}
                />
            ))}
        </div>
    );
};

export default React.memo(Cube);
