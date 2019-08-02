import D3, { D3Group } from './D3';
import React from 'react';
import FaceArrows from './FaceArrows';
import { useGlobalState } from '../states/State';
import { ViewType } from './CubeTypes';

interface IFacesProps {
    size: number;
    axes: D3;
    side: D3;
    color: string;
    rotation: string;
    rotate: (axis: D3Group) => void;
    arrowAxes: D3[];
}

const sides = (numberOfCubes: number, size: number, axes: D3, side: D3) => {
    const sizeOfCube = size / numberOfCubes;
    const offset = sizeOfCube * (numberOfCubes / 2 - 0.5);

    const sideTransform = {
        '(-1,0,0)': `translate3d(-${size}px, 0, 0) rotateZ(90deg)`,
        '(1,0,0)': `scale(-1, 1) translate3d(-${size}px, 0, 0) rotateZ(90deg)`,
        '(0,-1,0)': `scale(1, -1) translate3d(0, ${size}px, 0)`,
        '(0,1,0)': `translate3d(0, ${size}px, 0)`,
        '(0,0,-1)': 'translate3d(0, 0, 0)',
        '(0,0,1)': `translate3d(0, ${2 * size}px, 0) scale(1, -1)`
    }[side.toString()];

    const [x, y] = side
        .map(it => (it === 0 ? 1 : 0))
        .mul(axes)
        .toVector()
        .filter(it => it !== 0);

    const xTranslate = (x - 1) * sizeOfCube - offset;
    const yTranslate = (y - 1) * sizeOfCube - offset;

    return `${sideTransform} translate3d(${xTranslate}px, ${yTranslate}px, 0)`;
};

const Faces: React.FunctionComponent<IFacesProps> = ({ size, color, rotation, rotate, arrowAxes, side, axes }) => {
    const [{ view, numberOfCubes, cubeSize }] = useGlobalState();

    const faceStyle: React.CSSProperties = {
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: 5,
        border: '2px solid #333'
    };

    const [up, right] = arrowAxes;

    const transform = view === ViewType.D3 ? rotation : sides(numberOfCubes, cubeSize, axes, side);

    return (
        <div
            style={{
                ...faceStyle,
                backgroundColor: color,
                transform
            }}
        >
            {up && right && (
                <FaceArrows
                    up={() => rotate([up])}
                    down={() => rotate([up.invert()])}
                    right={() => rotate([right])}
                    left={() => rotate([right.invert()])}
                />
            )}
        </div>
    );
};

export default React.memo(Faces);
