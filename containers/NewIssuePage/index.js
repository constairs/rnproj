import React from 'react';
import { connect } from 'react-redux';
import {
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

import { Header } from '../../components/UI/Header';
import { HeaderTitle } from '../../components/UI/HeaderTitle';
import { Main } from '../../components/UI/Main';
import { BottomMenu } from '../../components/UI/BottomMenu';
import { KeyboardAvoidingContainer  } from '../../components/UI/KeyboardAvoidingContainer';

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
      <KeyboardAvoidingContainer>
        <Header>
          <HeaderTitle>
            Create new issue
          </HeaderTitle>
        </Header>
        <Main>
          <IssueForm users={this.props.users} onSubmitForm={this.editIssue} />
        </Main>
        <BottomMenu>
          <Nav />
        </BottomMenu>
      </KeyboardAvoidingContainer>
    );
  }
}

export const NewIssuePage = connect(
  state => ({ users: state.users }),
  dispatch => ({
    createIssueRequest: bindActionCreators(createIssueRequest, dispatch),
    fetchUsersRequest: bindActionCreators(fetchUsersRequest, dispatch),
  })
)(Page);
