import React, {
    type ButtonHTMLAttributes,
    type MouseEvent as ReactMouseEvent,
    useCallback,
    useMemo,
} from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from 'src/tsx/components/Tooltip';
import cn from 'src/utils/cn';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    tooltip: string;
    tooltipSide?: 'top' | 'right' | 'bottom' | 'left';
}

const IconButton: React.FC<IconButtonProps> = ({
    className,
    children,
    disabled,
    onClick,
    tooltip,
    tooltipSide,
    ...props
}) => {
    const click = useCallback(
        (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
            if (!disabled) {
                onClick?.(event);
            }
        },
        [onClick, disabled],
    );

    const classNames = useMemo(
        () =>
            cn(
                'relative inline-flex size-8 cursor-pointer items-center justify-center p-1 *:fill-cube-gray *:stroke-cube-gray focus-visible:outline-none',

                'before:absolute before:size-full before:rounded-full hover:before:bg-cube-gray/10 focus-visible:before:bg-cube-gray/10 active:before:bg-cube-gray/20 focus-visible:motion-safe:before:animate-breath',

                'after:absolute after:size-full after:scale-110 after:rounded-full after:bg-transparent after:transition-all after:duration-500 after:ease-out',

                'active:after:scale-0 active:after:bg-cube-gray/50 active:after:transition-none',

                {
                    'cursor-default *:fill-disabled *:stroke-disabled hover:before:bg-transparent active:before:bg-transparent':
                        disabled,
                },

                className,
            ),
        [disabled, className],
    );

    return (
        <Tooltip>
            <TooltipTrigger asChild={true}>
                <button
                    className={classNames}
                    aria-disabled={disabled}
                    onClick={click}
                    {...props}
                >
                    {children}
                </button>
            </TooltipTrigger>
            <TooltipContent side={tooltipSide}>{tooltip}</TooltipContent>
        </Tooltip>
    );
};

export default React.memo(IconButton);
