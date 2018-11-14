import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import styled from 'styled-components/native';
import { Link } from "react-router-native";
import { colors } from '../../theme';
import { StyledButton, ButtonText } from '../UI/StyledButton';

const LogoutButton = styled(StyledButton)`
  padding: 4px;
  width: 80px;
  height: auto;
  margin-top: 5px;
`;

const Profile = styled.View`
  flex: 1;
  background-color: rgb(40, 44, 52);
  align-items: center;
  justify-content: center;
  padding: 40px;
  width: 300px;
  flex-direction: row;
`;

const ImgContaier = styled.View`
  width: 40px;
  height: 40px;
  borderRadius: 40px;
  margin-right: 20px;
  flex: .15;
`;

const UserPhoto = styled.Image`
  width: 40px;
  height: 40px;
`;

const UserInfo = styled.View`
  flex: .85;
`;

const UserTitle = styled.Text`
  font-size: 18px;
  color: ${colors.light};
`;

export class UserProfile extends React.Component {
  render() {
    const { logged, email, photoURL, displayName } = this.props;
    const img = {uri: photoURL || 'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png'};
    return (
      <Profile>
        <ImgContaier>
          <UserPhoto source={img} />
        </ImgContaier>
        <UserInfo>
          <Link to="/user">
            <UserTitle>
              {displayName || email}
            </UserTitle>
          </Link>
          <LogoutButton onPress={() => {this.props.onLogout()}}>
            <ButtonText>
              Logout
            </ButtonText>
          </LogoutButton>
        </UserInfo>
      </Profile>
    );
  }
}
