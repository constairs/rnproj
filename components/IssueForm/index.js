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
import DatePicker from 'react-native-datepicker';

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

import { colors } from '../../theme';

const FormTextInput = styled(StyledTextInput)`
  margin-bottom: 0px;
`;

const ModalContent = styled.View`
  background-color: rgba(40, 44, 52, .66);
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
      attachedPhoto: '',
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
          attachedPhoto: source,
          issueFiles: [...this.state.issueFiles, source]
        });
      }
    });
  }

  setDate = (newDate) => {
    this.setState({deadline: newDate});
  }

  resetHandler = () => {
    this.setState({
      attachedPhoto: '',
      issueFiles: []
    });
  }

  switchHandler = (value) => {
    this.setState({
      isImportant: value
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
      attachedPhoto,
      deadline,
      isImportant,
      showPicker,
      showDatepicker
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

        <Label>
          <LabelText>
            Important
          </LabelText>
          <Switch
            value={isImportant}
            onValueChange={this.switchHandler}
            trackColor={colors.main}
            thumbColor={colors.main}
            trackColor={colors.main}
            ios_backgroundColor={colors.accent}
          />
        </Label>

        <Label>
          <LabelText>
            For
          </LabelText>
          <TouchanbleTextInput onPress={this.setPickerVisible}>
            <Text>
              {issueFor}
            </Text>
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
            Deadline (choose date)
          </LabelText>
          <DatePickerInput onPress={this.setDatepickerVisible}>
            <DatePickerText>
              {deadline.toDateString()}
            </DatePickerText>
          </DatePickerInput>
        </Label>
        <BottomFadeView show={showDatepicker} onCloseModal={this.setDatepickerVisible}>
          <DatePickerIOS
            date={deadline}
            onDateChange={this.setDate}
            locale="en_En"
          />
        </BottomFadeView>

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
        </ScrollView>
      </Form>
    );
  }
}
