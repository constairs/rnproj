import React from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import { history } from '../../redux/store';
import { ButtonText } from '../UI/StyledButton';

export const BackBtn = ( ) => (
  <TouchableOpacity onPress={() => {history.goBack()}}>
    <ButtonText>Back</ButtonText>
  </TouchableOpacity>
);
