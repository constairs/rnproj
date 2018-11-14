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
import { BackBtn } from '../../components/BackBtn';
import {
  updatePasswordRequest
} from '../../redux/users/actions';
import { Nav } from '../Nav';

import { Header } from '../../components/UI/Header';
import { HeaderTitle } from '../../components/UI/HeaderTitle';
import { Main } from '../../components/UI/Main';
import { BottomMenu } from '../../components/UI/BottomMenu';
import { FormButton, FormButtonText } from '../../components/UI/FormButton';
import { StyledTextInput } from '../../components/UI/StyledTextInput';
import { Form } from '../../components/UI/Form';
import { KeyboardAvoidingContainer  } from '../../components/UI/KeyboardAvoidingContainer';

const FormTextInput = styled(StyledTextInput)`
  margin-bottom: 20px;
`;

class Page extends React.Component {
  state = {
    userPassword: ''
  };
  render() {
    const { userPassword } = this.state;
    return (
      <KeyboardAvoidingContainer>
        <Header>
          <HeaderTitle>
            Reset Password
          </HeaderTitle>
        </Header>
        <Main>
          <Form>
            <FormTextInput
              textContentType="password"
              onChangeText={(text) => this.setState({userPassword: text})}
              value={userPassword}
              placeholder="enter password"
              secureTextEntry
              autoCapitalize="none"
            />
            <FormButton
              onPress={() => {this.props.updatePasswordRequest(userPassword)}}
              disabled={!userPassword}
            >
              <FormButtonText
                disabled={!userPassword}
              >
                Update password
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

export const PasswordUpdate = connect(
  state => ({ user: state.users }),
  dispatch => ({
    updatePasswordRequest: bindActionCreators(updatePasswordRequest, dispatch)
  })
)(Page);
