import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  TouchableOpacity
} from 'react-native';
import { Link } from "react-router-native";
import { bindActionCreators } from 'redux';
import { UserProfile } from '../../components/UserProfile';
import { Nav } from '../Nav';
import { BackBtn } from '../../components/BackBtn';
import {
  updatePasswordRequest
} from '../../redux/users/actions';

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
          placeholder='enter password'
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {this.props.updatePasswordRequest(userPassword)}}
          disabled={!userPassword}
        >
          <Text style={styles.btnText}>
            Update password
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

export const PasswordUpdate = connect(
  state => ({ user: state.users }),
  dispatch => ({
    updatePasswordRequest: bindActionCreators(updatePasswordRequest, dispatch)
  })
)(Page);
