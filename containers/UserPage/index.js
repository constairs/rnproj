import React from 'react';
import { connect } from 'react-redux';
import {
  TextInput,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity
} from 'react-native';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { UserProfile } from '../../components/UserProfile';
import { Nav } from '../Nav';
import {
  userLoginRequest,
  userLogoutRequest,
  userDeleteRequest
} from '../../redux/users/actions';
import { history } from '../../redux/store';

import { Container } from '../../components/UI/Container';
import { Header } from '../../components/UI/Header';
import { HeaderTitle } from '../../components/UI/HeaderTitle';
import { Main } from '../../components/UI/Main';
import { BottomMenu } from '../../components/UI/BottomMenu';
import { StyledButton, ButtonText } from '../../components/UI/StyledButton';

const Buttons = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 300px;
  flex: 9;
`;

const ProfileButton = styled(StyledButton)`
  width: 45%;
  margin-right: 2.5%;
  margin-left: 2.5%;
  margin-bottom: 15px;
`;

class Page extends React.Component {
  render() {
    const {
      logged,
      email,
      photoURL
    } = this.props.user;
    const img = {uri: photoURL || 'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png'};
    return (
        <Container>
          <Header>
            <HeaderTitle>
              {this.props.user.displayName || 'User Profile'}
            </HeaderTitle>
          </Header>
          <Main>
            {
              logged ? 
                <UserProfile {...this.props.user} onLogout={() => {this.props.userLogoutRequest()}} />
              : null
            }
            <Buttons>
              <ProfileButton
                onPress={() => {history.push('/profileUpdate')}}
              >
                <ButtonText>Update Profile</ButtonText>
              </ProfileButton>
              <ProfileButton
                onPress={() => {this.props.userDeleteRequest()}}
              >
                <ButtonText>Delete Profile</ButtonText>
              </ProfileButton>
              <ProfileButton
                onPress={() => {history.push('/emailUpdate')}}
              >
                <ButtonText>Update Email</ButtonText>
              </ProfileButton>
              <ProfileButton
                onPress={() => {history.push('/passwordUpdate')}}
              >
                <ButtonText>Update Password</ButtonText>
              </ProfileButton>
            </Buttons>
          </Main>
          <BottomMenu>
            <Nav />
          </BottomMenu>
      </Container>
    );
  }
}

export const UserPage = connect(
  state => ({ user: state.users }),
  dispatch => ({
    userLoginRequest: bindActionCreators(userLoginRequest, dispatch),
    userLogoutRequest: bindActionCreators(userLogoutRequest, dispatch),
    userDeleteRequest: bindActionCreators(userDeleteRequest, dispatch),
  })
)(Page);
