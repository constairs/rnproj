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
  updateEmailRequest
} from '../../redux/users/actions';
import { theme } from '../../theme';

class Page extends React.Component {
  state = {
    userEmail: ''
  };
  render() {
    const { userEmail } = this.state;
    return (
      <View style={styles.container}>
        <BackBtn />
        <TextInput
          style={styles.textinput}
          onChangeText={(text) => this.setState({userEmail: text})}
          value={userEmail}
          placeholder='enter email'
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.formBtn}
          onPress={() => {this.props.updateEmailRequest(userEmail)}}
          disabled={!userEmail}
        >
          <Text style={styles.formBtnText}>
            Change email
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ...theme
});

export const EmailUpdate = connect(
  state => ({ user: state.users }),
  dispatch => ({
    updateEmailRequest: bindActionCreators(updateEmailRequest, dispatch)
  })
)(Page);
