import { useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import pages from '@constants/pages';

import useToast from '@hooks/useToast';

import PostService from '@services/post/PostService';

import helpers from '@helpers/index';

import PostForm, { FormType } from './Form';

const PostCreate = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createPost = useCallback(
    async (data: FormType) => {
      setIsLoading(true);
      try {
        await PostService.create({
          isActive: Boolean(Number(data.isActive)),
          content: data.content,
          title: data.title,
          subtitle: data.subtitle,
          thumbnail: data.thumbnail,
        });
        toast.show({
          type: 'success',
          title: 'Publicação criada com sucesso',
        });
        navigate(pages.post.list);
      } catch (err) {
        helpers.errorHandling(err);
      } finally {
        setIsLoading(false);
      }
    },
    [navigate, toast],
  );

  return (
    <PostForm
      isLoading={isLoading}
      onSubmit={createPost}
      title="Nova publicação"
    />
  );
};

export default PostCreate;
