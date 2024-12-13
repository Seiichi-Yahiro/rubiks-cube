import React, {
    type ButtonHTMLAttributes,
    type MouseEvent as ReactMouseEvent,
    useCallback,
    useMemo,
} from 'react';
import {
    Tooltip,
    ToolTipArrow,
    TooltipContent,
    TooltipTrigger,
} from 'src/tsx/components/Tooltip';
import cn from 'src/utils/cn';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    tooltip?: string;
    tooltipSide?: 'top' | 'right' | 'bottom' | 'left';
    disableFill?: boolean;
}

const IconButton: React.FC<IconButtonProps> = React.forwardRef<
    HTMLButtonElement,
    IconButtonProps
>(
    (
        {
            className,
            children,
            disabled,
            onClick,
            tooltip,
            tooltipSide,
            disableFill = false,
            ...props
        },
        ref,
    ) => {
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
                    'relative inline-flex size-8 cursor-pointer items-center justify-center p-1 *:stroke-cube-gray focus-visible:outline-none',

                    'before:absolute before:size-full before:rounded-full hover:before:bg-cube-gray/10 focus-visible:before:bg-cube-gray/10 active:before:bg-cube-gray/20 focus-visible:motion-safe:before:animate-breath',

                    'after:absolute after:size-full after:scale-110 after:rounded-full after:bg-transparent after:transition-all after:duration-500 after:ease-out after:motion-reduce:scale-0',

                    'active:after:scale-0 active:after:bg-cube-gray/50 active:after:transition-none',

                    {
                        '*:fill-cube-gray': !disableFill,
                        '*:fill-disabled': disabled && !disableFill,
                        'cursor-default *:stroke-disabled hover:before:bg-transparent active:before:bg-transparent':
                            disabled,
                    },

                    className,
                ),
            [disabled, disableFill, className],
        );

        const button = (
            <button
                ref={ref}
                className={classNames}
                aria-disabled={disabled}
                onClick={click}
                {...props}
            >
                {children}
            </button>
        );

        return tooltip ? (
            <Tooltip>
                <TooltipTrigger asChild={true}>{button}</TooltipTrigger>
                <TooltipContent side={tooltipSide}>
                    <ToolTipArrow />
                    <span>{tooltip}</span>
                </TooltipContent>
            </Tooltip>
        ) : (
            button
        );
    },
);
IconButton.displayName = 'IconButton';

export default React.memo(IconButton);
