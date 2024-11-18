import styled from 'styled-components/native';

import { ImageProps } from 'react-native';

export const Container = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.white900};
  border-radius: 8px;
  justify-content: center;
  margin-left: 8px;
  margin-right: 8px;
  padding-top: 74px;
`;

export const Image = styled.Image.attrs<Partial<ImageProps>>({
  resizeMode: 'contain',
})``;

export const Message = styled.Text`
  color: ${({ theme }) => theme.red700};
  font-family: 'Barlow-Bold';
  font-size: 20px;
  margin-top: 8px;
  max-width: 100%;
  text-align: center;
`;

export const ContainerButtons = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 74px;
  margin-top: 32px;
  width: 150%;
`;
