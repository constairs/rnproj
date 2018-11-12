import React from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Picker,
  TouchableOpacity
} from 'react-native';

export class IssueForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issueTitle: props.title || '',
      issueDescription: props.description || '',
      issueFor: props.for || props.users.users[0]
    }
  }

  submitForm = (e) => {
    e.preventDefault();

    const issueData = {
      issueData: [
        this.props.issueId || `id${(+new Date()).toString(16)}`,
        this.props.createdAt || Date.now(),
        this.state.issueTitle,
        this.state.issueDescription,
        this.state.issueFor,
        this.props.issueId ? Date.now() : null
      ],
      issueFiles: []
    };

    this.props.onSubmitForm(issueData);
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
          itemStyle={styles.pickerItem}
          onValueChange={(itemValue, itemIndex) => this.setState({issueFor: itemValue})}>
          {this.renderPickerItems()}
        </Picker>
        <TouchableOpacity
          style={styles.btn}
          onPress={this.submitForm}
        >
          <Text style={styles.btnText}>
            { this.props.issueId ? 'Edit' : 'Create' } issue
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    width: 200,
    // backgroundColor: '#f0f0f0',
    // borderRadius: 4,
    // padding: 4,
    // borderWidth: 1,
    // marginBottom: 20,
  },
  pickerItem: {
    // height: 40,
    color: '#ffffff'
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
});