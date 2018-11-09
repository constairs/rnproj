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
          <UserProfile {...this.props.user} onLogout={() => {this.props.userLogoutRequest()}} />
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
          <Nav />
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
  button: {
    borderRadius: 4,
    backgroundColor: '#61dafb',
    height: 36,
    padding: 10,
    width: 150
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
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
