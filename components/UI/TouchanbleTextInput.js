import styled from 'styled-components/native';
import { colors} from '../../theme';


export const TouchanbleTextInput = styled.TouchableOpacity`
  background-color: ${colors.light};
  height: 40px;
  border-radius: 4px;
  width: 100%;
  padding: 8px 10px;
`;

export const TouchanbleTextInputContent = styled.Text`
  font-size: 14px;
`;
