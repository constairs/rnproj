import styled from 'styled-components/native';
import { colors } from '../../theme';
import { StyledButton, ButtonText } from './StyledButton';

export const GhostButton = styled(StyledButton)`
  border-color: ${colors.accent};
  margin-left: 20px;
  background-color: transparent;
`;

export const GhostButtonText = styled(ButtonText)`
  color: ${colors.accent};
`;
