import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { bindActionCreators } from 'redux';
import {
  userLoginRequest
} from '../../redux/users/actions';
import { history } from '../../redux/store';
import { Nav } from '../Nav';
import { theme } from '../../theme';

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
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.header}>
          <Text style={styles.title}>
            Login
          </Text>
        </View>
        <View style={styles.main}>
          <View style={styles.form}>
            <TextInput
              style={styles.textinput}
              onChangeText={(text) => this.setState({userLogin: text})}
              value={userLogin}
              placeholder='enter email'
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.textinput}
              textContentType="password"
              onChangeText={(text) => this.setState({userPassword: text})}
              value={userPassword}
              placeholder='enter password'
              secureTextEntry
            />
            <TouchableOpacity style={styles.formLink} onPress={() => {history.push('/passwordReset')}}>
              <Text style={styles.formLinkText}>
                Forget password?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.formBtn}
              onPress={this.userLogin}
              disabled={!userLogin && !userPassword}
            >
              <Text style={styles.formBtnText}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.menu}>
          <Nav />
        </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ...theme
});

export const LoginPage = connect(
  state => ({ user: state.users }),
  dispatch => ({
    userLoginRequest: bindActionCreators(userLoginRequest, dispatch)
  })
)(Page);
