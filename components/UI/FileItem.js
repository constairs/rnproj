import styled from 'styled-components/native';
import { colors } from '../../theme';

export const FileItem = styled.View`
  width: 80px;
  height: 80px;
  padding: 12px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.lighten};
  box-shadow: 0 0 10px rgba(0, 0, 0, .33);
  border-radius: 4px;
  margin-right: 10px;
`;

export const FileItemImage = styled.Image`
  width: 100%;
  height: 100%;
`;
