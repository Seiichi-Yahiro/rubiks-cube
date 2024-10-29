import React from 'react';
import createClassName from '../utils/createClassName';

interface IArrowProps {
    style?: React.CSSProperties;
    className?: string;
}

const Arrow: React.FC<IArrowProps> = ({ style, className = '' }) => (
    <g
        style={style}
        className={createClassName(
            'stroke-arrow-gray stroke-[4px] [stroke-linecap:round] transition-opacity duration-300',
            className
        )}
    >
        <line x1={0} y1={40} x2={0} y2={-40} />
        <line x1={0} y1={-40} x2={-40} y2={0} />
        <line
            x1={0}
            y1={-40}
            x2={-40}
            y2={0}
            style={{ transform: 'scale(-1, 1)' }}
        />
    </g>
);

export default React.memo(Arrow);
