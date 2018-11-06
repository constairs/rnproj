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
import { bindActionCreators } from 'redux';
import { userCreateRequest } from '../../redux/users/actions';


class Page extends React.Component {
  state = {
    userLogin: '',
    userPassword: '',
    logged: false,
  }
  
  userAuth = () => {
    this.setState({
      logged: true,
    });
    const data = [
      this.state.userLogin,
      this.state.userPassword
    ];
    this.props.userCreateRequest(data);
  }

  render() {
    const { userLogin, userPassword } = this.state;
    const { logged, email } = this.props.user;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textinput}
          onChangeText={(text) => this.setState({userLogin: text})}
          value={userLogin}
          placeholder='enter email'
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.textinput}
          textContentType="password"
          onChangeText={(text) => this.setState({userPassword: text})}
          value={userPassword}
          placeholder='enter password'
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={this.userAuth}
          disabled={!userLogin && !userPassword}
        >
          <Text style={styles.btnText}>
            Auth
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

export const AuthPage = connect(
  state => ({ user: state.users }),
  dispatch => ({
    userCreateRequest: bindActionCreators(userCreateRequest, dispatch)
  })
)(Page);
