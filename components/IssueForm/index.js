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
  editIssueRequest
} from '../../redux/issues/actions';
import {
  fetchUsersRequest
} from '../../redux/users/actions';
import { history } from '../../redux/store';

export class IssueForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issueTitle: props.issue.title || '',
      issueDescription: props.issue.description || '',
      issueFor: props.issue.for || ''
    }
  }

  submitForm = (e) => {
    e.preventDefault();

    const createIssueData = {
      issueData: [
        this.props.issue.issueId || `id${(+new Date()).toString(16)}`,
        this.props.issue.createdAt || Date.now(),
        this.state.issueTitle,
        this.state.issueDescription,
        this.state.issueFor,
        this.props.issue.issueId ? Date.now() : null
      ],
      issueFiles: []
    };

    this.props.onSubmitForm(createIssueData);
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
