import React from 'react';
import './Arrows.scss';
import Arrow from './Arrow';

interface ArrowsProps {
    up: () => void;
    down: () => void;
    right: () => void;
    left: () => void;
}

const FaceArrows: React.FunctionComponent<ArrowsProps> = ({ up, down, right, left }) => (
    <svg viewBox="0 0 100 100" className="face-arrows-svg">
        <g style={{ transform: 'translate(50%, 50%)' }}>
            <FaceArrow direction={FaceArrowDirection.UP} onClick={up} />
            <FaceArrow direction={FaceArrowDirection.DOWN} onClick={down} />
            <FaceArrow direction={FaceArrowDirection.RIGHT} onClick={right} />
            <FaceArrow direction={FaceArrowDirection.LEFT} onClick={left} />
        </g>
    </svg>
);

export enum FaceArrowDirection {
    UP = '180deg',
    LEFT = '90deg',
    RIGHT = '-90deg',
    DOWN = '0deg'
}

interface ArrowProps {
    direction: FaceArrowDirection;
    onClick: () => void;
}

const FaceArrow: React.FC<ArrowProps> = ({ direction, onClick }) => (
    <g className="face-arrow-wrapper" style={{ transform: `rotate(${direction})` }} onClick={onClick}>
        <rect className="face-arrow-wrapper__box" />
        <Arrow className="face-arrow" />
    </g>
);

export default FaceArrows;