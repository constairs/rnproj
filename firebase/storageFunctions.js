import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

import {
  uploadProgressChanged,
  // uploadPaused,
  // uploadRunning,
  // uploadCancel
} from '../redux/issues/actions';
import { store } from '../App';


/* eslint-disable */
  import { app } from './index';
/* eslint-disable */

const storage = firebase.storage(app);

const storageRef = storage.ref();

export function uploadFiles(files) {
  
  function uploadFile(file) {
    const metadata = {
      contentType: file.type,
      size: file.size,
      name: file.name,
    };

    const fileRef = storageRef.child('issuesFiles/' + file.name);
  
    const uploadTask = fileRef.put(file, metadata);
  
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        store.store.dispatch(uploadProgressChanged({name: file.name, progress}));
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            // store.store.dispatch(uploadPaused(uploadTask));
            break;
          case firebase.storage.TaskState.RUNNING:
            // store.store.dispatch(uploadRunning(uploadTask));
            break;
          case firebase.storage.TaskState.CANCELED:
            store.store.dispatch(uploadCancel(uploadTask));
            break;
        }
      }, (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          break;
  
        case 'storage/canceled':
          break;
  
        case 'storage/unknown':
          break;
      }
    }, () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        // console.log(downloadURL);
      });
    });

    // return uploadTask;
    return uploadTask.snapshot.ref.getDownloadURL();
  }

  return Promise.all(
    files.map(file => uploadFile(file))
  )
  .then((urls) => {
    return (urls);
  })
  .catch((error) => {
    console.log(`Some failed: `, error.message);
  });

}

export function downloadFiles(filename) {
  return new Promise((resolve, reject) => {

    const fileRef = storageRef.child('issuesFiles/' + filename);

    fileRef.getDownloadURL().then((url) => {

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';

      xhr.onload = function(event) {
        if(xhr.status !== 200) {
          reject(xhr.statusText);
        }

        if(xhr.readyState === 4 && xhr.status === 200) {
          console.log(xhr.response);
          resolve(xhr.response);
        }
      };

      xhr.onerror = () => reject(Error("There was a network error."));

      xhr.open('GET', url);
      xhr.send();


    }).catch(function(error) {
      reject(error);
    });
  
  });
}

export function deleteFile(filename) {
  return new Promise((resolve, reject) => {
    const fileRef = storageRef.child('issuesFiles/' + filename);

    fileRef.delete().then(() => {
      resolve('issuesFiles/' + filename);
    }).catch((error) => {
      reject(error);
    });
  });
}

export function getFileMetadata(filename) {
  return new Promise((resolve, reject) => {
    const fileRef = storageRef.child('issuesFiles/' + filename);

    fileRef.getMetadata().then((metadata) => {
      resolve(metadata);
    }).catch((error) => {
      reject(error);
    });

  });
}

export function updateMetadata(filename, newMetadata) {
  return new Promise((resolve, reject) => {
    const fileRef = storageRef.child('issuesFiles/' + filename);

    fileRef.updateMetadata(newMetadata).then((metadata) => {
      resolve(metadata);
    }).catch((error) => {
      reject(error);
    });
  });
}
