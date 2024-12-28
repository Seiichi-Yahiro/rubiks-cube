import * as SwitchPrimitives from '@radix-ui/react-switch';
import React from 'react';
import cn from 'src/utils/cn';

const Switch = React.forwardRef<
    React.ElementRef<typeof SwitchPrimitives.Root>,
    React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, children, ...props }, ref) => (
    <SwitchPrimitives.Root
        className={cn(
            'peer relative inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-app-bg-highlighted data-[state=unchecked]:bg-app-bg-inactive',

            'focus-visible:ring-2 focus-visible:ring-app-border-highlighted',

            className,
        )}
        {...props}
        ref={ref}
    >
        <SwitchPrimitives.Thumb
            className={cn(
                'pointer-events-none flex h-4 w-4 items-center justify-center rounded-full bg-app-text font-mono text-xs text-app-text-inverted shadow-lg transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
            )}
        >
            {children}
        </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
