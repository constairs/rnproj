import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
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
import { colors } from '../../theme';

import { Container } from '../../components/UI/Container';
import { Header } from '../../components/UI/Header';
import { HeaderTitle } from '../../components/UI/HeaderTitle';
import { Main } from '../../components/UI/Main';
import { BottomMenu } from '../../components/UI/BottomMenu';

class Page extends React.Component {
  componentDidMount() {
    this.props.fetchIssuesRequest({ user: this.props.users.email, forOwner: true });
  }

  refreshIssuesList = () => {
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
    const { issues, issuesFetching } = this.props.issues;

    return (
      <Container>
        <Header>
          <HeaderTitle>My Issues</HeaderTitle>
        </Header>
        <Main>
          {
            issuesFetching ? (
              <ActivityIndicator size="large" color={colors.accent} />
            ) : (
            <IssueList
              onGetIssue={this.getIssue}
              onRefreshList={
                this.refreshIssuesList
              }
              issues={issues}
            />
            )
          }
        </Main>
        <BottomMenu>
          <Nav />
        </BottomMenu>
      </Container>
    );
  }
}

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
