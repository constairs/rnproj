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
import {
  userLoginRequest
} from '../../redux/users/actions';
import { history } from '../../redux/store';
import { BackBtn } from '../../components/BackBtn';


class Page extends React.Component {
  state = {
    userLogin: '',
    userPassword: '',
    logged: false,
  }
  
  userLogin = () => {
    this.setState({
      logged: true,
    });
    const data = [
      this.state.userLogin,
      this.state.userPassword
    ];
    this.props.userLoginRequest(data);
  }

  render() {
    const { userLogin, userPassword } = this.state;
    const { logged, email } = this.props.user;
    return (
      <View style={styles.container}>
        <BackBtn />
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
        <TouchableOpacity onPress={() => {history.push('/passwordReset')}}>
          <Text>
            Forget password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={this.userLogin}
          disabled={!userLogin && !userPassword}
        >
          <Text style={styles.btnText}>
            Login
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

export const LoginPage = connect(
  state => ({ user: state.users }),
  dispatch => ({
    userLoginRequest: bindActionCreators(userLoginRequest, dispatch)
  })
)(Page);
