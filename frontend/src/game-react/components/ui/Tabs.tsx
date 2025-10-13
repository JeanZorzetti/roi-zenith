// ============= TABS COMPONENT =============
// Tabs component using Radix UI

import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { clsx } from 'clsx';

export const Tabs = TabsPrimitive.Root;

export const TabsList: React.FC<React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>> = ({
  className,
  ...props
}) => (
  <TabsPrimitive.List
    className={clsx(
      'inline-flex items-center justify-center rounded-lg bg-gray-800 p-1',
      className
    )}
    {...props}
  />
);

export const TabsTrigger: React.FC<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>> = ({
  className,
  ...props
}) => (
  <TabsPrimitive.Trigger
    className={clsx(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5',
      'text-sm font-medium text-gray-400 transition-all',
      'hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
      'disabled:pointer-events-none disabled:opacity-50',
      'data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=active]:shadow-sm',
      className
    )}
    {...props}
  />
);

export const TabsContent: React.FC<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>> = ({
  className,
  ...props
}) => (
  <TabsPrimitive.Content
    className={clsx('mt-2 focus-visible:outline-none', className)}
    {...props}
  />
);
