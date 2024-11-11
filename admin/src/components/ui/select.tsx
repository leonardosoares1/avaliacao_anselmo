import * as React from 'react';

import { AlertCircle, X } from 'lucide-react';

import { cn } from '@lib/utils';
import {
  CaretSortIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cva, VariantProps } from 'class-variance-authority';
import { v4 as uuidV4 } from 'uuid';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

const selectVariants = cva(undefined, {
  variants: {
    container: {
      default: 'border-gray100',
      auth: 'has-[:focus]:border-orange700 border-gray200 bg-backgroundRgba [&>button]:text-white900',
    },
  },
  defaultVariants: {
    container: 'default',
  },
});

interface ITriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectVariants> {
  error?: string;
  label?: string;
  onClear?(): void;
}

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  ITriggerProps
>(
  (
    { children, className, container, error, label, onClear, ...props },
    ref,
  ) => {
    const id = uuidV4();
    return (
      <div className="space-y-2">
        <label
          className={cn(
            'text-sm font-medium',
            !label && 'hidden',
            container === 'auth' ? 'text-white' : 'text-gray-200',
          )}
          htmlFor={id}
        >
          {label}
        </label>
        <div
          className={cn(
            'grid items-center gap-1 rounded-lg border border-gray-100 px-3 transition-all duration-300 has-[:disabled]:cursor-not-allowed has-[:disabled]:border-gray100 has-[:focus]:border-black',
            selectVariants({ container }),
            error && 'grid-cols-[1fr_auto] border-red700',
            !!onClear && 'grid-cols-[1fr_auto]',
            onClear && error && 'grid-cols-[1fr_auto_auto] border-red700',
          )}
        >
          <SelectPrimitive.Trigger
            {...props}
            className={cn(
              'bg-transparent grid h-9 grid-cols-[1fr_auto] items-center gap-1 py-1 text-sm text-black outline-none ring-0 focus:border-black disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-gray-200 [&>span]:truncate [&>span]:text-start',
              className,
            )}
            id={id}
            ref={ref}
          >
            {children}
            <SelectPrimitive.Icon asChild>
              <CaretSortIcon className="h-6 w-6 text-gray-200" />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>
          <button
            className={cn(!onClear && 'hidden')}
            onClick={onClear}
            title="Limpar"
            type="button"
          >
            <X className="text-gray-200" size={20} strokeWidth={1.2} />
          </button>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild className={cn(!error && 'hidden')}>
                <AlertCircle
                  className="text-red-700"
                  size={21}
                  strokeWidth={1.5}
                />
              </TooltipTrigger>
              <TooltipContent>{error}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    );
  },
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    {...props}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className,
    )}
    ref={ref}
  >
    <ChevronUpIcon />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className,
    )}
    ref={ref}
    {...props}
  >
    <ChevronDownIcon />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ children, className, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      className={cn(
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg border border-gray100 bg-white text-black data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className,
      )}
      position={position}
      ref={ref}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    className={cn('px-2 py-1.5 text-sm font-semibold text-black', className)}
    ref={ref}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, className, ...props }, ref) => (
  <SelectPrimitive.Item
    {...props}
    className={cn(
      'relative flex w-full cursor-pointer select-none items-center rounded-lg py-1.5 pl-2 pr-8 text-sm text-black outline-none transition-all focus:bg-green-900 focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    ref={ref}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    className={cn('-mx-1 my-1 h-px bg-gray-100', className)}
    ref={ref}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
