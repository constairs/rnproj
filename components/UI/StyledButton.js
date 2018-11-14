import styled from 'styled-components/native';
import { colors } from '../../theme';

export const StyledButton = styled.TouchableHighlight`
  border-radius: 4px;
  padding: 10px;
  height: 40px;
  border-width: 1px;
  background-color: ${ props => props.disabled ? colors.grey : colors.accent };
  border-color: ${ props => props.disabled ? colors.grey : colors.accent };
`;

export const ButtonText = styled.Text`
  color: ${ props => props.disabled ? colors.dGrey : colors.light };
  text-align: center;
`;
