import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { Link } from "react-router-native";

export class UserProfile extends React.Component {
  render() {
    const { logged, email, photoURL, displayName } = this.props;
    const img = {uri: photoURL || 'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png'};
    return (
      <View style={styles.container}>
        {
          logged ?
          <View style={styles.userProfile}>
            <View style={styles.imgContainer}>
              <Image style={styles.userPhoto} source={img} />
            </View>
            <View style={styles.userInfo}>
              <Link to="/user">
                <Text style={styles.userTitle}>
                  {displayName || email}
                </Text>
              </Link>
              <TouchableOpacity style={styles.smBtn} onPress={() => {this.props.onLogout()}}>
                <Text style={styles.smBtnText}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          : null
        }
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
  textinput: {
    height: 40,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    padding: 4,
    borderWidth: 1,
    width: 200,
    marginBottom: 20
  },
  button: {
    backgroundColor: '#61dafb',
    borderRadius: 4,
  },
  imgContainer: {
    width: 40,
    height: 40,
    borderRadius: 40,
    flex: 0.15
  },
  userPhoto: {
    height: 40,
    width: 40,
  },
  userProfile: {
    flex: 1,
    width: 300,
    flexDirection: 'row',
    alignItems: 'center'
  },
  userInfo: {
    flex: 0.85, 
  },
  userTitle: {
    color: '#fff',
    fontSize: 18,
  },
  smBtn: {
    backgroundColor: '#61dafb',
    borderRadius: 4,
    padding: 4,
    width: 80,
    marginTop: 5,
  },
  smBtnText: {
    color: '#fff',
    textAlign: 'center'
  }
});