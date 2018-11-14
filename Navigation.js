import React from 'react';
import { View} from 'react-native';
import { Route } from "react-router-native";
import { ConnectedRouter } from 'connected-react-router';
import styled from 'styled-components';
import { AuthPage } from './containers/AuthPage';
import { LoginPage } from './containers/LoginPage';
import { UserPage } from './containers/UserPage';
import { StartPage } from './containers/StartPage';
import { EmailUpdate } from './containers/EmailUpdate';
import { PasswordReset } from './containers/PasswordReset';
import { PasswordUpdate } from './containers/PasswordUpdate';
import { ProfileUpdate } from './containers/ProfileUpdate';
import { NewIssuePage } from './containers/NewIssuePage';
import { MyIssuesPage } from './containers/MyIssuesPage';
import { IssuesPage } from './containers/IssuesPage';
import { IssuePage } from './containers/IssuePage';
import { EditIssuePage } from './containers/EditIssuePage';
import { history } from './redux/store';

const Container = styled.View`
  flex: 1;
  background-color: rgb(40, 44, 52);
`;

export const Navigation = () => (
  <ConnectedRouter history={history}>
    <Container>
      <Route exact path="/" component={StartPage} />
      <Route exact path="/auth" component={AuthPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/user" component={UserPage} />
      <Route exact path="/passwordReset" component={PasswordReset} />
      <Route exact path="/passwordUpdate" component={PasswordUpdate} />
      <Route exact path="/emailUpdate" component={EmailUpdate} />
      <Route exact path="/profileUpdate" component={ProfileUpdate} />
      <Route exact path="/issues/new" component={NewIssuePage} />
      <Route exact path="/issues" component={IssuesPage} />
      <Route exact path="/my_issues" component={MyIssuesPage} />
      <Route exact path="/my_issues/issue/" component={IssuePage} />
      <Route exact path="/my_issues/issue/edit" component={EditIssuePage} />
      <Route exact path="/issues/issue" component={IssuePage} />
    </Container>
  </ConnectedRouter>
);

