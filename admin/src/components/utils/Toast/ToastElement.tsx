import { CSSProperties, useEffect } from 'react';

import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

import { animated } from 'react-spring';

import useToast from '@hooks/useToast';

export interface IToastElementMessageProps {
  description?: string;
  duration?: number;
  id: string;
  title: string;
  type?: 'success' | 'error' | 'info';
}

interface IProps {
  duration?: number;
  message: IToastElementMessageProps;
  style: CSSProperties;
}

const icons = {
  info: <Info size={20} />,
  error: <AlertCircle size={20} />,
  success: <CheckCircle size={20} />,
};

const ToastElement = ({ duration = 3000, message, style }: IProps) => {
  const { hide: hideToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      hideToast(message.id);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [message.id, hideToast, duration]);

  const handleClose = () => {
    hideToast(message.id);
  };

  const toastTypeVariations = () => {
    if (message.type === 'info') {
      return 'bg-orange-700';
    }
    if (message.type === 'success') {
      return 'bg-green-600';
    }
    return 'bg-red-700 ';
  };

  return (
    <animated.div
      className={`relative mb-2 mr-8 mt-2 flex w-full max-w-[25rem] items-center justify-between rounded-lg p-4 text-white shadow-[2px_2px_6px_rgba(0,0,0,0.2)] ${toastTypeVariations()}`}
      key={message.id}
      style={style}
    >
      {icons[message.type || 'info']}
      <div className="relative ml-4 flex-1">
        <strong className="font-medium">{message.title}</strong>
        {!!message.description && (
          <p className="mt-2 text-base opacity-80">{message.description}</p>
        )}
      </div>
      <button
        className="text-inherit ml-2 w-6 border-0 bg-[transparent]"
        onClick={handleClose}
        type="button"
      >
        <X size={18} />
      </button>
    </animated.div>
  );
};

export default ToastElement;
