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
  resetPaswordRequest
} from '../../redux/users/actions';
import { theme } from '../../theme';

class Page extends React.Component {
  state = {
    email: ''
  };
  render() {
    const { email } = this.state;
    return (
      <View style={styles.container}>
        <BackBtn />
        <TextInput
          style={styles.textinput}
          onChangeText={(text) => this.setState({email: text})}
          value={email}
          textContentType="emailAddress"
          placeholder="enter email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.formBtn}
          onPress={() => {this.props.resetPaswordRequest(email)}}
          disabled={!email}
        >
          <Text style={styles.formBtnText}>
            Reset password
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ...theme
});

export const PasswordReset = connect(
  state => ({ user: state.users }),
  dispatch => ({
    resetPaswordRequest: bindActionCreators(resetPaswordRequest, dispatch)
  })
)(Page);
