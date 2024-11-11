import React, { PropsWithChildren } from 'react';

import { ChevronLeft } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

interface IProps extends PropsWithChildren {
  canGoBack?: boolean;
}
const PageTitle: React.FC<IProps> = ({ canGoBack = false, children }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="mb-6 grid grid-cols-[repeat(2,auto)] justify-start gap-2">
      {canGoBack && (
        <button
          className="flex items-center border-0 bg-[transparent]"
          onClick={handleGoBack}
        >
          <ChevronLeft className="text-blue-400" size={26} />
        </button>
      )}
      <h1 className="text-2xl font-semibold text-blue-400">{children}</h1>
    </div>
  );
};

export default PageTitle;
