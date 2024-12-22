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
                    'relative inline-flex size-8 cursor-pointer items-center justify-center p-1 *:stroke-app-text *:stroke-[1.5] focus-visible:outline-none',

                    'before:absolute before:size-full before:rounded-full hover:before:bg-app-bg-hover focus-visible:before:bg-app-bg-hover active:before:bg-app-bg-active focus-visible:motion-safe:before:animate-breath',

                    'after:absolute after:size-full after:scale-110 after:rounded-full after:bg-transparent after:transition-all after:duration-500 after:ease-out after:motion-reduce:scale-0',

                    'active:after:scale-0 active:after:bg-app-bg-ripple active:after:transition-none',

                    {
                        'cursor-default *:stroke-app-text-disabled hover:before:bg-transparent active:before:bg-transparent':
                            disabled,
                    },

                    className,
                ),
            [disabled, className],
        );

        const button = (
            <button
                ref={ref}
                className={classNames}
                aria-label={tooltip}
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
