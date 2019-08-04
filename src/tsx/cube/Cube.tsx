import React, { useMemo } from 'react';
import { calculate3DCubePosition, cubeIsTransitioning } from './CubeUtils';
import { IFace, Side } from './CubeTypes';
import D3, { D3Group } from './D3';
import Maybe from '../utils/Maybe';
import Quaternion from 'quaternion';
import Face from './Face';
import createClassName from '../utils/createClassName';
import { useGlobalState } from '../states/State';

interface ICubeProps {
    id: D3;
    size: number;
    faces: IFace[];
    getFaceTransform: (side: Side) => string;
    rotation: Quaternion;
    rotationAnimation: Maybe<D3>;
    rotate: (axis: D3Group) => void;
}

const Cube: React.FunctionComponent<ICubeProps> = ({
    id,
    size,
    faces,
    getFaceTransform,
    rotation,
    rotationAnimation,
    rotate
}) => {
    const [{ rotationAnimationSpeed, numberOfCubes, cubeSize }] = useGlobalState();

    const rotationMatrix3d = rotation.toMatrix4().map(Math.round);
    const rotate3d = rotationAnimation.let(it => it.toVector().join(',')).getOrElse('0,0,0');
    const translate3d = useMemo(
        () =>
            calculate3DCubePosition(id, numberOfCubes, cubeSize / numberOfCubes)
                .toVector()
                .map(it => it + 'px')
                .join(','),
        [numberOfCubes, cubeSize]
    );
    const transform = `matrix3d(${rotationMatrix3d}) rotate3d(${rotate3d}, 90deg) translate3d(${translate3d})`;

    const cubeStyle: React.CSSProperties = {
        transformStyle: 'preserve-3d',
        transform,
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
                <Face
                    key={face.side}
                    size={size}
                    color={face.color}
                    rotate={rotate}
                    arrowAxes={face.arrowAxes}
                    transform={getFaceTransform(face.side)}
                />
            ))}
        </div>
    );
};

export default React.memo(Cube);
