import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Link } from "react-router-native";
import { UserProfile } from '../../components/UserProfile';
import { Nav } from '../Nav';
import { bindActionCreators } from 'redux';
import { userLogoutRequest } from '../../redux/users/actions'
import { theme } from '../../theme';

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
        <View style={styles.main}>
        {
          logged ?
            <UserProfile
              {...this.props.user}
              onLogout={() => {this.props.userLogoutRequest()}} 
            />
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
});

export const StartPage = connect(
  state => ({ user: state.users }),
  dispatch => ({ userLogoutRequest: bindActionCreators(userLogoutRequest, dispatch) })
)(Page);
