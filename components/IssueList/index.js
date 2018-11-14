import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import styled from 'styled-components/native';
import { Link } from "react-router-native";

const List = styled.View`
  background-color: rgb(40, 44, 52);
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const StyledFlatList = styled.FlatList`
  padding: 20px;
`;

const ListItem = styled.TouchableOpacity`
  background-color: #f0f0f0;
  height: 40px;
  border-radius: 4px;
  width: 250px;
  justify-content: center;
  padding: 10px;
  margin-bottom: 10px;
`;

export class IssueList extends React.Component {
  render() {
    const { issues } = this.props;
    return (
      <List>
        <StyledFlatList
          data={issues}
          renderItem={({item}) =>
          <ListItem
            onPress={() => {
              this.props.onGetIssue(item.issueId)
            }}
          >
            <Text
              key={item.issueId}
            >
              {item.title}
            </Text>
          </ListItem>}
          keyExtractor={(item, index) => index.toString()}
        />
      </List>
    );
  }
}
