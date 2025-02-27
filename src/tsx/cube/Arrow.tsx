import React from 'react';
import cn from 'src/utils/cn';

interface IArrowProps {
    style?: React.CSSProperties;
    className?: string;
}

const Arrow: React.FC<IArrowProps> = ({ style, className = '' }) => (
    <g
        style={style}
        className={cn(
            'stroke-app-text stroke-[4px] transition-opacity duration-300 [stroke-linecap:round]',
            className,
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
