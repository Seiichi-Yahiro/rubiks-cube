import D3 from './D3';
import Maybe from '../utils/Maybe';
import React from 'react';
import FaceArrows from './FaceArrows';

interface FacesProps {
    size: number;
    color: string;
    rotation: string;
    rotate: (axis: D3) => void;
    arrowAxes: Maybe<[D3, D3]>;
}

const Faces: React.FunctionComponent<FacesProps> = ({ size, color, rotation, rotate, arrowAxes }) => {
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
                    <FaceArrows
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
};

export default React.memo(Faces);
