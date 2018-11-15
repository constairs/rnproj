import React from 'react';
import { connect } from 'react-redux';
import {
  TextInput,
  Text,
  View,
  Picker,
  TouchableOpacity,
  ActivityIndicator
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
import { colors } from '../../theme';

import { Header } from '../../components/UI/Header';
import { HeaderTitle } from '../../components/UI/HeaderTitle';
import { Main } from '../../components/UI/Main';
import { BottomMenu } from '../../components/UI/BottomMenu';
import { KeyboardAvoidingContainer  } from '../../components/UI/KeyboardAvoidingContainer';

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
      <KeyboardAvoidingContainer>
        <Header>
          <HeaderTitle>
            Edit issue
          </HeaderTitle>
        </Header>
        <Main>
          {
            this.props.issueFetching ? (
              <ActivityIndicator size="large" color={colors.accent} />
            ) : (
              <IssueForm users={this.props.users} onSubmitForm={this.editIssue} />
            )
          }
        </Main>
        <BottomMenu>
          <Nav />
        </BottomMenu>
      </KeyboardAvoidingContainer>
    );
  }
}

export const EditIssuePage = connect(
  state => ({
    users: state.users,
    currentIssue: state.issues.currentIssue,
    issueFetching: state.issues.issueFetching
  }),
  dispatch => ({
    editIssueRequest: bindActionCreators(editIssueRequest, dispatch),
    fetchUsersRequest: bindActionCreators(fetchUsersRequest, dispatch)
  })
)(Page);
