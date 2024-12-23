import React from 'react';
import Arrow from 'src/tsx/cube/Arrow';
import { FaceArrowDirection } from 'src/tsx/cube/cubeTypes';

interface IArrowsProps {
    rotate: (faceArrow: FaceArrowDirection) => void;
}

const FaceArrows: React.FC<IArrowsProps> = ({ rotate }) => (
    <svg
        viewBox="0 0 100 100"
        className="group-[.is-transitioning]/transitioning:hidden"
    >
        <g className="[transform:translate(50%,50%)]">
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
        className="group cursor-pointer [pointer-events:all]"
        style={{ transform: `rotate(${direction}deg)` }}
        onClick={() => rotate(direction)}
    >
        <rect
            width="100%"
            height="100%"
            style={{
                transform: 'translateX(-50%) scale(0.4) translateY(-50%)',
            }}
            className="h-full w-full origin-center fill-transparent stroke-transparent"
        />
        <Arrow
            style={{
                transform:
                    'translateY(50%) scale(0.4) translateY(-50%) rotate(180deg)',
            }}
            className="opacity-0 group-hover:opacity-100 pointer-coarse:opacity-100"
        />
    </g>
);

export default FaceArrows;
