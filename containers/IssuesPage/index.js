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
import { theme } from '../../theme';

class Page extends React.Component {
  componentDidMount() {
    this.props.fetchIssuesRequest({ user: this.props.users.email, forOwner: false });
  }

  getIssue = (issueId) => {
    this.props.getIssueRequest({
      user: this.props.users.email,
      issueId,
      forOwner: false
    });
  }

  render() {
    const { issues } = this.props.issues;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Issues
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
  ...theme
});

export const IssuesPage = connect(
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
