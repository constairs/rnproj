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
import { userCreateRequest } from '../../redux/users/actions';
import { Nav } from '../Nav';

import { theme } from '../../theme';

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
        <View style={styles.header}>
          <Text style={styles.title}>
            Auth
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
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.formBtn}
              onPress={this.userAuth}
              disabled={!userLogin && !userPassword}
            >
              <Text style={styles.formBtnText}>
                Auth
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.menu}>
          <Nav />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ...theme
});

export const AuthPage = connect(
  state => ({ user: state.users }),
  dispatch => ({
    userCreateRequest: bindActionCreators(userCreateRequest, dispatch)
  })
)(Page);
