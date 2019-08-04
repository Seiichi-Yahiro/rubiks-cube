import D3, { D3Group } from './D3';
import React from 'react';
import FaceArrows from './FaceArrows';

interface IFacesProps {
    size: number;
    color: string;
    transform: string;
    rotate: (axis: D3Group) => void;
    arrowAxes: D3[];
}

const Face: React.FunctionComponent<IFacesProps> = ({ size, color, transform, rotate, arrowAxes }) => {
    const faceStyle: React.CSSProperties = {
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: 5,
        border: '2px solid #333'
    };

    const [up, right] = arrowAxes;

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

export default React.memo(Face);
