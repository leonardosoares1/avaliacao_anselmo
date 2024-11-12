import { useCallback, useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import IPostDetails from '@models/PostDetails';

import pages from '@constants/pages';

import useToast from '@hooks/useToast';

import PostService from '@services/post/PostService';

import helpers from '@helpers/index';

import PostForm, { FormType } from './Form';

const PostEdit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const toast = useToast();

  const [details, setDetails] = useState<IPostDetails | null>(null);
  const [initialData, setInitialData] = useState<IPostDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState<boolean>(false);

  const handleEditPost = useCallback(
    async (data: FormType) => {
      setIsLoading(true);
      try {
        await PostService.update({
          id: params.id as string,
          content: data.content,
          subtitle: data.subtitle,
          thumbnail: data.thumbnail,
          title: data.title,
        });
        toast.show({
          type: 'success',
          title: 'Publicação atualizada com sucesso',
        });
        navigate(pages.post.list);
      } catch (error) {
        helpers.errorHandling(error);
      } finally {
        setIsLoading(false);
      }
    },
    [navigate, params.id, toast],
  );

  const handleSetInitialData = useCallback(() => {
    if (details) {
      const initialData: IPostDetails = {
        id: details.id,
        content: details.content,
        isActive: details.isActive,
        subtitle: details.subtitle,
        thumbnail: details.thumbnail,
        title: details.title,
      };
      setInitialData(initialData);
    }
  }, [details]);

  const loadPostInfo = useCallback(async () => {
    setIsLoadingDetails(true);
    try {
      const response = await PostService.getDetails({
        id: params.id as string,
      });
      if (!response) {
        navigate(pages.post.list, { replace: true });
        return;
      }
      setDetails(response);
    } catch (error) {
      helpers.errorHandling(error);
      navigate(pages.post.list, { replace: true });
    } finally {
      setIsLoadingDetails(false);
    }
  }, [navigate, params.id]);

  useEffect(() => {
    loadPostInfo();
  }, [loadPostInfo]);

  useEffect(() => {
    handleSetInitialData();
  }, [handleSetInitialData]);

  return (
    <>
      {!isLoadingDetails && initialData && (
        <PostForm
          defaultValues={initialData}
          isLoading={isLoading}
          onSubmit={handleEditPost}
          title="Editar publicação"
        />
      )}
    </>
  );
};

export default PostEdit;
