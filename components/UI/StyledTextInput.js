import styled from 'styled-components/native';
import { colors } from '../../theme';

export const StyledTextInput = styled.TextInput`
  height: 40px;
  border-radius: 4px;
  background-color: ${ props => props.disabled ? colors.grey : colors.light };
  border-color: ${ props => props.disabled ? colors.dGrey : colors.accent };
  padding: 4px;
  border-width: 1px;
  width: 100%;
`;