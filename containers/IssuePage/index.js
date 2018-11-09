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
import { BackBtn } from '../../components/BackBtn';
import {
  fetchUsersRequest,
} from '../../redux/users/actions';
import {
  editIssueRequest,
  deleteIssueRequest
} from '../../redux/issues/actions';
import { history } from '../../redux/store';

class Page extends React.Component {

  editIssue = () => {
    history.push(`edit${history.location}`);
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
          <View style={styles.item1_3}>
            <BackBtn />
          </View>
          <View>
            <Text style={styles.title}>Issue</Text>
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.issueBox}>
            <Text style={styles.description}>
              {
                moment(currentIssue.createdAt).format('LLL')
              }
            </Text>
            <Text style={styles.issueTitle}>
              {currentIssue.title}
            </Text>
            <Text style={styles.description}>
              {currentIssue.description}
            </Text>
            <TouchableOpacity onPress={this.editIssue}>
              <Text>
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.deleteIssue}>
              <Text>
                Delete
              </Text>
            </TouchableOpacity>
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
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative'
  },
  item1_3: {
    position: 'absolute',
    top: 40,
    left: 40
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
  issueTitle: {
    fontSize: 24,
    color: '#fff',
  },
  description: {
    fontSize: 16,
    color: '#fff'
  },
  issueBox: {
    flex: 0.9,
    padding: 20,
  }
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
