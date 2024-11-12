import TableItemHeader from '@components/Table/Header';

const ItemHeader = () => {
  return (
    <div className="grid grid-cols-[4rem_1fr_15rem_15rem_4rem_6rem] gap-2 p-4">
      <TableItemHeader className="text-center">ID</TableItemHeader>
      <TableItemHeader>Título</TableItemHeader>
      <TableItemHeader>Subtítulo</TableItemHeader>
      <TableItemHeader>Thumbnail</TableItemHeader>
      <TableItemHeader className="text-center">Status</TableItemHeader>
      <TableItemHeader className="text-center">Ações</TableItemHeader>
    </div>
  );
};

export default ItemHeader;
