import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-native";
import { Nav } from '../Nav';
import { IssueList } from '../../components/IssueList';
import {
  fetchIssuesRequest,
  getIssueRequest
} from '../../redux/issues/actions';
import {
  fetchUsersRequest
} from '../../redux/users/actions';
import { history } from '../../redux/store';

class Page extends React.Component {
  componentDidMount() {
    this.props.fetchIssuesRequest({ user: this.props.users.email, forOwner: true });
  }

  getIssue = (issueId) => {
    this.props.getIssueRequest({
      user: this.props.users.email,
      issueId,
      forOwner: true
    });
  }

  render() {

    const { issues } = this.props.issues;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            My issues
          </Text>
        </View>
        <View style={styles.main}>
          <IssueList
            onGetIssue={this.getIssue}
            issues={issues}
          />
        </View>
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
    flexDirection: 'column',
    width: '100%'
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
  },
});

export const MyIssuesPage = connect(
  state => ({
    users: state.users,
    issues: state.issues,
  }),
  dispatch => ({
    fetchIssuesRequest: bindActionCreators(fetchIssuesRequest, dispatch),
    getIssueRequest: bindActionCreators(getIssueRequest, dispatch),
    fetchUsersRequest: bindActionCreators(fetchUsersRequest, dispatch)
  })
)(Page);
