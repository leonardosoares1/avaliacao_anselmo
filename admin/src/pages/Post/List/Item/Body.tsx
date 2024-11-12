import { Ban, CheckCircle, Edit, XCircle } from 'lucide-react';

import IPost from 'models/Post';

import TableItemsBody from '@components/Table/Body';

interface IProps {
  onEdit(inputData: IPost): void;
  post: IPost;
}

const ItemBody = ({ onEdit, post }: IProps) => {
  function handleEdit(): void {
    onEdit(post);
  }

  return (
    <div className="grid grid-cols-[4rem_1fr_1fr_15rem_15rem_4rem_6rem] gap-2 p-4 even:bg-white100">
      <TableItemsBody className="text-center">{post.id}</TableItemsBody>
      <TableItemsBody>{post.title}</TableItemsBody>
      <TableItemsBody>
        <div
          className="flex justify-center"
          title={post.isActive ? 'Ativo' : 'Desativado'}
        >
          {post.isActive ? (
            <CheckCircle
              className="text-green600"
              size={21}
              strokeWidth={1.5}
            />
          ) : (
            <XCircle className="text-red700" size={21} strokeWidth={1.5} />
          )}
        </div>
      </TableItemsBody>
      <TableItemsBody className="grid grid-cols-2 gap-1">
        <button
          className="flex items-center justify-center transition hover:opacity-80"
          onClick={handleEdit}
          title="Editar tipo de produto"
        >
          <Edit className="text-orange700" size={21} strokeWidth={1.5} />
        </button>
        <button
          className="flex items-center justify-center transition hover:opacity-80"
          title={
            post.isActive
              ? 'Desativar tipo de produto'
              : 'Ativar tipo de produto'
          }
        >
          {post.isActive ? (
            <Ban className="text-red700" size={21} strokeWidth={1.5} />
          ) : (
            <CheckCircle
              className="text-green600"
              size={21}
              strokeWidth={1.5}
            />
          )}
        </button>
      </TableItemsBody>
    </div>
  );
};

export default ItemBody;
