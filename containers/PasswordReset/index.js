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
import {
  resetPaswordRequest
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
    email: ''
  };
  render() {
    const { email } = this.state;
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
              onChangeText={(text) => this.setState({email: text})}
              value={email}
              textContentType="emailAddress"
              placeholder="enter email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <FormButton
              onPress={() => {this.props.resetPaswordRequest(email)}}
              disabled={!email}
            >
              <FormButtonText>
                Reset password
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

export const PasswordReset = connect(
  state => ({ user: state.users }),
  dispatch => ({
    resetPaswordRequest: bindActionCreators(resetPaswordRequest, dispatch)
  })
)(Page);
