import React from 'react';
import './Arrows.scss';
import Arrow from './Arrow';
import { FaceArrowDirection } from './CubeTypes';

interface IArrowsProps {
    rotate: (faceArrow: FaceArrowDirection) => void;
}

const FaceArrows: React.FunctionComponent<IArrowsProps> = ({ rotate }) => (
    <svg viewBox="0 0 100 100" className="face-arrows-svg">
        <g className="face-arrows-wrapper">
            <FaceArrow direction={FaceArrowDirection.UP} rotate={rotate} />
            <FaceArrow direction={FaceArrowDirection.DOWN} rotate={rotate} />
            <FaceArrow direction={FaceArrowDirection.LEFT} rotate={rotate} />
            <FaceArrow direction={FaceArrowDirection.RIGHT} rotate={rotate} />
        </g>
    </svg>
);

interface IArrowProps {
    direction: FaceArrowDirection;
    rotate: (faceArrow: FaceArrowDirection) => void;
}

const FaceArrow: React.FC<IArrowProps> = ({ direction, rotate }) => (
    <g
        className="face-arrow-wrapper"
        style={{ transform: `rotate(${direction}deg)` }}
        onClick={() => rotate(direction)}
    >
        <rect width="100%" height="100%" className="face-arrow-wrapper__box" />
        <Arrow className="face-arrow" />
    </g>
);

export default FaceArrows;
