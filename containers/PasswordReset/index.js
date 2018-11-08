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
          placeholder='enter email'
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {this.props.resetPaswordRequest(email)}}
          disabled={!email}
        >
          <Text style={styles.btnText}>
            Reset password
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(40, 44, 52)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40
  },
  textinput: {
    height: 40,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    padding: 4,
    borderWidth: 1,
    width: 200,
    marginBottom: 20
  },
  btn: {
    backgroundColor: '#61dafb',
    borderRadius: 4,
    padding: 10,
    width: 200,
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16
  }
});

export const PasswordReset = connect(
  state => ({ user: state.users }),
  dispatch => ({
    resetPaswordRequest: bindActionCreators(resetPaswordRequest, dispatch)
  })
)(Page);
