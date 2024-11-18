import styled from 'styled-components/native';

import {Platform} from 'react-native';

import colors from './colors';

const StatusBarBackground = styled.View`
  background-color: ${colors.primary};
  height: 70px;
  position: absolute;
  top: 0;
  width: 100%;
`;

const Separator = styled.View`
  background-color: ${colors.gray100};
  height: 1px;
  width: 100%;
`;

const GraphicTickLabelsStyle = {
  fill: colors.gray100,
  fontFamily: Platform.OS === 'ios' ? '' : 'Barlow-Regular',
  fontSize: 10,
};

const GraphicLabelsStyle = {
  fill: colors.gray100,
  fontFamily: Platform.OS === 'ios' ? '' : 'Barlow-Regular',
};

export default {
  GraphicTickLabelsStyle,
  GraphicLabelsStyle,
  StatusBarBackground,
  Separator,
};
