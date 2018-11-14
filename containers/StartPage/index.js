import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity } from 'react-native';
import { Link } from "react-router-native";
import styled from 'styled-components/native';
import { UserProfile } from '../../components/UserProfile';
import { Nav } from '../Nav';
import { bindActionCreators } from 'redux';
import { userLogoutRequest } from '../../redux/users/actions'

import { Container } from '../../components/UI/Container';
import { Header } from '../../components/UI/Header';
import { HeaderTitle } from '../../components/UI/HeaderTitle';
import { Main } from '../../components/UI/Main';
import { BottomMenu } from '../../components/UI/BottomMenu';
import { GhostButton, GhostButtonText } from '../../components/UI/GhostButton';
import { ButtonLink, ButtonLinkGhost } from '../../components/UI/ButtonLink';
import { ButtonText } from '../../components/UI/StyledButton';

const Buttons = styled.View`
  flex-direction: row;
  justify-content: space-around;
  display: flex;
`;

const StyledButtonLinkGhost = styled(ButtonLinkGhost)`
  margin-left: 20px;
`;

class Page extends React.Component {
  render() {
    const { logged, email } = this.props.user;
    return (
      <Container>
        <Header>
          <HeaderTitle>
            App
          </HeaderTitle>
        </Header>
        <Main>
        {
          logged ?
            <UserProfile
              {...this.props.user}
              onLogout={() => {this.props.userLogoutRequest()}} 
            />
          :
          <Buttons>
            <ButtonLink to="/login" >
                <ButtonText>Login</ButtonText>
              </ButtonLink>
            <StyledButtonLinkGhost to="/auth">
              <GhostButtonText>Auth</GhostButtonText>
            </StyledButtonLinkGhost>
          </Buttons>
        }
        </Main>
        <BottomMenu>
          <Nav />
        </BottomMenu>
      </Container>
    );
  }
}

export const StartPage = connect(
  state => ({ user: state.users }),
  dispatch => ({ userLogoutRequest: bindActionCreators(userLogoutRequest, dispatch) })
)(Page);
