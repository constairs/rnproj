import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  CREATE_ISSUE_REQUEST,
  DELETE_ISSUE_REQUEST,
  EDIT_ISSUE_REQUEST,
  FETCH_ISSUES_REQUEST,
  GET_ISSUE_REQUEST,
  DOWNLOAD_ATTACHMENT_REQUEST,
  ISSUE_ANSWER_REQUEST
} from './types';

import {
  createIssue,
  deleteIssue,
  editIssue,
  fetchIssues,
  getIssue,
  answerIssue
} from '../../firebase/databaseFunctions';

import {
  uploadFiles,
  downloadFiles,
  getFileMetadata,
} from '../../firebase/storageFunctions';

import {
  createIssueSuccessed,
  createIssueFailed,
  fetchIssuesSuccessed,
  fetchIssuesFailed,
  deleteIssueSuccessed,
  deleteIssueFailed,
  editIssueSuccessed,
  editIssueFailed,
  getIssueSuccessed,
  getIssueFailed,
  downloadAttachmentSuccessed,
  downloadAttachmentFailed,
  issuesAnswerSuccessed,
  issuesAnswerFailed,
} from './actions';

export function* createIssueSaga(action) {
  try {
    if (action.payload.createIssueData.issueFiles.length > 0) {
      const files = action.payload.createIssueData.issueFiles;

      const filesLinks = yield call(uploadFiles, action.payload.createIssueData.issueFiles);

      // const filesLinks = uploadTask.snapshot.ref.getDownloadURL();

      const filesWithLinks = files.map((file, i) =>
        ({
          type: file.type,
          size: file.size,
          name: file.name,
          lastModified: file.lastModified,
          downloadUrl: filesLinks[i]
        })
      );

      // const filesWithLinks = yield call(uploadFileSaga, files);

      // const issueWithFilesLinks = [
      //   action.payload.user,
      //   ...action.payload.createIssueData.issueData,
      //   filesWithLinks,
      // ];

      const issueWithFilesLinks = {
        user: action.payload.user,
        createIssueData: {...action.payload.createIssueData.issueInfo, attachedFiles: filesWithLinks},
      };


      const createResponse = yield call(createIssue, ...issueWithFilesLinks);
      yield put(createIssueSuccessed(createResponse));
      yield put(push('/my_issues'));
    } else {
      const createResponse = yield call(
        createIssue,
        // ...[
        //   action.payload.user,
        //   ...action.payload.createIssueData.issueData
        // ]
        action.payload
      );
      yield put(createIssueSuccessed(createResponse));
      yield put(push('/my_issues'));
    }
  
  } catch (error) {
    yield put(createIssueFailed(error.message));
  }
}

export function* deleteIssueSaga(action) {
  try {
    const deleteResponse = yield call(deleteIssue, action.payload);
    yield put(deleteIssueSuccessed(deleteResponse));
    yield put(push('/my_issues'));
  } catch (error) {
    yield put(deleteIssueFailed(error.message));
  }
}

export function* editIssueSaga(action) {
  try {
    if (action.payload.editIssueData.issueFiles.length > 0) {
      const newFiles = action.payload.editIssueData.issueFiles.filter(file => !file.downloadUrl);

      const filesLinks = yield call(uploadFiles, newFiles);
      const files = newFiles.map((file, i) => ({
        type: file.type,
        size: file.size,
        name: file.name,
        lastModified: file.lastModified,
        downloadUrl: filesLinks[i]
      }));

      const updatedFiles = [
        ...action.payload.editIssueData.issueFiles.filter(file => file.downloadUrl),
        ...files
      ];
      const issueWithFilesUpd = [
        action.payload.user,
        ...action.payload.editIssueData.issueData,
        updatedFiles,
      ];

      const updatedIssue = yield call(editIssue, ...issueWithFilesUpd);
      yield put(editIssueSuccessed(updatedIssue));
      yield put(push('/my_issues'));
    } else {
      const updatedIssue = yield call(
        editIssue,
        ...[
          action.payload.user,
          ...action.payload.editIssueData.issueData
        ]
      );
      yield put(editIssueSuccessed(updatedIssue));
      yield put(push('/my_issues'));
    }
  } catch (error) {
    yield put(editIssueFailed(error.message));
  }
}

export function* fetchIssuesSaga(action) {
  try {
    const fetchResponse = yield call(fetchIssues, action.payload);
    yield put(fetchIssuesSuccessed(fetchResponse));
  } catch (error) {
    yield put(fetchIssuesFailed(error.message));
  }
}

export function* getIssueSaga(action) {
  try {
    const issue = yield call(getIssue, action.payload);
    yield put(getIssueSuccessed(issue));
    if (action.payload.forOwner) {
      yield put(push(`/my_issues/issue`));
    } else {
      yield put(push(`/issues/issue`));
    }
  } catch (error) {
    yield put(getIssueFailed(error.message));
  }
}

// export function* downloadAttachmentSaga(action) {
//   try {
//     const dowloadRes = yield call(downloadFiles, action.payload);
//     const downloadMeta = yield call(getFileMetadata, action.payload);
//     const file = { dowloadRes, downloadMeta };
//     yield put(downloadAttachmentSuccessed(file));
//   } catch (error) {
//     yield put(downloadAttachmentFailed(error.message));
//   }
// }

export function* issueAnswerSaga(action) {
  try {
    const res = yield call(answerIssue, action.payload);
    yield put(issuesAnswerSuccessed(res));
  } catch (error) {
    yield put(issuesAnswerFailed(error.message));
  }
}


export function* issuesSagas() {
  yield takeLatest(CREATE_ISSUE_REQUEST, createIssueSaga);
  yield takeLatest(DELETE_ISSUE_REQUEST, deleteIssueSaga);
  yield takeLatest(GET_ISSUE_REQUEST, getIssueSaga);
  yield takeLatest(EDIT_ISSUE_REQUEST, editIssueSaga);
  yield takeLatest(FETCH_ISSUES_REQUEST, fetchIssuesSaga);
  // yield takeLatest(DOWNLOAD_ATTACHMENT_REQUEST, downloadAttachmentSaga);
  yield takeLatest(ISSUE_ANSWER_REQUEST, issueAnswerSaga);
}
