import { useCallback, useEffect, useRef, useState } from 'react';

import { Plus } from 'lucide-react';

import { Link, useNavigate } from 'react-router-dom';

import IPagination from 'interfaces/IPagination';

import IPost from 'models/Post';

import pages from '@constants/pages';

import PageTitle from '@components/PageTitle';
import { Button } from '@components/ui/button';
import ComponentEmpty from '@components/utils/ComponentEmpty';
import ComponentLoadingList from '@components/utils/Loading/List';
import ComponentPaginate from '@components/utils/Paginate';

import PostService from '@services/post/PostService';

import PostChangeStatus, {
  IRefProps as ChangeStatusRefProps,
} from './ChangeStatus';
import PostFilter, { FormType, IRefProps } from './Filter';
import { Body, Header } from './Item';
const PostList = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<IPost[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    page: 0,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const filterRef = useRef<IRefProps>(null);
  const changeStatusRef = useRef<ChangeStatusRefProps>(null);

  const handlePosts = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await PostService.getAll({
        page: 1,
      });
      setPosts(response.list);
      setPagination({
        page: response.pagination.current_page,
        totalPages: response.pagination.total_page,
      });
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handlePagination = useCallback(async (page: number) => {
    setIsLoading(true);
    setIsError(false);
    const data = filterRef.current?.getFormData();
    try {
      const response = await PostService.getAll({
        page,
        title: data?.title,
        is_active: data?.is_active === '' ? undefined : data?.is_active,
      });
      setPosts(response.list);
      setPagination({
        page: response.pagination.current_page,
        totalPages: response.pagination.total_page,
      });
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleFilter = useCallback(async (data: FormType) => {
    if (!data.title && !data.is_active) {
      return;
    }
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await PostService.getAll({
        page: 1,
        title: data.title,
        is_active: data.is_active === '' ? undefined : data.is_active,
      });
      setPosts(response.list);
      setPagination({
        page: response.pagination.current_page,
        totalPages: response.pagination.total_page,
      });
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleClear = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    filterRef.current?.resetForm();
    try {
      const { list, pagination } = await PostService.getAll({
        page: 1,
      });
      setPosts(list);
      setPagination({
        page: pagination.current_page,
        totalPages: pagination.total_page,
      });
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleEdit = useCallback(
    (post: IPost) => {
      navigate(pages.post.edit(post.id));
    },
    [navigate],
  );

  const openModal = useCallback((data: IPost) => {
    changeStatusRef.current?.open(data);
  }, []);

  useEffect(() => {
    handlePosts();
  }, [handlePosts]);

  return (
    <>
      <main className="max-w-[100rem] min-h-[calc(100vh-5.7rem)] w-full overflow-x-hidden py-10 px-8 mx-auto bg-white">
        <PageTitle>Publicações</PageTitle>
        <div className="grid grid-cols-[auto] justify-end">
          <Link to={pages.post.create}>
            <Button>
              Nova publicação
              <Plus size={25} strokeWidth={1.5} />
            </Button>
          </Link>
        </div>

        <PostFilter
          isLoading={isLoading}
          onClear={handleClear}
          onSubmit={handleFilter}
          ref={filterRef}
        />

        <div className="mt-4 rounded-md border border-gray-100">
          <Header />
          <ComponentLoadingList show={isLoading} />
          {posts.map((post) => (
            <Body
              key={post.id}
              onEdit={handleEdit}
              openStatusModal={() => openModal(post)}
              post={post}
            />
          ))}
          <ComponentEmpty
            message="Nenhuma publicação encontrada"
            show={!isLoading && !isError && posts.length === 0}
          />
        </div>
        <ComponentPaginate
          currentPage={pagination.page}
          onPage={handlePagination}
          show={!!posts.length}
          totalPages={pagination.totalPages}
        />
      </main>
      <PostChangeStatus onReload={handlePosts} ref={changeStatusRef} />
    </>
  );
};

export default PostList;
