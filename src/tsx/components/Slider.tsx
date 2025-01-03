import * as SliderPrimitive from '@radix-ui/react-slider';
import React, { type PointerEvent, useCallback, useRef, useState } from 'react';
import cn from 'src/utils/cn';
import './Slider.css';

const Slider = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, onPointerUp, ...props }, ref) => {
    const [active, setActive] = useState(false);
    const setActiveTimeoutId = useRef<NodeJS.Timeout | null>(null);

    const pointerDownOnThumb = useCallback(() => {
        setActive(true);
    }, []);

    const pointerDownOnTrack = useCallback(() => {
        setActiveTimeoutId.current = setTimeout(() => setActive(true), 150);
    }, []);

    const pointerTrackMove = useCallback(() => {
        if (setActiveTimeoutId.current) {
            clearTimeout(setActiveTimeoutId.current);
            setActiveTimeoutId.current = null;
            setActive(true);
        }
    }, []);

    const pointerUp = useCallback(
        (event: PointerEvent<HTMLDivElement>) => {
            if (setActiveTimeoutId.current) {
                clearTimeout(setActiveTimeoutId.current);
                setActiveTimeoutId.current = null;
            }

            setActive(false);

            onPointerUp?.(event);
        },
        [onPointerUp],
    );

    return (
        <SliderPrimitive.Root
            ref={ref}
            className={cn(
                'group relative flex w-full touch-none select-none items-center',
                {
                    'slider-animated': !active,
                },
                className,
            )}
            onPointerUp={pointerUp}
            {...props}
        >
            <SliderPrimitive.Track
                onPointerDown={pointerDownOnTrack}
                onPointerMove={pointerTrackMove}
                className="relative h-2 w-full grow cursor-pointer overflow-hidden rounded-full bg-app-bg-hover-highlighted group-aria-disabled:cursor-default group-aria-disabled:bg-app-bg-inactive"
            >
                <SliderPrimitive.Range className="absolute h-full bg-app-bg-highlighted group-aria-disabled:bg-app-bg-disabled" />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb
                onPointerDown={pointerDownOnThumb}
                className={cn(
                    'block h-5 w-5 cursor-grab rounded-full bg-app-bg-highlighted drop-shadow focus-visible:outline-none active:cursor-grabbing group-aria-disabled:cursor-default group-aria-disabled:bg-app-bg-disabled',

                    'before:absolute before:-left-1.5 before:-top-1.5 before:h-8 before:w-8 before:rounded-full hover:before:bg-app-bg-hover focus-visible:before:bg-app-bg-hover active:before:bg-app-bg-active group-aria-disabled:hover:before:bg-transparent focus-visible:motion-safe:before:animate-breath',

                    {
                        'before:bg-app-bg-active': active,
                    },
                )}
            />
        </SliderPrimitive.Root>
    );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export default Slider;
