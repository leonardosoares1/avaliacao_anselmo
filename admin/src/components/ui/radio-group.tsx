import * as React from 'react';

import { cn } from '@lib/utils';
import { CheckIcon } from '@radix-ui/react-icons';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { v4 as uuidV4 } from 'uuid';

export interface IRadioProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  label?: string;
}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  IRadioProps
>(({ className, label, ...props }, ref) => {
  const id = uuidV4();

  return (
    <div className="space-y-2">
      <label
        className={cn('text-sm font-medium text-gray-500', !label && 'hidden')}
        htmlFor={id}
      >
        {label}
      </label>
      <RadioGroupPrimitive.Root
        className={cn('grid gap-2', className)}
        {...props}
        ref={ref}
      />
    </div>
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        'aspect-square h-5 w-5 rounded-full border border-green-800 text-gray-300 outline-none ring-0 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 aria-checked:bg-green-800',
        className,
      )}
      ref={ref}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <CheckIcon className="h-6 w-6 pb-[5px] text-white" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
