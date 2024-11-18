import React from 'react';

import { useTheme } from 'styled-components/native';

import { XCircle } from 'phosphor-react-native';

import ComponentTouchableBase from '@components/touchable/Base';

import ComponentIsVisible from '../IsVisible';
import { Container, ContainerButtons, Message } from './styles';

interface IProps {
  tryAgain?: () => void;
}

const ComponentError: React.FC<IProps> = ({ tryAgain }) => {
  const theme = useTheme();
  return (
    <Container>
      <XCircle color={theme.red700} size={100} />
      <Message>Falha ao carregar os dados</Message>
      <ComponentIsVisible when={!!tryAgain}>
        <ContainerButtons>
          <ComponentTouchableBase
            backgroundColor={theme.red700}
            flex={0.5}
            onPress={tryAgain}
          >
            Tentar novamente
          </ComponentTouchableBase>
        </ContainerButtons>
      </ComponentIsVisible>
    </Container>
  );
};

export default ComponentError;
