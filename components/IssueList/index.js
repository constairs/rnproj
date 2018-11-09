import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { Link } from "react-router-native";

export class IssueList extends React.Component {
  render() {
    const { issues } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={issues}
          style={styles.list}
          renderItem={({item}) =>
          <TouchableOpacity
            onPress={() => {
              this.props.onGetIssue(item.issueId)
            }}
            style={styles.listItem}
          >
            <Text
              style={styles.listItemText}
              key={item.issueId}
            >
              {item.title}
            </Text>
          </TouchableOpacity>}
          keyExtractor={(item, index) => index.toString()}
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
  },
  list: {
    padding: 20,
  },
  listItem: {
    backgroundColor: '#f0f0f0',
    height: 40,
    borderRadius: 4,
    width: 250,
    justifyContent: 'center',
    padding: 10,
  },
  listItemText: {
    color: '#000'
  }
});