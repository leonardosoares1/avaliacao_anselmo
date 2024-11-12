import React, { PropsWithChildren } from 'react';

import { cn } from '@lib/utils';

const TableItemHeader: React.FC<
  PropsWithChildren<React.ButtonHTMLAttributes<HTMLDivElement>>
> = ({ children, className }) => {
  return (
    <div className={cn('text-sm font-medium text-slate-700', className)}>
      {children}
    </div>
  );
};

export default TableItemHeader;
