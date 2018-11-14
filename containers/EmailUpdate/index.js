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
import { Nav } from '../Nav';
import {
  updateEmailRequest
} from '../../redux/users/actions';

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
    userEmail: ''
  };
  render() {
    const { userEmail } = this.state;
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
              onChangeText={(text) => this.setState({userEmail: text})}
              value={userEmail}
              placeholder='enter email'
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <FormButton
              onPress={() => {this.props.updateEmailRequest(userEmail)}}
              disabled={!userEmail}
            >
              <FormButtonText
                disabled={!userEmail}
              >
                Change email
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

export const EmailUpdate = connect(
  state => ({ user: state.users }),
  dispatch => ({
    updateEmailRequest: bindActionCreators(updateEmailRequest, dispatch)
  })
)(Page);
