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
import { IssueForm } from '../../components/IssueForm';
import {
  editIssueRequest
} from '../../redux/issues/actions';
import {
  fetchUsersRequest
} from '../../redux/users/actions';
import { history } from '../../redux/store';
import { theme } from '../../theme';

class Page extends React.Component {
  state = {
    issueTitle: '',
    issueDescription: '',
    issueFor: ''
  }

  componentDidMount() {
    this.props.fetchUsersRequest()
  }

  editIssue = (issueData) => {
    this.props.editIssueRequest({
      user: this.props.users.email,
      editIssueData: issueData
    });
  }

  renderPickerItems() {
    return this.props.users.users.map((item) => {
      return (
        <Picker.Item
          label={item}
          value={item}
          key={item}
          style={styles.pickerItem}
        />
      );
    });
  }

  render() {
    const {
      users
    } = this.props.users;

    const {
      issueTitle,
      issueDescription,
      issueFor
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Edit issue
          </Text>
        </View>
        <View style={styles.main}>
          <IssueForm users={this.props.users} {...this.props.currentIssue} onSubmitForm={this.editIssue} />
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

export const EditIssuePage = connect(
  state => ({
    users: state.users,
    currentIssue: state.issues.currentIssue
  }),
  dispatch => ({
    editIssueRequest: bindActionCreators(editIssueRequest, dispatch),
    fetchUsersRequest: bindActionCreators(fetchUsersRequest, dispatch)
  })
)(Page);
