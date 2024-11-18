import React, { useCallback, useEffect } from 'react';

import { BackHandler } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';

import colors from '@styles/colors';

import { Container } from './styles';

interface IComponentTouchableBackProps {
  color?: string;
}

const ComponentTouchableBack = ({ color }: IComponentTouchableBackProps) => {
  const { goBack } = useNavigation();

  const handleGoBack = useCallback(() => {
    Orientation.lockToPortrait();
    goBack();
  }, [goBack]);

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

  return (
    <Container onPress={handleGoBack}>
      <Ionicons
        color={color || colors.white900}
        name="chevron-back"
        size={24}
      />
    </Container>
  );
};

export default ComponentTouchableBack;
