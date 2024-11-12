import tryAgain from '@assets/utils/try-again.svg';

interface IProps {
  message: string;
  onClick: () => void;
}

const ComponentError = ({ message, onClick }: IProps) => {
  return (
    <div className="col-start-1 col-end-6 flex flex-col items-center justify-center p-12">
      <img alt="Erro" className="mb-6 w-full max-w-40" src={tryAgain} />
      <p className="text-sm text-black900">{message}</p>
      <button
        className="mt-4 h-8 rounded-lg border-0 bg-black px-6 text-sm font-medium text-white hover:brightness-85"
        onClick={onClick}
      >
        Tentar novamente
      </button>
    </div>
  );
};

export default ComponentError;
