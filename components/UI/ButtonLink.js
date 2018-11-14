import styled from 'styled-components/native';
import { colors } from '../../theme';
import { Link } from "react-router-native";

export const ButtonLink = styled(Link)`
  border-radius: 4px;
  flex: .45;
  padding: 10px;
  height: 40px;
  border-width: 1px;
  background-color: ${colors.accent};
`;

export const ButtonLinkGhost = styled(ButtonLink)`
  background-color: transparent;
  border-color: ${colors.accent};
`;
