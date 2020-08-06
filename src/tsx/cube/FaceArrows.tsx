import React from 'react';
import './Arrows.scss';
import Arrow from './Arrow';

interface IArrowsProps {
    up: () => void;
    down: () => void;
    left: () => void;
    right: () => void;
}

const FaceArrows: React.FunctionComponent<IArrowsProps> = ({
    up,
    down,
    right,
    left,
}) => (
    <svg viewBox="0 0 100 100" className="face-arrows-svg">
        <g className="face-arrows-wrapper">
            <FaceArrow direction={FaceArrowDirection.UP} onClick={up} />
            <FaceArrow direction={FaceArrowDirection.DOWN} onClick={down} />
            <FaceArrow direction={FaceArrowDirection.LEFT} onClick={left} />
            <FaceArrow direction={FaceArrowDirection.RIGHT} onClick={right} />
        </g>
    </svg>
);

export enum FaceArrowDirection {
    UP = '180deg',
    LEFT = '90deg',
    RIGHT = '-90deg',
    DOWN = '0deg',
}

interface IArrowProps {
    direction: FaceArrowDirection;
    onClick: () => void;
}

const FaceArrow: React.FC<IArrowProps> = ({ direction, onClick }) => (
    <g
        className="face-arrow-wrapper"
        style={{ transform: `rotate(${direction})` }}
        onClick={onClick}
    >
        <rect width="100%" height="100%" className="face-arrow-wrapper__box" />
        <Arrow className="face-arrow" />
    </g>
);

export default FaceArrows;
