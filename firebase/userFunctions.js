import firebase from 'firebase/app';
import 'firebase/auth';

/* eslint-disable */
import { app } from './index';
/* eslint-disable */

export function createUserWithEmailAndPassword(email, password) {
  return new Promise((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function signInWithEmailAndPassword(email, password) {
  return new Promise((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function reAuth() {
  return new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;
    let credential;

    user.reauthenticateAndRetrieveDataWithCredential(credential).then(() => {
      resolve(user);
    }).catch((error) => {
      reject(error);
    });
  });
}

export function logout() {
  return new Promise((resolve, reject) => {
    firebase.auth().signOut().then(() => {
      resolve('Logout successed!');
    }).catch((error) => {
      reject(error);
    });
  });
}

export function updateProfile(profileName, profileImg) {
  return new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: profileName,
      photoURL: profileImg
    }).then(() => {
      resolve({ profileName, profileImg });
    }).catch((error) => {
      reject(error);
    });
  });
}

export function deleteProfile() {
  return new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;

    user.delete().then(() => {
      resolve('User deleted successully!');
    }).catch((error) => {
      if (error.code === 'auth/requires-recent-login') {
        reAuth()
          .then(() => {
            user.delete().then(() => resolve('User deleted successully!'));
          })
          .catch((err) => { reject(err); });
      }
    });
  });
}

export function updateEmail(email) {
  return new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;

    user.updateEmail(email).then(() => {
      resolve(email);
    }).catch((error) => {
      reject(error);
    });
  });
}

export function sendVerification() {
  return new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;
    
    user.sendEmailVerification().then(() => {
      resolve('Email успешно отправлен');
    }).catch((error) => {
      reject(error);
    });
  });
}

export function updatePassword(newPassword) {
  return new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;

    user.updatePassword(newPassword).then(() => {
      resolve('Password changed successufuly!');
    }).catch((error) => {
      reject(error);
    });
  });
}

export function resetPassword(emailAddress) {
  return new Promise((resolve, reject) => {
    const auth = firebase.auth();

    auth.sendPasswordResetEmail(emailAddress).then(() => {
      resolve('Reset password email sended successfully!');
    }).catch((error) => {
      reject(error);
    });
  });
}
