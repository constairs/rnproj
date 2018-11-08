import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View} from 'react-native';
import { Link } from "react-router-native";

const N = () => {
  return(
    <View style={styles.nav}>
      <Link to="/">
        <Text style={styles.navLink}>Home</Text>
      </Link>
      <Link to="/issues/new">
        <Text style={styles.navLink}>New Issue</Text>
      </Link>
      <Link to="/my_issues">
        <Text style={styles.navLink}>My Issues</Text>
      </Link>
    </View>
  );
}

export const Nav = connect(
  state => ({ user: state.users })
)(N);

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    height: 100,
  },
  navLink: {
    color: '#fff',
    fontSize: 16,
  }
});