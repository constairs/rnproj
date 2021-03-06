import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity
} from 'react-native';
import { bindActionCreators } from 'redux';
import { UserProfile } from '../../components/UserProfile';
import { Nav } from '../Nav';
import {
  userLoginRequest,
  userLogoutRequest,
  userDeleteRequest
} from '../../redux/users/actions';
import { history } from '../../redux/store';
import { theme } from '../../theme';

class Page extends React.Component {
  render() {
    const {
      logged,
      email,
      photoURL
    } = this.props.user;
    const img = {uri: photoURL || 'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png'};
    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {this.props.user.displayName || 'User Profile'}
            </Text>
          </View>
          <View style={styles.main}>
            <View>
              <UserProfile {...this.props.user} onLogout={() => {this.props.userLogoutRequest()}} />
              <View style={styles.box}>
                <Text style={styles.text}>{this.props.user.email}</Text>
                <View style={styles.buttons}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {history.push('/profileUpdate')}}
                  >
                    <Text style={styles.buttonText}>
                      Update Profile
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {this.props.userDeleteRequest()}}
                  >
                    <Text style={styles.buttonText}>
                      Delete Profile
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {history.push('/emailUpdate')}}
                  >
                    <Text style={styles.buttonText}>
                      Update Email
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {history.push('/passwordUpdate')}}
                  >
                    <Text style={styles.buttonText}>
                      Update Password
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
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
  ...theme,
  box: {
    width: 300,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    borderRadius: 4,
    backgroundColor: '#61dafb',
    height: 36,
    padding: 10,
    width: 140,
    marginBottom: 10,
    marginRight: 10
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    height: 100
  }
});

export const UserPage = connect(
  state => ({ user: state.users }),
  dispatch => ({
    userLoginRequest: bindActionCreators(userLoginRequest, dispatch),
    userLogoutRequest: bindActionCreators(userLogoutRequest, dispatch),
    userDeleteRequest: bindActionCreators(userDeleteRequest, dispatch),
  })
)(Page);
