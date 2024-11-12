import { PropsWithChildren } from 'react';

import UseToastProvider from './useToast/provider';

const AppProvider = ({ children }: PropsWithChildren) => {
  return <UseToastProvider>{children}</UseToastProvider>;
};

export default AppProvider;
