import React, {
    type ButtonHTMLAttributes,
    type MouseEvent as ReactMouseEvent,
    useCallback,
    useMemo,
} from 'react';
import cn from 'src/utils/cn';

const IconButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
    className,
    children,
    disabled,
    onClick,
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
                'relative inline-flex size-8 items-center justify-center p-1 outline-none *:fill-cube-gray *:stroke-cube-gray',

                'before:absolute before:size-full before:rounded-full hover:before:bg-cube-gray/10 focus-visible:before:bg-cube-gray/10 active:before:bg-cube-gray/20 focus-visible:motion-safe:before:animate-breath',

                'after:absolute after:size-full after:scale-110 after:rounded-full after:bg-transparent after:transition-all after:duration-[400ms] after:ease-out',

                'active:after:scale-0 active:after:bg-cube-gray/50 active:after:transition-none',

                {
                    '*:fill-disabled *:stroke-disabled hover:before:bg-transparent active:before:bg-transparent':
                        disabled,
                },

                className,
            ),
        [disabled, className],
    );

    return (
        <button
            className={classNames}
            aria-disabled={disabled}
            onClick={click}
            {...props}
        >
            {children}
        </button>
    );
};

export default React.memo(IconButton);
