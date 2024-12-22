import React from 'react';
import cn from 'src/utils/cn';

interface ChipProps {
    className?: string;
    children: React.ReactNode;
    variant: 'primary' | 'error';
}

const Chip: React.FC<ChipProps> = ({ className, children, variant }) => (
    <div
        className={cn(
            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs text-app-text-inverted',
            {
                'bg-cube-blue': variant === 'primary',
                'bg-cube-red': variant === 'error',
            },
            className,
        )}
    >
        {children}
    </div>
);

export default Chip;
