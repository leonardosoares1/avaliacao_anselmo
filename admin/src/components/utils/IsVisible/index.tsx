import { PropsWithChildren } from 'react';

interface IProps {
  when: boolean;
}

const ComponentIsVisible = ({ children, when }: PropsWithChildren<IProps>) => {
  if (!when) {
    return null;
  }
  return children;
};

export default ComponentIsVisible;
