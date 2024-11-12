import { useCallback, useMemo } from 'react';

import ReactPaginate from 'react-paginate';

interface IProps {
  currentPage?: number;
  onPage(pageSelected: number): void;
  show: boolean;
  totalPages?: number;
}

const ComponentPaginate = ({
  currentPage,
  onPage,
  show,
  totalPages,
}: IProps) => {
  const currentPageFormatted = useMemo<number>(
    () => (currentPage || 1) - 1,
    [currentPage],
  );

  const handlePage = useCallback(
    (selectedItem: { selected: number }) => {
      const pageSelectedFormatted = selectedItem.selected + 1;

      onPage(pageSelectedFormatted);
    },
    [onPage],
  );

  return (
    show && (
      <ReactPaginate
        activeClassName="active"
        breakLabel="..."
        className="bg-blue-100 flex w-9 mt-2 p-2 rounded-md"
        containerClassName="ulPaginate"
        disableInitialCallback
        initialPage={currentPageFormatted}
        marginPagesDisplayed={2}
        nextLabel="›"
        onPageChange={handlePage}
        pageCount={totalPages || 1}
        pageRangeDisplayed={5}
        previousLabel="‹"
      />
    )
  );
};

export default ComponentPaginate;
