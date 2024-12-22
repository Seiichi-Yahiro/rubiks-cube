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
                'bg-app-bg-highlighted': variant === 'primary',
                'bg-app-bg-error': variant === 'error',
            },
            className,
        )}
    >
        {children}
    </div>
);

export default Chip;
