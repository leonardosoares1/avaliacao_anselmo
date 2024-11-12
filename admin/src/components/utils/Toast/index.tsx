import { Transition } from 'react-spring';

import ToastElement, { IToastElementMessageProps } from './ToastElement';

interface IProps {
  messages?: IToastElementMessageProps[];
}

const Toast = ({ messages = [] }: IProps) => {
  return (
    <div className="fixed right-0 top-0 z-[9999] overflow-hidden pr-2">
      <Transition
        enter={{
          opacity: 1,
          right: '0%',
        }}
        from={{
          opacity: 0,
          right: '-120%',
        }}
        items={messages}
        keys={(message: IToastElementMessageProps) => message.id}
        leave={{
          opacity: 0,
          right: '-120%',
        }}
      >
        {(style, item) => (
          <ToastElement key={item.id} message={item} style={style} />
        )}
      </Transition>
    </div>
  );
};

export default Toast;
