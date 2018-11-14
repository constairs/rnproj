import React from 'react';
import { connect } from 'react-redux';
import {
  TextInput,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { userCreateRequest } from '../../redux/users/actions';
import { Nav } from '../Nav';

import { Header } from '../../components/UI/Header';
import { HeaderTitle } from '../../components/UI/HeaderTitle';
import { Main } from '../../components/UI/Main';
import { BottomMenu } from '../../components/UI/BottomMenu';
import { FormButton, FormButtonText } from '../../components/UI/FormButton';
import { StyledTextInput } from '../../components/UI/StyledTextInput';
import { Form } from '../../components/UI/Form';
import { FormLink, FormLinkText } from '../../components/UI/FormLink';
import { KeyboardAvoidingContainer  } from '../../components/UI/KeyboardAvoidingContainer';

const FormTextInput = styled(StyledTextInput)`
  margin-bottom: 30px;
`;

class Page extends React.Component {
  state = {
    userLogin: '',
    userPassword: '',
    logged: false,
  }
  
  userAuth = () => {
    this.setState({
      logged: true,
    });
    const data = [
      this.state.userLogin,
      this.state.userPassword
    ];
    this.props.userCreateRequest(data);
  }

  render() {
    const { userLogin, userPassword } = this.state;
    const { logged, email } = this.props.user;
    return (
      <KeyboardAvoidingContainer>
        <Header>
          <HeaderTitle>
            Auth
          </HeaderTitle>
        </Header>
        <Main>
          <Form>
            <FormTextInput
              onChangeText={(text) => this.setState({userLogin: text})}
              value={userLogin}
              placeholder='enter email'
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <FormTextInput
              textContentType="password"
              onChangeText={(text) => this.setState({userPassword: text})}
              value={userPassword}
              placeholder='enter password'
              secureTextEntry
              autoCapitalize="none"
            />
            <FormButton
              onPress={this.userAuth}
              disabled={!userLogin && !userPassword}
            >
              <FormButtonText disabled={!userLogin && !userPassword}>
                Auth
              </FormButtonText>
            </FormButton>
          </Form>
        </Main>
        <BottomMenu>
          <Nav />
        </BottomMenu>
      </KeyboardAvoidingContainer>
    );
  }
}

export const AuthPage = connect(
  state => ({ user: state.users }),
  dispatch => ({
    userCreateRequest: bindActionCreators(userCreateRequest, dispatch)
  })
)(Page);
