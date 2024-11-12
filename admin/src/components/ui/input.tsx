import React, { HTMLInputTypeAttribute, useState } from 'react';

import { AlertCircle, Eye, EyeOff } from 'lucide-react';

import { cn } from '@lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { v4 as uuidV4 } from 'uuid';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

const inputVariants = cva(undefined, {
  variants: {
    container: {
      default: 'border-gray-100',
      auth: 'has-[:focus]:border-blue-500 border-gray-200 bg-backgroundRgba [&>input]:text-white',
    },
  },
  defaultVariants: {
    container: 'default',
  },
});

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  error?: string;
  label?: string;
  secure?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      className,
      container,
      error,
      label,
      secure = false,
      type = 'text',
      ...props
    },
    ref,
  ) => {
    const id = uuidV4();
    const [inputType, setInputType] = useState<HTMLInputTypeAttribute>(type);

    const handleToggleSecure = () => {
      setInputType((currentType) => {
        if (currentType === 'password') {
          return 'text';
        }
        return 'password';
      });
    };

    return (
      <div className="space-y-2">
        <label
          className={cn(
            'text-sm font-medium',
            !label && 'hidden',
            container === 'auth' ? 'text-white' : 'text-gray-500',
          )}
          htmlFor={id}
        >
          {label}
        </label>
        <div
          className={cn(
            'grid items-center gap-3 overflow-hidden rounded-lg border border-gray-100 px-3 transition-all duration-300 has-[:disabled]:cursor-not-allowed has-[:disabled]:border-gray-100 has-[:focus]:border-black',
            inputVariants({ container }),
            error && 'grid-cols-[1fr_auto] border-red-700',
            secure && 'grid-cols-[1fr_auto]',
            secure && error && 'grid-cols-[1fr_auto_auto] border-red-700',
          )}
        >
          <input
            {...props}
            className={cn(
              'peer h-9 w-full border-0 bg-[transparent] py-1 text-sm text-black outline-none ring-0 file:border-0 placeholder:text-gray-200 disabled:cursor-not-allowed disabled:opacity-50',
              className,
            )}
            id={id}
            ref={ref}
            type={inputType}
          />

          <button
            className={cn(
              'text-gray-200 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
              !secure && 'hidden',
            )}
            onClick={handleToggleSecure}
            title={inputType === 'password' ? 'Mostrar senha' : 'Ocultar senha'}
            type="button"
          >
            <Eye
              className={cn(inputType !== 'password' && 'hidden')}
              size={22}
              strokeWidth={1.5}
            />
            <EyeOff
              className={cn(inputType === 'password' && 'hidden')}
              size={22}
              strokeWidth={1.5}
            />
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
Input.displayName = 'Input';

export { Input };
