import { useCallback, useEffect, useRef, useState } from 'react';

import IPagination from 'interfaces/IPagination';

import IPost from 'models/Post';

import PageTitle from '@components/PageTitle';
import ComponentEmpty from '@components/utils/ComponentEmpty';
import ComponentError from '@components/utils/Error/List/ComponentError';
import ComponentLoadingList from '@components/utils/Loading/List';
import ComponentPaginate from '@components/utils/Paginate';

import PostService from '@services/post/PostService';

import { IRefProps } from './Filter';
import { Body, Header } from './Item';

const PostList = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    page: 0,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const filterRef = useRef<IRefProps>(null);

  const handlePosts = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await PostService.getAll({
        page: 1,
      });
      setPosts(response.list);
      setPagination({
        page: response.pagination.current,
        totalPages: response.pagination.total,
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
        isActive: data?.status === '' ? undefined : data?.status,
      });
      setPosts(response.list);
      setPagination({
        page: response.pagination.current,
        totalPages: response.pagination.total,
      });
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handlePosts();
  }, [handlePosts]);

  return (
    <main className="max-w-[100rem] min-h-[calc(100vh-5.7rem)] w-full overflow-x-hidden py-10 px-8 mx-auto bg-white900">
      <PageTitle>Publicações</PageTitle>

      <div className="mt-4 rounded-md border border-gray100">
        <Header />
        <ComponentLoadingList show={isLoading} />
        {posts.map((post) => (
          <Body key={post.id} post={post} />
        ))}
        <ComponentEmpty
          message="Nenhum tipo de publicação encontrada"
          show={!isLoading && !isError && posts.length === 0}
        />

        {isError && (
          <ComponentError
            message="Erro ao carregar as publicações"
            onClick={handlePosts}
          />
        )}
      </div>
      <ComponentPaginate
        currentPage={pagination.page}
        onPage={handlePagination}
        show={!!posts.length}
        totalPages={pagination.totalPages}
      />
    </main>
  );
};

export default PostList;
