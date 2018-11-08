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
import {
  createIssueRequest
} from '../../redux/issues/actions';
import {
  fetchUsersRequest
} from '../../redux/users/actions';
import { history } from '../../redux/store';

class Page extends React.Component {
  state = {
    issueTitle: '',
    issueDescription: '',
    issueFor: ''
  }

  componentDidMount() {
    this.props.fetchUsersRequest()
  }

  submitForm = (e) => {
    e.preventDefault();

    const createIssueData = {
      issueData: [
        `id${(+new Date()).toString(16)}`,
        Date.now(),
        this.state.issueTitle,
        this.state.issueDescription,
        this.state.issueFor,
        null //updateAt
      ],
      issueFiles: []
    };

    this.props.createIssueRequest({
      user: this.props.users.email,
      createIssueData
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
        <Nav />

        <View style={styles.form}>
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({issueTitle: text})}
            value={issueTitle}
            placeholder='enter title'
          />
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({issueDescription: text})}
            value={issueDescription}
            placeholder='enter description'
          />

          <Picker
            selectedValue={issueFor}
            style={styles.picker}
            value={issueFor}
            onValueChange={(itemValue, itemIndex) => this.setState({issueFor: itemValue})}>
            {this.renderPickerItems()}
          </Picker>
        </View>

          <TouchableOpacity
            style={styles.btn}
            onPress={this.submitForm}
          >
            <Text style={styles.btnText}>
              Create issue
            </Text>
          </TouchableOpacity>
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
  form: {
    height: 260
  },
  textinput: {
    height: 40,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    padding: 4,
    borderWidth: 1,
    width: 200,
    marginBottom: 20
  },
  picker: {
    height: 40,
    width: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    padding: 4,
    borderWidth: 1,
    marginBottom: 20,
  },
  pickerItem: {
    height: 40,
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
  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
  },
});

export const NewIssuePage = connect(
  state => ({ users: state.users }),
  dispatch => ({
    createIssueRequest: bindActionCreators(createIssueRequest, dispatch),
    fetchUsersRequest: bindActionCreators(fetchUsersRequest, dispatch)
  })
)(Page);
