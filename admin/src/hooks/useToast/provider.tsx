import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { v4 as uuidV4 } from 'uuid';

import Toast from '@components/utils/Toast';
import { IToastElementMessageProps } from '@components/utils/Toast/ToastElement';
import ToastManager from '@components/utils/Toast/ToastManager';

import IShowToastDTO from './dtos/IShowToastDTO';
import { IUseToastContext } from './index';

export const ToastContext = createContext<IUseToastContext>(
  {} as IUseToastContext,
);

const ToastProvider = ({ children }: PropsWithChildren) => {
  const [messages, setMessages] = useState<IToastElementMessageProps[]>([]);

  const show = useCallback(
    ({ description, duration, title, type }: IShowToastDTO) => {
      const id = uuidV4();

      const toast = {
        id,
        type,
        title,
        description,
        duration,
      };

      setMessages((state) => [...state, toast]);
    },
    [],
  );

  const hide = useCallback((id: string) => {
    setMessages((messagesCurrent) =>
      messagesCurrent.filter((messageCurrent) => messageCurrent.id !== id),
    );
  }, []);

  useEffect(() => {
    ToastManager.register({ show, hide });

    return () => {
      ToastManager.unregister();
    };
  }, [hide, show]);

  // const statesExported = {};
  const handlesExported = useMemo(() => {
    return { show, hide };
  }, [hide, show]);

  return (
    <ToastContext.Provider value={handlesExported}>
      {children}
      <Toast messages={messages} />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
