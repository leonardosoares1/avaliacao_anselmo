import notFound from '@assets/utils/empty.svg';

import ComponentIsVisible from './IsVisible';

interface IComponentEmptyProps {
  message: string;
  show: boolean;
}

const ComponentEmpty = ({ message, show }: IComponentEmptyProps) => {
  return (
    <ComponentIsVisible when={show}>
      <div className="flex flex-col items-center justify-center p-12">
        <img
          alt="Erro 404"
          className="mb-6 w-full max-w-[10rem]"
          src={notFound}
        />
        <p className="text-lg font-normal">{message}</p>
      </div>
    </ComponentIsVisible>
  );
};

export default ComponentEmpty;
