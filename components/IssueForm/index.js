import React from 'react';
import {
  TextInput,
  Text,
  View,
  Picker,
  Item,
  TouchableOpacity
} from 'react-native';
import styled from 'styled-components';

import { Header } from '../../components/UI/Header';
import { HeaderTitle } from '../../components/UI/HeaderTitle';
import { Main } from '../../components/UI/Main';
import { BottomMenu } from '../../components/UI/BottomMenu';
import { FormButton, FormButtonText } from '../../components/UI/FormButton';
import { StyledTextInput } from '../../components/UI/StyledTextInput';
import { Form } from '../../components/UI/Form';
import { KeyboardAvoidingContainer  } from '../../components/UI/KeyboardAvoidingContainer';
import { StyledPicker } from '../../components/UI/StyledPicker';

const FormTextInput = styled(StyledTextInput)`
  margin-bottom: 20px;
`;

export class IssueForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issueTitle: props.title || '',
      issueDescription: props.description || '',
      issueFor: props.for || props.users.users[0]
    }
  }

  submitForm = (e) => {
    e.preventDefault();

    const issueData = {
      issueData: [
        this.props.issueId || `id${(+new Date()).toString(16)}`,
        this.props.createdAt || Date.now(),
        this.state.issueTitle,
        this.state.issueDescription,
        this.state.issueFor,
        this.props.issueId ? Date.now() : null
      ],
      issueFiles: []
    };

    this.props.onSubmitForm(issueData);
  }

  renderPickerItems() {
    return this.props.users.users.map((item) => {
      return (
        <Item
          label={item}
          value={item}
          key={item}
        />
      );
    });
  }

  render() {
    const {
      users
    } = this.props.users;
    const {
      issueTitle,
      issueDescription,
      issueFor
    } = this.state;

    return (
      <Form>
        <FormTextInput
          onChangeText={(text) => this.setState({issueTitle: text})}
          value={issueTitle}
          placeholder='enter title'
        />
        <FormTextInput
          onChangeText={(text) => this.setState({issueDescription: text})}
          value={issueDescription}
          placeholder='enter description'
        />
        <StyledPicker
          selectedValue={issueFor}
          value={issueFor}
          onValueChange={(itemValue, itemIndex) => this.setState({issueFor: itemValue})}>
          {this.renderPickerItems()}
        </StyledPicker>
        <FormButton
          onPress={this.submitForm}
        >
          <FormButtonText>
            { this.props.issueId ? 'Edit' : 'Create' } issue
          </FormButtonText>
        </FormButton>
      </Form>
    );
  }
}
