import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import React from 'react';
import cn from 'src/utils/cn';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const ToolTipArrow = React.forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Arrow>,
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow>
>(({ className, ...props }, ref) => (
    <TooltipPrimitive.Arrow
        ref={ref}
        className={cn(
            'fill-disabled stroke-cube-gray/20 opacity-90',
            className,
        )}
        {...props}
    />
));
ToolTipArrow.displayName = TooltipPrimitive.Arrow.displayName;

const TooltipContent = React.forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
    <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
            'z-50 overflow-hidden rounded-md border border-cube-gray/20 bg-white px-2 py-1 text-sm text-app-text opacity-90 shadow-md',

            'hover-hover:pointer-fine:animate-in hover-hover:pointer-fine:fade-in-0 hover-hover:pointer-fine:zoom-in-95 hover-hover:pointer-fine:data-[state=closed]:animate-out hover-hover:pointer-fine:data-[state=closed]:fade-out-0 hover-hover:pointer-fine:data-[state=closed]:zoom-out-95',

            'hover-hover:pointer-fine:data-[side=bottom]:slide-in-from-top-2 hover-hover:pointer-fine:data-[side=left]:slide-in-from-right-2 hover-hover:pointer-fine:data-[side=right]:slide-in-from-left-2 hover-hover:pointer-fine:data-[side=top]:slide-in-from-bottom-2',

            className,
        )}
        {...props}
    />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export {
    ToolTipArrow,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
};
