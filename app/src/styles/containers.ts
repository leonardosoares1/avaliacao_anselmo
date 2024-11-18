/* eslint-disable no-use-before-define */
import {ComponentType} from 'react';

import styled from 'styled-components/native';

import {Platform, FlatList as RNFlaList} from 'react-native';

const AvoidingView = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : 'height',
})`
  flex: 1;
`;

const FlatList = styled(RNFlaList as new <T>() => RNFlaList<T>)`
  background-color: ${({theme}) => theme.white200};
  width: 100%;
` as ComponentType as new <T>() => RNFlaList<T>;

const Scroll = styled.ScrollView.attrs(({theme}) => ({
  contentContainerStyle: {
    backgroundColor: theme.color.primary.main,
    flexGrow: 1,
  },
}))``;

const Containers = {
  AvoidingView,
  FlatList,
  Scroll,
};

export default Containers;
