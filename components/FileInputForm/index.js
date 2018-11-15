import React from 'react';
import { View, Text, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import { Form } from '../UI/Form';
import { StyledButton, ButtonText } from '../UI/StyledButton';

const options = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
  }
};

export class FileInputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filesToUpload: props.files || [],
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
        });
      }
    });
  }

  render() {
    const { attachedPhoto } = this.state;
    return(
      <Form>
        <StyledButton onPress={this.pickImageHandler}>
          <ButtonText>
            Attach photo
          </ButtonText>
        </StyledButton>
        {
          attachedPhoto ?
          <Image source={attachedPhoto} />
          : null
        }
        <Text>Text</Text>
      </Form>
    );
  }
}
