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
        className={cn('flex flex-row gap-0.5 px-2', className)}
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
            'relative flex items-center justify-center whitespace-nowrap rounded-t-md border border-b-0 border-app-border bg-app-bg px-2 py-1 text-sm font-medium outline-none transition-all disabled:pointer-events-none disabled:opacity-50',

            'data-[state=active]:text-app-text-highlighted data-[state=active]:before:border-b-2 data-[state=active]:before:border-b-app-text-highlighted',

            'before:absolute before:size-full before:rounded-t-md before:px-2 hover:before:bg-app-bg-hover focus-visible:before:bg-app-bg-hover active:before:bg-app-bg-active',

            'after:absolute after:size-full after:scale-110 after:rounded-t-md after:bg-transparent after:transition-all after:duration-500 after:ease-out after:motion-reduce:scale-0',

            'active:after:scale-0 active:after:bg-app-bg-ripple active:after:transition-none',

            className,
        )}
        {...props}
    />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

interface SubTabsContentProps {
    hasSubTabs?: boolean;
    isSubTabsContent?: boolean;
}

const TabsContent = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> &
        SubTabsContentProps
>(
    (
        { className, hasSubTabs = false, isSubTabsContent = false, ...props },
        ref,
    ) => (
        <TabsPrimitive.Content
            ref={ref}
            className={cn(
                'relative rounded-md border border-app-border bg-app-bg p-2 outline-none',

                'focus-visible:ring-2 focus-visible:ring-app-border-highlighted',

                {
                    'p-0 pt-1': hasSubTabs,
                    'relative rounded-none border-0 border-t bg-transparent ring-inset focus-visible:before:absolute focus-visible:before:left-0 focus-visible:before:top-0 focus-visible:before:size-full focus-visible:before:border focus-visible:before:border-t-0 focus-visible:before:border-app-border-highlighted':
                        isSubTabsContent,
                },
                className,
            )}
            {...props}
        />
    ),
);
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
