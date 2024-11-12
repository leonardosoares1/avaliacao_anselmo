import React, { PropsWithChildren } from 'react';

import { cn } from '@lib/utils';

const TableItemsBody: React.FC<
  PropsWithChildren<React.ButtonHTMLAttributes<HTMLDivElement>>
> = ({ children, className, title }) => {
  return (
    <div
      className={cn(
        'cursor-default truncate text-base font-medium text-slate-700',
        className,
      )}
      title={title}
    >
      {children}
    </div>
  );
};

export default TableItemsBody;
