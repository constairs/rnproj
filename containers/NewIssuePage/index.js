import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Picker,
  TouchableOpacity
} from 'react-native';
import { bindActionCreators } from 'redux';
import { Nav } from '../Nav';
import {
  createIssueRequest
} from '../../redux/issues/actions';
import {
  fetchUsersRequest
} from '../../redux/users/actions';
import { history } from '../../redux/store';
import { IssueForm } from '../../components/IssueForm';
import { theme } from '../../theme';

class Page extends React.Component {
  componentDidMount() {
    this.props.fetchUsersRequest()
  }

  editIssue = (issueData) => {
    this.props.createIssueRequest({
      user: this.props.users.email,
      createIssueData: issueData
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Create new issue
          </Text>
        </View>
        <View style={styles.main}>
          <IssueForm users={this.props.users} onSubmitForm={this.editIssue} />
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

export const NewIssuePage = connect(
  state => ({ users: state.users }),
  dispatch => ({
    createIssueRequest: bindActionCreators(createIssueRequest, dispatch),
    fetchUsersRequest: bindActionCreators(fetchUsersRequest, dispatch),
  })
)(Page);
