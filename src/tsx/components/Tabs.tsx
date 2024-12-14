import * as TabsPrimitive from '@radix-ui/react-tabs';
import React from 'react';
import cn from 'src/utils/cn';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.List
        ref={ref}
        className={cn(
            'flex h-10 items-center justify-center divide-x divide-cube-gray border-b border-cube-gray text-cube-gray',
            className,
        )}
        {...props}
    />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
            'relative flex items-center justify-center whitespace-nowrap px-2 py-1 text-sm font-medium outline-none transition-all disabled:pointer-events-none disabled:opacity-50',

            'data-[state=active]:text-cube-blue',

            'before:absolute before:size-full before:scale-95 before:rounded-md before:px-2 hover:before:bg-cube-gray/10 focus-visible:before:bg-cube-gray/10 focus-visible:motion-safe:before:animate-breath',

            'after:absolute after:size-full after:scale-110 after:rounded-full after:bg-transparent after:transition-all after:duration-500 after:ease-out after:motion-reduce:scale-0',

            'active:after:scale-0 active:after:bg-cube-gray/50 active:after:transition-none',

            className,
        )}
        {...props}
    />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Content
        ref={ref}
        className={cn('mt-2 text-cube-gray outline-none', className)}
        {...props}
    />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
