import * as PopoverPrimitive from '@radix-ui/react-popover';
import { X } from 'lucide-react';
import React from 'react';
import IconButton from 'src/tsx/components/IconButton';
import cn from 'src/utils/cn';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef<
    React.ElementRef<typeof PopoverPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(
    (
        { className, align = 'center', sideOffset = 4, children, ...props },
        ref,
    ) => (
        <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
                ref={ref}
                align={align}
                sideOffset={sideOffset}
                className={cn(
                    'relative z-50 rounded-md border border-cube-gray/20 bg-white p-4 text-cube-gray shadow-md outline-none',

                    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',

                    'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',

                    className,
                )}
                {...props}
            >
                {children}
                <PopoverPrimitive.Close asChild={true}>
                    <IconButton className="absolute right-0 top-0 mr-1 mt-1 size-6">
                        <X />
                    </IconButton>
                </PopoverPrimitive.Close>
            </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
    ),
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger };
