import styled from 'styled-components/native';

import { ImageProps } from 'react-native';

import colors from '@styles/colors';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 32px;
`;

export const Image = styled.Image.attrs<Partial<ImageProps>>({
  resizeMode: 'contain',
})``;

export const Message = styled.Text`
  color: ${colors.gray300};
  font-family: 'Barlow-Medium';
  margin-bottom: 8px;
  margin-top: 16px;
  max-width: 50%;
  text-align: center;
`;
