import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import moment from 'moment';
import { colors } from '../../theme';
import { Nav } from '../Nav';
import {
  fetchUsersRequest,
} from '../../redux/users/actions';
import {
  editIssueRequest,
  deleteIssueRequest
} from '../../redux/issues/actions';
import { history } from '../../redux/store';

import { Container } from '../../components/UI/Container';
import { Header } from '../../components/UI/Header';
import { HeaderTitle } from '../../components/UI/HeaderTitle';
import { Main } from '../../components/UI/Main';
import { BottomMenu } from '../../components/UI/BottomMenu';
import { StyledButton, ButtonText } from '../../components/UI/StyledButton';
import { StyledText } from '../../components/UI/StyledText';

const Buttons = styled.View`
  flex-direction: row;
`;

const IssueButton = styled(StyledButton)`
  margin-right: 20px;
`;

const IssueInfo = styled.View`
  margin-bottom: 15px;
`;

const IssueDate = styled.Text`
  font-size: 18px;
  color: ${colors.light};
`;

const IssueTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.light};
`;

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
    const { currentIssue, issueFetching } = this.props.issues;

    return (
      <Container>
        <Header>
          <HeaderTitle>Issue</HeaderTitle>
        </Header>
        <Main>
          {
            issueFetching ? (
              <ActivityIndicator size="large" color={colors.accent} />
            ) : (
              <View>
                <IssueInfo>
                  <IssueDate>
                    {
                      moment(currentIssue.createdAt).format('LLL')
                    }
                  </IssueDate>
                  <IssueTitle>
                    {currentIssue.title}
                  </IssueTitle>
                  <StyledText>
                    {currentIssue.description}
                  </StyledText>
                </IssueInfo>
                {
                  currentIssue.owner ===  this.props.users.email.split('@')[0] ?
                  (<Buttons>
                    <IssueButton onPress={this.editIssue}>
                      <ButtonText>
                        Edit
                      </ButtonText>
                    </IssueButton>
                    <IssueButton onPress={this.deleteIssue}>
                      <ButtonText>
                        Delete
                      </ButtonText>
                    </IssueButton>
                  </Buttons>) : null
                }
              </View>
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
