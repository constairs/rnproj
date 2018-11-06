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
import { BackBtn } from '../../components/BackBtn';
import { Nav } from '../Nav';
import {
  updateEmailRequest
} from '../../redux/users/actions';

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
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {this.props.updateEmailRequest(userEmail)}}
          disabled={!userEmail}
        >
          <Text style={styles.btnText}>
            Change email
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

export const EmailUpdate = connect(
  state => ({ user: state.users }),
  dispatch => ({
    updateEmailRequest: bindActionCreators(updateEmailRequest, dispatch)
  })
)(Page);
