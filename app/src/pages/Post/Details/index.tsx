import React, { useCallback, useEffect, useState } from 'react';

import { BackHandler, ScrollView } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Share from 'react-native-share';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamsList } from '@routes/index';
import { ShareNetwork, ThumbsUp } from 'phosphor-react-native';

import IPostDetails from '@models/PostDetails';

import PostService from '@services/post/PostService';

import {
  ButtonContainer,
  ContainerMain,
  Content,
  LikeButton,
  ShareButton,
  Subtitle,
  Thumbnail,
  Title,
} from './styles';

function PostDetails({
  navigation,
  route,
}: NativeStackScreenProps<StackParamsList, 'PostDetails'>) {
  const [details, setDetails] = useState<IPostDetails>();

  const handleDetails = useCallback(async () => {
    try {
      const response = await PostService.getDetails({
        id: route.params?.id,
      });
      setDetails(response);
    } catch (error) {
      console.log('error', error);
    }
  }, [route.params?.id]);

  const handleLike = useCallback(async () => {
    try {
      await PostService.like({ id: route.params?.id });
    } catch (error) {
      console.log('error', error);
    }
  }, [route.params?.id]);

  const handleShare = useCallback(async () => {
    try {
      await PostService.share({ id: route.params?.id });
      const shareOptions = {
        message: 'Confira esta publicação!',
      };
      await Share.open(shareOptions);
    } catch (error) {
      console.log('error', error);
    }
  }, [route.params?.id]);

  const handleGoBack = useCallback(() => {
    Orientation.lockToPortrait();
    navigation.goBack();
  }, [navigation]);

  const handleGoBackHandler = useCallback(() => {
    handleGoBack();
    return true;
  }, [handleGoBack]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleGoBackHandler);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleGoBackHandler);
    };
  }, [handleGoBackHandler]);

  useEffect(() => {
    handleDetails();
  }, [handleDetails]);

  return (
    <ScrollView>
      <ContainerMain>
        <Thumbnail source={{ uri: details?.thumbnail }} />

        <Title>{details?.title}</Title>

        <Subtitle>{route.params?.subtitle}</Subtitle>

        <Content>{details?.content}</Content>

        <ButtonContainer>
          <LikeButton onPress={handleLike}>
            <ThumbsUp color="#fff" size={24} />
          </LikeButton>
          <ShareButton onPress={handleShare}>
            <ShareNetwork color="#fff" size={24} />
          </ShareButton>
        </ButtonContainer>
      </ContainerMain>
    </ScrollView>
  );
}

export default PostDetails;
