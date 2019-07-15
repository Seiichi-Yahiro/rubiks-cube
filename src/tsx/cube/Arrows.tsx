import React from 'react';
import './Arrows.scss';

interface ArrowsProps {
    up: () => void;
    down: () => void;
    right: () => void;
    left: () => void;
}

const Arrows: React.FunctionComponent<ArrowsProps> = ({ up, down, right, left }) => {
    return (
        <svg viewBox="0 0 100 100">
            <g style={{ transform: 'translate(50%, 50%)' }}>
                <Arrow direction={ArrowDirection.UP} onClick={up} />
                <Arrow direction={ArrowDirection.DOWN} onClick={down} />
                <Arrow direction={ArrowDirection.RIGHT} onClick={right} />
                <Arrow direction={ArrowDirection.LEFT} onClick={left} />
            </g>
        </svg>
    );
};

export enum ArrowDirection {
    UP = '180deg',
    LEFT = '90deg',
    RIGHT = '-90deg',
    DOWN = '0deg'
}

interface ArrowProps {
    direction: ArrowDirection;
    onClick: () => void;
}

const Arrow: React.FC<ArrowProps> = ({ direction, onClick }) => {
    return (
        <g className="arrow-wrapper" style={{ transform: `rotate(${direction})` }} onClick={onClick}>
            <rect className="arrow-wrapper__box" />
            <g className="arrow">
                <line x1={0} y1={40} x2={0} y2={-40} />
                <line x1={0} y1={-40} x2={-40} y2={0} />
                <line x1={0} y1={-40} x2={-40} y2={0} style={{ transform: 'scale(-1, 1)' }} />
            </g>
        </g>
    );
};

export default Arrows;
