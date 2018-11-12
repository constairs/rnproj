import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { bindActionCreators } from 'redux';
import { BackBtn } from '../../components/BackBtn';
import {
  userUpdateRequest
} from '../../redux/users/actions';
import { theme } from '../../theme';

class Page extends React.Component {
  state = {
    profileName: '',
    profileUrl: ''
  };
  render() {
    const { profileName, profileUrl } = this.state;
    return (
      <View style={styles.container}>
        <BackBtn />
        <TextInput
          style={styles.textinput}
          onChangeText={(text) => this.setState({profileName: text})}
          value={profileName}
          placeholder="enter nickname"
          textContentType="nickname"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.textinput}
          onChangeText={(text) => this.setState({profileUrl: text})}
          value={profileUrl}
          placeholder="enter image url"
          textContentType="URL"
          keyboardType="url"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.formBtn}
          onPress={() => {this.props.userUpdateRequest({
            profileName,
            profileUrl
          }
          )}}
        >
          <Text style={styles.formBtnText}>
            Update profile
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ...theme
});

export const ProfileUpdate = connect(
  state => ({ user: state.users }),
  dispatch => ({
    userUpdateRequest: bindActionCreators(userUpdateRequest, dispatch)
  })
)(Page);
