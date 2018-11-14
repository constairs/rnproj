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
  userUpdateRequest
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
    profileName: '',
    profileUrl: ''
  };
  render() {
    const { profileName, profileUrl } = this.state;
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
              onChangeText={(text) => this.setState({profileName: text})}
              value={profileName}
              placeholder="enter nickname"
              textContentType="nickname"
              autoCapitalize="none"
            />
            <FormTextInput
              onChangeText={(text) => this.setState({profileUrl: text})}
              value={profileUrl}
              placeholder="enter image url"
              textContentType="URL"
              keyboardType="url"
              autoCapitalize="none"
            />
            <FormButton
              disabled={!profileName && !profileUrl}
              onPress={() => {this.props.userUpdateRequest({
                profileName,
                profileUrl
              }
              )}}
            >
              <FormButtonText
                disabled={!profileName && !profileUrl}>
                Update profile
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

export const ProfileUpdate = connect(
  state => ({ user: state.users }),
  dispatch => ({
    userUpdateRequest: bindActionCreators(userUpdateRequest, dispatch)
  })
)(Page);
