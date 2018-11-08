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
  userUpdateRequest
} from '../../redux/users/actions';

class Page extends React.Component {
  state = {
    userName: '',
    profileUrl: ''
  };
  render() {
    const { userName, profileUrl } = this.state;
    return (
      <View style={styles.container}>
        <BackBtn />
        <TextInput
          style={styles.textinput}
          onChangeText={(text) => this.setState({userName: text})}
          value={userName}
          placeholder='enter nickname'
          textContentType="nickname"
        />
        <TextInput
          style={styles.textinput}
          onChangeText={(text) => this.setState({profileUrl: text})}
          value={profileUrl}
          placeholder='enter image url'
          textContentType="URL"
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {this.props.userUpdateRequest([userName, profileUrl])}}
        >
          <Text style={styles.btnText}>
            Update profile
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

export const ProfileUpdate = connect(
  state => ({ user: state.users }),
  dispatch => ({
    userUpdateRequest: bindActionCreators(userUpdateRequest, dispatch)
  })
)(Page);
