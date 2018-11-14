import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableHighlight } from 'react-native';
import { Link } from "react-router-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';

const Navigation = styled.View`
  background-color: #fff;
  height: 40px;
  justify-content: space-around;
  flex-direction: row;
  flex: 1;
`;

const NavItem = styled.View`
  flex: 1;
`;

const NavLinkText = styled.Text`
  color: #000;
  fontSize: 16px;
  height: 40px;
  line-height: 40px;
  text-align-vertical: center;
  text-align: center;
`;

class N extends React.Component {
  render () {
    const { logged } = this.props.user;
    return(
      <Navigation>
        <NavItem>
          <Link to="/">
            <NavLinkText>Home</NavLinkText>
          </Link>
        </NavItem>
        {
          logged ? (
          <NavItem>
            <Link to="/issues/new">
              <NavLinkText>New</NavLinkText>
            </Link>
          </NavItem>
          ) : null
        }
        {
          logged ? (
          <NavItem>
            <Link to="/issues">
              <NavLinkText>Issues</NavLinkText>
            </Link>
          </NavItem>
          ) : null
        }
        {
          logged ? (
          <NavItem>
            <Link to="/my_issues">
              <NavLinkText>My</NavLinkText>
            </Link>
          </NavItem>
          ) : null
        }
      </Navigation>
    );
  }
}

export const Nav = connect(
  state => ({ user: state.users })
)(N);
