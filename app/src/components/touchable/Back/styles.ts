import styled from 'styled-components/native';

import { TouchableOpacityProps } from 'react-native';

export const Container = styled.TouchableOpacity.attrs<TouchableOpacityProps>({
  activeOpacity: 0.75,
  hitSlop: {
    top: 22,
    right: 22,
    bottom: 22,
    left: 22,
  },
})`
  height: 30px;
  margin-right: 4px;
`;
