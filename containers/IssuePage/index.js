import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { Nav } from '../Nav';
import {
  fetchUsersRequest,
} from '../../redux/users/actions';
import {
  editIssueRequest,
  deleteIssueRequest
} from '../../redux/issues/actions';
import { history } from '../../redux/store';
import { theme } from '../../theme'

class Page extends React.Component {

  editIssue = () => {
    history.push(`${history.location.pathname}/edit`);
  }

  deleteIssue = () => {
    this.props.deleteIssueRequest({
      user: this.props.users.email,
      issueId: this.props.issues.currentIssue.issueId,
      forOwner: this.props.issues.currentIssue.owner === this.props.users.email.split('@')[0] ? true : null
    });
  }

  render() {
    const { currentIssue } = this.props.issues;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Issue</Text>
        </View>
        <View style={styles.main}>
          
          <View style={styles.issueBox}>

            <View style={styles.issueInfo}>
              <Text style={styles.issueDate}>
                {
                  moment(currentIssue.createdAt).format('LLL')
                }
              </Text>
              <Text style={styles.issueTitle}>
                {currentIssue.title}
              </Text>
              <Text style={styles.text}>
                {currentIssue.description}
              </Text>
            </View>
            {
              currentIssue.owner ===  this.props.users.email.split('@')[0] ?
              (<View style={styles.buttons}>
                 <TouchableOpacity style={styles.button} onPress={this.editIssue}>
                  <Text style={styles.buttonText}>
                    Edit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={this.deleteIssue}>
                  <Text style={styles.buttonText}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>) : null
            }
          </View>

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

export const IssuePage = connect(
  state => ({
    users: state.users,
    issues: state.issues,
  }),
  dispatch => ({
    fetchUsersRequest: bindActionCreators(fetchUsersRequest, dispatch),
    editIssueRequest: bindActionCreators(editIssueRequest, dispatch),
    deleteIssueRequest: bindActionCreators(deleteIssueRequest, dispatch)
  })
)(Page);
