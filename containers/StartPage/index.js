import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Link } from "react-router-native";
import { UserProfile } from '../../components/UserProfile';
import { Nav } from '../Nav';
import { bindActionCreators } from 'redux';
import { userLogoutRequest } from '../../redux/users/actions'

class Page extends React.Component {
  render() {
    const { logged, email } = this.props.user;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            App
          </Text>
        </View>
        {
          logged ?
          <View style={styles.main}>
            <UserProfile
              {...this.props.user}
              onLogout={() => {this.props.userLogoutRequest()}} 
            />
          </View>
          :
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.button}
            >
              <Link to="/login" >
                <Text style={styles.buttonText}>Login</Text>
              </Link>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonGhost}
            >
              <Link to="/auth" >
                <Text style={styles.buttonGhostText}>Auth</Text>
              </Link>
            </TouchableOpacity>
          </View>
        }
        <View style={styles.menu}>
          <Nav />
        </View>
      </View>
    );
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(40, 44, 52)',
    flexDirection: 'column'
  },
  header: {
    flex: .8,
    backgroundColor: '#61dafb',
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  main: {
    flex: 10,
  },
  menu: {
    flex: .8,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    backgroundColor: '#61dafb',
  },
  button: {
    backgroundColor: '#61dafb',
    flex: 0.45,
    borderRadius: 4,
    padding: 10,
    height: 40
  },
  buttonGhost: {
    borderRadius: 4,
    flex: 0.45,
    padding: 10,
    height: 40,
    borderWidth: 1,
    borderColor: '#61dafb',
    marginLeft: 20
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center'
  },
  buttonGhostText: {
    color: '#61dafb',
    textAlign: 'center'
  },
  buttons: {
    flex: 1,
    flexDirection: 'row'
  }
});

export const StartPage = connect(
  state => ({ user: state.users }),
  dispatch => ({ userLogoutRequest: bindActionCreators(userLogoutRequest, dispatch) })
)(Page);
