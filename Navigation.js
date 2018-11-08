import React from 'react';
import { StyleSheet, View} from 'react-native';
import { Route } from "react-router-native";
import { ConnectedRouter } from 'connected-react-router';
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
import { history } from './redux/store';


export const Navigation = () => (
  <ConnectedRouter history={history}>
    <View style={styles.container}>
      <Route exact path="/" component={StartPage} />
      <Route exact path="/auth" component={AuthPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/user" component={UserPage} />
      <Route exact path="/passwordReset" component={PasswordReset} />
      <Route exact path="/passwordUpdate" component={PasswordUpdate} />
      <Route exact path="/emailUpdate" component={EmailUpdate} />
      <Route exact path="/profileUpdate" component={ProfileUpdate} />
      <Route exact path="/issues/new" component={NewIssuePage} />
      <Route exact path="/my_issues" component={MyIssuesPage} />
    </View>
  </ConnectedRouter>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(40, 44, 52)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40
  }
});
