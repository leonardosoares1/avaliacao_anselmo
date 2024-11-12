import notFound from '@assets/utils/empty.svg';

interface IComponentEmptyProps {
  message: string;
  show: boolean;
}

const ComponentEmpty = ({ message, show }: IComponentEmptyProps) => {
  return (
    show && (
      <div className="flex flex-col items-center justify-center p-12">
        <img
          alt="Erro 404"
          className="mb-6 w-full max-w-[10rem]"
          src={notFound}
        />
        <p className="text-lg font-normal">{message}</p>
      </div>
    )
  );
};

export default ComponentEmpty;
