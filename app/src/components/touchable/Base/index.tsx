import React from 'react';

import { TouchableOpacityProps } from 'react-native';

import { Container, Loading, Text } from './styles';

interface IComponentTouchableBaseProps extends TouchableOpacityProps {
  backgroundColor?: string;
  flex?: number;
  height?: number;
  isLoading?: boolean;
  marginTop?: string;
  width?: number;
}

const ComponentTouchableBase = ({
  backgroundColor,
  children,
  disabled = false,
  flex,
  height,
  isLoading = false,
  marginTop,
  width,
  ...rest
}: IComponentTouchableBaseProps) => {
  return (
    <Container
      {...rest}
      backgroundColor={backgroundColor}
      disabled={disabled}
      flex={flex}
      height={height}
      marginTop={marginTop}
      width={width}
    >
      {isLoading ? <Loading /> : <Text>{children}</Text>}
    </Container>
  );
};

export default ComponentTouchableBase;
