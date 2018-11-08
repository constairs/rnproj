import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';
import { bindActionCreators } from 'redux';
import { Nav } from '../Nav';
import {
  fetchIssuesRequest
} from '../../redux/issues/actions';
import {
  fetchUsersRequest
} from '../../redux/users/actions';
import { history } from '../../redux/store';

class Page extends React.Component {
  componentDidMount() {
    this.props.fetchIssuesRequest({ user: this.props.users.email, forOwner: true })
  }

  render() {

    const { issues } = this.props.issues;

    return (
      <View style={styles.container}>
        <Nav />
        <FlatList
          data={issues}
          renderItem={({item}) => <Text key={item.issueId}>{item.title}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(40, 44, 52)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40
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
  }
});

export const MyIssuesPage = connect(
  state => ({
    users: state.users,
    issues: state.issues,
  }),
  dispatch => ({
    fetchIssuesRequest: bindActionCreators(fetchIssuesRequest, dispatch),
    fetchUsersRequest: bindActionCreators(fetchUsersRequest, dispatch)
  })
)(Page);
