import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';
import { history } from '../../redux/store';

export const BackBtn = ( ) => (
  <TouchableOpacity style={styles.btn}  onPress={() => {history.goBack()}}>
    <Text style={styles.btnText}>Back</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(40, 44, 52)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40
  },
  btnText: {
    color: '#fff'
  }
});
