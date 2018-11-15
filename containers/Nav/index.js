import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableHighlight } from 'react-native';
import { Link } from "react-router-native";
import { colors } from '../../theme';

import { Icon } from 'react-native-elements'

import styled from 'styled-components/native';

const Navigation = styled.View`
  background-color: #fff;
  height: 40px;
  justify-content: space-around;
  flex-direction: row;
  flex: 1;
  padding: 0;
`;

const NavItem = styled.View`
  flex: 1;
  height: 40px;
`;

const StyledLink = styled.View`

`;

const NavLinkText = styled.Text`
  color: #000;
  font-size: 16px;
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
              <Icon
                name='home'
                color={colors.main}
                size={36}
              />
          </Link>
        </NavItem>
        {
          logged ? (
          <NavItem>
            <Link to="/issues/new">
              <Icon
                name='add'
                color={colors.main}
                size={36}
              />
            </Link>
          </NavItem>
          ) : null
        }
        {
          logged ? (
          <NavItem>
            <Link to="/issues">
              <Icon
                name='list'
                color={colors.main}
                size={36}
              />
            </Link>
          </NavItem>
          ) : null
        }
        {
          logged ? (
          <NavItem>
            <Link to="/my_issues">
              <Icon
                name='list'
                color={colors.main}
                size={36}
              />
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
