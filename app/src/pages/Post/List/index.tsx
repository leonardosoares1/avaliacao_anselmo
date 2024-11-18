import { useCallback, useEffect, useState } from 'react';

import { ActivityIndicator } from 'react-native';
import Share from 'react-native-share';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamsList } from '@routes/index';
import { AxiosError } from 'axios';

import IPost from '@models/Post';
import IPostDetails from '@models/PostDetails';

import ListingBody from '@components/ListingBody';
import ComponentEmpty from '@components/utils/Empty';
import ComponentError from '@components/utils/Error';
import ComponentIsVisible from '@components/utils/IsVisible';

import PostService from '@services/post/PostService';

import Containers from '@styles/containers';
import theme from '@styles/themes';

import { dataLoading, IDataLoading } from './Loading';
import { ContainerMain } from './styles';

interface IPagination {
  page: number;
  totalPages: number;
}

function PostList({
  navigation,
}: NativeStackScreenProps<StackParamsList, 'PostList'>) {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    totalPages: 1,
  });

  const handleListPosts = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await PostService.getAll({
        page: 1,
      });
      setPosts(response.list);
      setPagination(() => ({
        page: 1,
        totalPages: response.pagination.total_page,
      }));
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log('err', err);
      }
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handlePagination = useCallback(async () => {
    if (pagination.page !== pagination.totalPages) {
      try {
        const response = await PostService.getAll({
          page: pagination.page + 1,
        });
        setPosts((oldState) => [...oldState, ...response.list]);
        setPagination((oldState) => ({
          ...oldState,
          page: oldState.page + 1,
          totalPages: response.pagination.total_page,
        }));
      } catch (err) {
        console.log('err', err);
        setIsError(true);
      }
    }
  }, [pagination.page, pagination.totalPages]);

  const handleLike = useCallback(
    async (id: number) => {
      try {
        await PostService.like({
          id,
        });
        handleListPosts();
      } catch (error) {
        console.log('error', error);
      }
    },
    [handleListPosts],
  );

  const handleShare = useCallback(
    async (id: number) => {
      try {
        const shareOptions = {
          message: 'Confira esta publicação!',
          url: `http://www.facebook.com.br`,
        };
        const result = await Share.open(shareOptions);
        console.log('result', JSON.stringify(result, null, 2));
        await PostService.share({
          id,
        });
        handleListPosts();
      } catch (error) {
        console.log('error', error);
      }
    },
    [handleListPosts],
  );

  const openDetails = useCallback(
    (data: IPostDetails) => {
      navigation.navigate('PostDetails', data);
    },
    [navigation],
  );

  useEffect(() => {
    handleListPosts();
  }, [handleListPosts]);

  return (
    <ContainerMain>
      <Containers.FlatList<IDataLoading>
        contentContainerStyle={{
          rowGap: 8,
          paddingBottom: 8,
          flexGrow: 1,
          marginTop: 8,
          backgroundColor: theme.white200,
        }}
        data={isLoading ? dataLoading : posts}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={
          <>
            <ComponentIsVisible when={!isError}>
              <ComponentEmpty message={'Nenhuma publicação encontrada'} />
            </ComponentIsVisible>
            <ComponentIsVisible when={isError}>
              <ComponentError tryAgain={handleListPosts} />
            </ComponentIsVisible>
          </>
        }
        ListFooterComponent={
          <ActivityIndicator color={theme.blue700} size="large" />
        }
        onEndReached={handlePagination}
        onEndReachedThreshold={0.2}
        onRefresh={handleListPosts}
        refreshing={isLoading}
        renderItem={({ item: post }) => (
          <ListingBody
            counterLikes={(post as IPost).counterLikes}
            counterShares={(post as IPost).counterShares}
            hasDetails
            id={(post as IPost).id}
            isLoading={isLoading}
            onLike={() => handleLike(post.id)}
            onShare={() => handleShare(post.id)}
            openDetails={() => openDetails(post as IPostDetails)}
            subtitle={(post as IPost).subtitle}
            thumbnail={(post as IPost).thumbnail}
            title={(post as IPost).title}
          />
        )}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </ContainerMain>
  );
}

export default PostList;
