import styled from 'styled-components/native';
import { colors } from '../../theme';

export const CloseBtn = styled.TouchableHighlight`
  width: 24px;
  height: 24px;
  border-radius: 24px;
  background-color: #cc0000;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 5px;
  top: 5px;
`;

export const CloseBtnText = styled.Text`
  color: ${colors.light}
`;