import React from 'react';
import {
  TextInput,
  Text,
  View,
  Picker,
  Item,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  DatePickerIOS,
  ScrollView,
  Switch
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
import { KeyboardAvoidingContainer } from '../../components/UI/KeyboardAvoidingContainer';
import { Label, LabelText } from '../../components/UI/Label';
import { BottomFadeView } from '../UI/BottomFadeView';
import { TouchanbleTextInput, TouchanbleTextInputContent } from '../UI/TouchanbleTextInput';
import { FileItem, FileItemImage } from '../../components/UI/FileItem';

import { colors } from '../../theme';

const FormTextInput = styled(StyledTextInput)`
  margin-bottom: 0px;
`;

const ModalContent = styled.View`
  background-color: rgba(40, 44, 52, .66);
`;

const AttachedImages = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DatePickerInput = styled.TouchableOpacity`
  background-color: ${colors.light};
  height: 40px;
  border-radius: 4px;
  width: 100%;
  padding: 8px 10px;
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
      switchDeadline: false,
      deadline: new Date(),
      isImportant: false,
      showPicker: false,
      showDatepicker: false
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
          // attachedPhoto: response,
          issueFiles: [...this.state.issueFiles, response]
        });
      }
    });
  }

  setDate = (newDate) => {
    this.setState({deadline: newDate});
  }

  resetHandler = () => {
    this.setState({
      issueFiles: []
    });
  }

  setPickerVisible = () => {
    this.setState({
      showPicker: !this.state.showPicker,
    });
  }

  setDatepickerVisible = () => {
    this.setState({
      showDatepicker: !this.state.showDatepicker,
    });
  }

  submitForm = (e) => {
    e.preventDefault();

    // const issueData = {
    //   issueData: [
    //     this.props.issueId || `id${(+new Date()).toString(16)}`,
    //     this.props.createdAt || Date.now(),
    //     this.state.issueTitle,
    //     this.state.issueDescription,
    //     this.state.issueFor,
    //     switchDeadline ? this.state.deadline : false,
    //     this.state.isImportant,
    //     this.props.issueId ? Date.now() : null,
    //   ],
    //   issueFiles: []
    // };

    const issueData = {
      issueInfo: {
        issueId: this.props.issueId || `id${(+new Date()).toString(16)}`,
        createdAt: this.props.createdAt || Date.now(),
        title: this.state.issueTitle,
        description: this.state.issueDescription,
        for: this.state.issueFor,
        deadline: this.state.switchDeadline ? this.state.deadline : false,
        important: this.state.isImportant,
        updatedAt: this.props.issueId ? Date.now() : null,
      },
      issueFiles: this.state.issueFiles
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

  renderImageItems(list) {
    return list.map(item => (
      <FileItem key={item}>
        <FileItemImage 
          source={{ uri: item.uri }}
        />
      </FileItem>
    ))
  }

  render() {
    const {
      users
    } = this.props.users;
    const {
      issueTitle,
      issueDescription,
      issueFor,
      attachedPhoto,
      switchDeadline,
      deadline,
      isImportant,
      showPicker,
      showDatepicker,
      issueFiles
    } = this.state;

    return (
      <Form>
        <ScrollView>
        <Label>
          <LabelText>
            Issue title
          </LabelText>
          <FormTextInput
            onChangeText={(text) => this.setState({issueTitle: text})}
            value={issueTitle}
            placeholder='enter title'
          />
        </Label>
        <Label>
          <LabelText>
            Issue title
          </LabelText>
          <FormTextInput
            onChangeText={(text) => this.setState({issueDescription: text})}
            value={issueDescription}
            placeholder='enter description'
          />
        </Label>

        <StyledButton onPress={this.pickImageHandler}>
          <ButtonText>
            Attach photo
          </ButtonText>
        </StyledButton>

        {
          issueFiles.length > 0 ? (
            <AttachedImages>
              {
                this.renderImageItems(issueFiles)
              }
            </AttachedImages>
          ) : null
        }

        <Label>
          <LabelText>
            Important
          </LabelText>
          <Switch
            value={isImportant}
            onValueChange={() => {this.setState({isImportant: !isImportant})}}
            trackColor={colors.accent}
            thumbColor={colors.light}
            tintColor={colors.accent}
          />
        </Label>

        <Label>
          <LabelText>
            For
          </LabelText>
          <TouchanbleTextInput onPress={this.setPickerVisible}>
            <TouchanbleTextInputContent>
              {issueFor}
            </TouchanbleTextInputContent>
          </TouchanbleTextInput>
        </Label>
        <BottomFadeView show={showPicker} onCloseModal={this.setPickerVisible}>
          <Picker
            selectedValue={issueFor}
            value={issueFor}
            onValueChange={(itemValue, itemIndex) => this.setState({issueFor: itemValue})}>
            {this.renderPickerItems()}
          </Picker>
        </BottomFadeView>

        <Label>
          <LabelText>
            Deadline
          </LabelText>
          <Switch
            value={switchDeadline}
            onValueChange={() => {this.setState({switchDeadline: !switchDeadline})}}
            trackColor={colors.accent}
            thumbColor={colors.light}
            // ios_backgroundColor={colors.accent}
          />

          <TouchanbleTextInput disabled={!switchDeadline} onPress={this.setDatepickerVisible}>
            <TouchanbleTextInputContent disabled={!switchDeadline}>
              {deadline.toDateString()}
            </TouchanbleTextInputContent>
          </TouchanbleTextInput>
        </Label>
        <BottomFadeView show={showDatepicker} onCloseModal={this.setDatepickerVisible}>
          <DatePickerIOS
            date={deadline}
            onDateChange={this.setDate}
            locale="en_En"
          />
        </BottomFadeView>

        <FormButton
          onPress={this.submitForm}
        >
          <FormButtonText>
            { this.props.issueId ? 'Edit' : 'Create' } issue
          </FormButtonText>
        </FormButton>
        </ScrollView>
      </Form>
    );
  }
}
