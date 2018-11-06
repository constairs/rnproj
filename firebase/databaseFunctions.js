import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

/* eslint-disable */
  import { app } from './index';
/* eslint-disable */

const database = firebase.database();

export function addUserToDb(userEmail) {

  const user = userEmail.split('@')[0];

  const userData = {
    email: userEmail,
    issues: [],
  };

  return new Promise((resolve, reject) => {
    firebase.database().ref('/users/' + user).set(userData)
    .then(() => resolve())
    .catch((error) => reject(error));
  });
}

export function fetchUsers() {
  return new Promise((resolve, reject) => {
    firebase.database().ref('/users/').once('value')
    .then((snapshot) => {
      resolve(snapshot.val());
    })
    .catch((error) => reject(error));
  });
}

export function createIssue(user, issueId, createdAt, issueTitle, issueDescription, issueFor, createdDate, attachedFiles = []) {
  const issueData = {
    issueId: issueId,
    title: issueTitle,
    createdAt: createdAt,
    description: issueDescription,
    for: issueFor,
    attachedFiles: attachedFiles,
    owner: user.split('@')[0],
  };

  return Promise.all([
    firebase.database().ref('/users/' + issueData.owner + '/myIssues/' + issueId).set(issueData),
    firebase.database().ref('/users/' + issueFor + '/issues/' + issueId).set(issueData),
  ]).then(() => {
    return issueData
  })
  .catch((error) => reject(error));
}

export function editIssue(user, issueId, createdAt, issueTitle, issueDescription, issueFor, updatedAt, attachedFiles = []) {

  const updatedIssue = {
    issueId: issueId,
    title: issueTitle,
    createdAt: createdAt,
    updatedAt: updatedAt,
    description: issueDescription,
    for: issueFor,
    attachedFiles: attachedFiles,
    owner: user.split('@')[0],
  };

  return Promise.all([
    firebase.database().ref('/users/' + updatedIssue.owner + '/myIssues/' + issueId).update(updatedIssue),
    firebase.database().ref('/users/' + issueFor + '/issues/' + issueId).update(updatedIssue),
  ]).then(() => {
    return updatedIssue
  })
  .catch((error) => reject(error));
  
}

export function answerIssue(answerData) {
  return Promise.all([
    firebase.database().ref('/users/' + answerData.issue.owner + '/myIssues/' + answerData.issue.issueId + '/answer').update(answerData.answerInfo),
    firebase.database().ref('/users/' + answerData.issue.for + '/issues/' + answerData.issue.issueId + '/answer').update(answerData.answerInfo),
  ])
  .then(() => {
    return answerData
  })
  .catch((error) => {return error});
}

export function deleteIssueData(issueData) {
  const filter = issueData.user.split('@')[0];

  if(issueData.forOwner) {
    const ref = firebase.database().ref(`/users/${filter}/myIssues`);
    return new Promise((resolve, reject) => {
      ref.once('value')
      .then((snapshot) => {
        resolve(snapshot.val());
      })
      .catch((error) => reject(error));
    });
  } else {
    return new Promise((resolve, reject) => {
      const ref = firebase.database().ref(`/users/${filter}/issues`);
      ref.once('value')
      .then((snapshot) => {
        resolve(snapshot.val());
      })
      .catch((error) => reject(error));
    });
  }
}

export function fetchIssues(fetchingParams) {
  const filter = fetchingParams.user.split('@')[0];

  if(fetchingParams.forOwner) {
    const ref = firebase.database().ref(`/users/${filter}/myIssues`);
    return new Promise((resolve, reject) => {
      ref.once('value')
      .then((snapshot) => {
        resolve(snapshot.val());
      })
      .catch((error) => reject(error));
    });
  } else {
    return new Promise((resolve, reject) => {
      const ref = firebase.database().ref(`/users/${filter}/issues`);
      ref.once('value')
      .then((snapshot) => {
        resolve(snapshot.val());
      })
      .catch((error) => reject(error));
    });
  }

}

export function getIssue(issueData) {
  const filter = issueData.user.split('@')[0];

  if(issueData.forOwner) {
    const ref = firebase.database().ref(`/users/${filter}/myIssues/${issueData.issueId}`);
    return new Promise((resolve, reject) => {
      ref.once('value')
      .then((snapshot) => {
        resolve(snapshot.val());
      })
      .catch((error) => reject(error));
    });
  } else {
    return new Promise((resolve, reject) => {
      const ref = firebase.database().ref(`/users/${filter}/issues/${issueData.issueId}`);
      ref.once('value')
      .then((snapshot) => {
        resolve(snapshot.val());
      })
      .catch((error) => reject(error));
    });
  }
}
