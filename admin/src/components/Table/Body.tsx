import React, { PropsWithChildren } from 'react';

import { cn } from '@lib/utils';

interface ITableItemsBodyProps
  extends React.ButtonHTMLAttributes<HTMLDivElement> {
  isThumbnail?: boolean;
}

const TableItemsBody: React.FC<PropsWithChildren<ITableItemsBodyProps>> = ({
  children,
  className,
  isThumbnail,
  title,
}) => {
  return (
    <div
      className={cn(
        'cursor-default truncate text-base font-medium text-slate-700',
        className,
      )}
      title={title}
    >
      {isThumbnail ? (
        <img
          alt={title}
          className="w-16 h-16  object-cover"
          src={children as string}
        />
      ) : (
        children
      )}
    </div>
  );
};

export default TableItemsBody;
