import React, { useState } from 'react';
import { Color } from './CubeTypes';
import { Mat4, toCss } from '../utils/Matrix4';
import FaceArrows from './FaceArrows';

interface IFaceProps {
    transform: Mat4;
    color: Color;
}

const Face: React.FunctionComponent<IFaceProps> = ({ transform, color }) => {
    const [isHovered, setHovered] = useState(false);

    const onMouseEnter = () => setHovered(true);
    const onMouseLeave = () => setHovered(false);

    const style: React.CSSProperties = {
        backgroundColor: color,
        transform: toCss(transform),
    };

    return (
        <div className="rubiks-cube__face" style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {isHovered && color !== Color.DEFAULT && color !== Color.TRANSPARENT && (
                <FaceArrows up={() => void 0} down={() => void 0} right={() => void 0} left={() => void 0} />
            )}
        </div>
    );
};

export default React.memo(Face);
