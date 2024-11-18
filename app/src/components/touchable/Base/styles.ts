import styled, { css } from 'styled-components/native';

import { ActivityIndicatorProps, TouchableOpacityProps } from 'react-native';

import colors from '@styles/colors';

interface IContainerProps {
  backgroundColor?: string;
  disabled?: boolean;
  flex?: number;
  height?: number;
  marginTop?: string;
  width?: number;
}

export const Container = styled.TouchableOpacity.attrs<
  IContainerProps,
  TouchableOpacityProps
>({
  activeOpacity: 0.75,
})<IContainerProps>`
  align-items: center;
  align-self: center;
  background-color: ${({ backgroundColor }) =>
    backgroundColor || colors.primary};
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  height: ${({ height }) => height || 44}px;
  justify-content: center;
  width: ${({ width }) => width || 100}%;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  flex: ${({ flex }) => flex || 1};
  font-family: 'Barlow-SemiBold';
  font-size: 18px;

  ${({ marginTop }) =>
    marginTop &&
    css`
      margin-top: marginTop;
    `}
`;

export const Text = styled.Text`
  color: ${colors.white900};
  font-family: 'Barlow-SemiBold';
  font-size: 16px;
  line-height: 16px;
`;

interface ILoadingProps {
  loadingColor?: string;
}

export const Loading = styled.ActivityIndicator.attrs<
  ILoadingProps,
  ActivityIndicatorProps
>((props) => ({
  size: 'small',
}))<ILoadingProps>``;
