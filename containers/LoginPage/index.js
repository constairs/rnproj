import React from 'react';
import { connect } from 'react-redux';
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import {
  userLoginRequest
} from '../../redux/users/actions';
import { history } from '../../redux/store';
import { Nav } from '../Nav';
import { colors } from '../../theme';

import { Container } from '../../components/UI/Container';
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
  
  userLogin = () => {
    this.setState({
      logged: true,
    });
    const data = [
      this.state.userLogin,
      this.state.userPassword
    ];
    this.props.userLoginRequest(data);
  }

  render() {
    const { userLogin, userPassword } = this.state;
    const { logged, email, userFetching } = this.props.user;
    return (
      <KeyboardAvoidingContainer behavior="padding" enabled>
        <Header>
          <HeaderTitle>
            Login
          </HeaderTitle>
        </Header>
        <Main>
          {
            userFetching ? (
              <ActivityIndicator size="large" color={colors.accent} />
            ) : (
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
                />
                <FormLink onPress={() => {history.push('/passwordReset')}}>
                  <FormLinkText>
                    Forgot password?
                  </FormLinkText>
                </FormLink>
                <FormButton
                  onPress={this.userLogin}
                  disabled={!userLogin && !userPassword}
                >
                  <FormButtonText disabled={!userLogin && !userPassword}>
                    Login
                  </FormButtonText>
                </FormButton>
              </Form>
            )
          }
        </Main>
        <BottomMenu>
          <Nav />
        </BottomMenu>
        </KeyboardAvoidingContainer>
    );
  }
}

export const LoginPage = connect(
  state => ({ user: state.users }),
  dispatch => ({
    userLoginRequest: bindActionCreators(userLoginRequest, dispatch)
  })
)(Page);
