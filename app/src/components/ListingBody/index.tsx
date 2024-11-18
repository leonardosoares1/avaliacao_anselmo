import React from 'react';

import { ShareNetwork, ThumbsUp } from 'phosphor-react-native';

import ComponentIsVisible from '@components/utils/IsVisible';
import ComponentContentLoader from '@components/utils/Loading/ContentLoader';

import {
  ButtonContainer,
  Container,
  LikeButton,
  ShareButton,
  Subtitle,
  Thumbnail,
  Title,
  Value,
  ValueContainer,
} from './styles';

interface IProps {
  counterLikes: number;
  counterShares: number;
  hasDetails?: boolean;
  id: number;
  isLoading: boolean;
  onLike: () => void;
  onShare: () => void;
  openDetails?: () => void;
  subtitle: string;
  thumbnail: string;
  title: string | number;
}

const ListingBody = ({
  counterLikes,
  counterShares,
  hasDetails,
  isLoading,
  onLike,
  onShare,
  openDetails,
  subtitle,
  thumbnail,
  title,
}: IProps) => {
  return (
    <Container
      activeOpacity={0.75}
      disabled={!hasDetails}
      onPress={openDetails}
    >
      <ComponentIsVisible when={isLoading}>
        <ComponentContentLoader.Line height={16} width={200} />
      </ComponentIsVisible>

      <ComponentIsVisible when={!isLoading}>
        <Thumbnail source={{ uri: thumbnail }} />
      </ComponentIsVisible>

      <ComponentIsVisible when={!isLoading}>
        <Title>{title}</Title>
      </ComponentIsVisible>

      <ComponentIsVisible when={!isLoading}>
        <Subtitle>{subtitle}</Subtitle>
      </ComponentIsVisible>

      <ComponentIsVisible when={!isLoading}>
        <ValueContainer>
          <Value>Curtidas: {counterLikes}</Value>
          <Value>Compartilhamentos: {counterShares}</Value>
        </ValueContainer>
      </ComponentIsVisible>

      <ComponentIsVisible when={!isLoading}>
        <ButtonContainer>
          <LikeButton onPress={onLike}>
            <ThumbsUp color="#fff" size={24} />
          </LikeButton>
          <ShareButton onPress={onShare}>
            <ShareNetwork color="#fff" size={24} />
          </ShareButton>
        </ButtonContainer>
      </ComponentIsVisible>

      <ComponentIsVisible when={isLoading}>
        <ComponentContentLoader.Line height={16} width={70} />
      </ComponentIsVisible>
    </Container>
  );
};

export default ListingBody;
