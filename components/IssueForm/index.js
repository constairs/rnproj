import React from 'react';
import {
  TextInput,
  Text,
  View,
  Picker,
  Item,
  Image,
  TouchableOpacity
} from 'react-native';
import styled from 'styled-components';
import ImagePicker from 'react-native-image-picker';

import { Header } from '../../components/UI/Header';
import { HeaderTitle } from '../../components/UI/HeaderTitle';
import { Main } from '../../components/UI/Main';
import { BottomMenu } from '../../components/UI/BottomMenu';
import { StyledButton, ButtonText } from '../../components/UI/StyledButton';
import { FormButton, FormButtonText } from '../../components/UI/FormButton';
import { StyledTextInput } from '../../components/UI/StyledTextInput';
import { Form } from '../../components/UI/Form';
import { KeyboardAvoidingContainer  } from '../../components/UI/KeyboardAvoidingContainer';


const FormTextInput = styled(StyledTextInput)`
  margin-bottom: 20px;
`;

const options = {
  title: 'Select image',
  customButtons: [{ name: 'fb', title: 'Choose Photo' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export class IssueForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issueTitle: props.title || '',
      issueDescription: props.description || '',
      issueFor: props.for || props.users.users[0],
      issueFiles: [],
      attachedPhoto: ''
    }
  }

  pickImageHandler = () => {
    ImagePicker.showImagePicker((response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
    
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        this.setState({
          attachedPhoto: source,
          issueFiles: [...this.state.issueFiles, source]
        });
      }
    });
  }

  resetHandler = () => {
    this.setState({
      attachedPhoto: '',
      issueFiles: []
    });
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
        <Picker.Item
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
      issueFor,
      attachedPhoto
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
        <Picker
          selectedValue={issueFor}
          value={issueFor}
          onValueChange={(itemValue, itemIndex) => this.setState({issueFor: itemValue})}>
          {this.renderPickerItems()}
        </Picker>
        <StyledButton onPress={this.pickImageHandler}>
          <ButtonText>
            Attach photo
          </ButtonText>
        </StyledButton>
        <StyledButton onPress={this.resetHandler}>
          <ButtonText>
            Reset
          </ButtonText>
        </StyledButton>
        {
          attachedPhoto ?
          <Image source={attachedPhoto} />
          : null
        }
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
