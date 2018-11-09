import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import { Link } from "react-router-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

class N extends React.Component {
  state = {
    pressStatus: false
  }

  render () {
    const { pressStatus } = this.state;
    return(
      <View style={styles.nav}>
        <View style={styles.navItem}>
          <Link to="/">
            <Text
              style={styles.navLink}>
                Home
            </Text>
          </Link>
        </View>
        <View style={styles.navItem}>
          <Link to="/issues/new">
            <Text style={styles.navLink}>New</Text>
          </Link>
        </View>
        <View style={styles.navItem}>
          <Link to="/my_issues">
            <Text style={styles.navLink}>My</Text>
          </Link>
        </View>
      </View>
    );
  }

}

export const Nav = connect(
  state => ({ user: state.users })
)(N);

const styles = StyleSheet.create({
  nav: {
    backgroundColor: '#fff',
    height: 40,
    justifyContent: 'space-around',
    flexDirection: 'row',
    flex: 1
  },
  navItem: {
    flex: 1
  },
  navLink: {
    color: '#000',
    fontSize: 16,
    height: 40,
    lineHeight: 40,
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  pressedNavLink: {
    color: '#fff'
  }
});
