import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.white900};
  border-radius: 8px;
  elevation: 2;
  flex-direction: column;
  justify-content: space-between;
  margin: 8px 16px;
  padding: 16px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const Thumbnail = styled.Image`
  border-radius: 8px;
  height: 200px;
  margin-bottom: 16px;
  width: 100%;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.color.primary.main};
  font-family: 'Barlow-Bold';
  font-size: 18px;
  margin-bottom: 8px;
`;

export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.gray400};
  font-family: 'Barlow-Regular';
  font-size: 14px;
  margin-bottom: 16px;
`;

export const Value = styled.Text`
  color: ${({ theme }) => theme.gray400};
  font-family: 'Barlow-Medium';
  font-size: 14px;
`;

export const ValueContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const LikeButton = styled.TouchableOpacity`
  align-items: center;
  background-color: ${({ theme }) => theme.color.primary.main};
  border-radius: 8px;
  height: 40px;
  justify-content: center;
  padding: 8px;
  width: 40px;
`;

export const ShareButton = styled.TouchableOpacity`
  align-items: center;
  background-color: ${({ theme }) => theme.color.primary.main};
  border-radius: 8px;
  height: 40px;
  justify-content: center;
  padding: 8px;
  width: 40px;
`;
