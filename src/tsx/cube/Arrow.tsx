import React from 'react';
import createClassName from '../utils/createClassName';

interface IArrowProps {
    className?: string;
}

const Arrow: React.FC<IArrowProps> = ({ className = '' }) => (
    <g className={createClassName('arrow', className)}>
        <line x1={0} y1={40} x2={0} y2={-40} />
        <line x1={0} y1={-40} x2={-40} y2={0} />
        <line x1={0} y1={-40} x2={-40} y2={0} style={{ transform: 'scale(-1, 1)' }} />
    </g>
);

export default React.memo(Arrow);
