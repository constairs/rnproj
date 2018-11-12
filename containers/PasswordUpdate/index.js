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
  updatePasswordRequest
} from '../../redux/users/actions';
import { theme } from '../../theme';

class Page extends React.Component {
  state = {
    userPassword: ''
  };
  render() {
    const { userPassword } = this.state;
    return (
      <View style={styles.container}>
        <BackBtn />
        <TextInput
          style={styles.textinput}
          textContentType="password"
          onChangeText={(text) => this.setState({userPassword: text})}
          value={userPassword}
          placeholder="enter password"
          secureTextEntry
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.formBtn}
          onPress={() => {this.props.updatePasswordRequest(userPassword)}}
          disabled={!userPassword}
        >
          <Text style={styles.formBtnText}>
            Update password
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ...theme
});

export const PasswordUpdate = connect(
  state => ({ user: state.users }),
  dispatch => ({
    updatePasswordRequest: bindActionCreators(updatePasswordRequest, dispatch)
  })
)(Page);
