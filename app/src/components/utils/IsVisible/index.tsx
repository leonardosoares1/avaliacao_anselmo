import React, { PropsWithChildren } from 'react';

interface IComponentIsVisibleProps {
  when: boolean;
}

const ComponentIsVisible: React.FC<
  PropsWithChildren<IComponentIsVisibleProps>
> = ({ children, when }) => {
  if (!when) {
    return null;
  }
  return <>{children}</>;
};

export default ComponentIsVisible;
