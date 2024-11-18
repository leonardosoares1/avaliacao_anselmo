import React from 'react';

import empty from '@assets/utils/empty.png';

import { Container, Image, Message } from './styles';

interface IComponentEmptyProps {
  message?: string;
}

const ComponentEmpty: React.FC<IComponentEmptyProps> = ({
  message = 'Nenhum resultado encontrado',
}) => {
  return (
    <Container>
      <Image source={empty} />
      <Message>{message}</Message>
    </Container>
  );
};

export default ComponentEmpty;
