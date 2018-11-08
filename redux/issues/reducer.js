import {
  assoc,
  assocPath,
  pipe,
  append,
  lensProp,
  set,
  over,
  values,
  filter,
  map,
  when,
  path,
  equals,
  propSatisfies,
  findIndex,
  propEq,
  ifElse
} from 'ramda';

import { createReducer } from '../../redux/utils/reducerUtils';
import * as TYPES from './types';

export const initState = {
  issuesFetching: false,
  issues: [],
  currentIssue: {},
  notification: {
    error: '',
    success: '',
    show: false
  },
  issueFetching: false,
  uploadingFiles: []
};

const issuesLens = lensProp('issues');
const filesLens = lensProp('uploadingFiles');

const createIssueRequest = () => assoc('issueFetching', true);
const createIssueSuccessed = createResponse => pipe(
  assoc('issueFetching', false),
  over(issuesLens, append(createResponse)),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'success'], `${createResponse.title} created successully!`),
);
const createIssueFailed = error => pipe(
  assoc('issueFetching', false),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'error'], error),
);

const deleteIssueRequest = () => assoc('issueFetching', true);
const deleteIssueSuccessed = deleteResponse => pipe(
  assoc('issueFetching', false),
  over(issuesLens, filter(issue => issue.issueId !== deleteResponse)),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'success'], `Issue ${deleteResponse} - deleted succesfully!`),
  when(
    equals(path(['currentIssue', 'issueId'], deleteResponse)),
    assoc('currentIssue', {})
  ),
);
const deleteIssueFailed = error => pipe(
  assoc('issueFetching', false),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'error'], error),
);

const editIssueRequest = () => assoc('issueFetching', true);
const editIssueSuccessed = updatedIssue => pipe(
  assoc('issueFetching', false),
  over(issuesLens, map(issue => (issue.issueId === updatedIssue.issueId ? updatedIssue : issue))),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'success'], `${updatedIssue.title} updated succesfully!`),
);
const editIssueFailed = error => pipe(
  assoc('issueFetching', false),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'error'], error),
);

const fetchIssuesRequest = () => assoc('issuesFetching', true);
const fetchIssuesSuccessed = fetchResponse => pipe(
  assoc('issuesFetching', false),
  set(issuesLens, values(fetchResponse))
);
const fetchIssuesFailed = error => pipe(
  assoc('issuesFetching', false),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'error'], error),
);

const getIssueRequest = () => assoc('issueFetching', true);
const getIssueSuccessed = issue => pipe(
  assoc('issueFetching', false),
  assoc('currentIssue', issue)
);
const getIssueFailed = error => pipe(
  assoc('issuesFetching', false),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'error'], error)
);

const uploadFilesRequest = uploadTask => assoc('uploadingFiles', uploadTask);

const uploadProgressChanged = progressData => ifElse(
  propSatisfies(x => x.length === 0, 'uploadingFiles'),
  over(filesLens, append(progressData)),
  ifElse(
    propSatisfies(x => findIndex(propEq('name', progressData.name), x) !== (-1), 'uploadingFiles'),
    over(filesLens, map(file => (
      file.name === progressData.name ? progressData : file
    ))),
    over(filesLens, append(progressData)),
  )
);

const downloadAttachmentRequest = () => assoc('issueFetching', true);
const downloadAttachmentSuccessed = downloadRes => pipe(
  assoc('issueFetching', false),
  assoc('file', downloadRes)
);
const downloadAttachmentFailed = error => pipe(
  assoc('issueFetching', false),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'error'], error),
);

const issuesCloseNotification = () => pipe(
  assocPath(['notification', 'show'], false),
  assocPath(['notification', 'error'], ''),
  assocPath(['notification', 'success'], ''),
);

const issueAnswerRequest = () => assoc('issueFetching', true);

const issueAnswerSuccessed = answerData => pipe(
  assoc('issueFetching', false),
  over(issuesLens, map(
    issue => (issue.issueId === answerData.issue.issueId ?
      { ...issue, answer: answerData.answerInfo }
      :
      issue
    )
  ))
);

const issueAnswerFailed = error => pipe(
  assoc('issueFetching', false),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'error'], error),
);

const handlers = {
  [TYPES.CREATE_ISSUE_REQUEST]: createIssueRequest,
  [TYPES.CREATE_ISSUE_SUCCESSED]: createIssueSuccessed,
  [TYPES.CREATE_ISSUE_FAILED]: createIssueFailed,

  [TYPES.DELETE_ISSUE_REQUEST]: deleteIssueRequest,
  [TYPES.DELETE_ISSUE_SUCCESSED]: deleteIssueSuccessed,
  [TYPES.DELETE_ISSUE_FAILED]: deleteIssueFailed,

  [TYPES.EDIT_ISSUE_REQUEST]: editIssueRequest,
  [TYPES.EDIT_ISSUE_SUCCESSED]: editIssueSuccessed,
  [TYPES.EDIT_ISSUE_FAILED]: editIssueFailed,

  [TYPES.FETCH_ISSUES_REQUEST]: fetchIssuesRequest,
  [TYPES.FETCH_ISSUES_SUCCESSED]: fetchIssuesSuccessed,
  [TYPES.FETCH_ISSUES_FAILED]: fetchIssuesFailed,

  [TYPES.GET_ISSUE_REQUEST]: getIssueRequest,
  [TYPES.GET_ISSUE_SUCCESSED]: getIssueSuccessed,
  [TYPES.GET_ISSUE_FAILED]: getIssueFailed,

  [TYPES.UPLOAD_FILES_REQUEST]: uploadFilesRequest,

  [TYPES.UPLOAD_PROGRESS_CHANGED]: uploadProgressChanged,

  [TYPES.DOWNLOAD_ATTACHMENT_REQUEST]: downloadAttachmentRequest,
  [TYPES.DOWNLOAD_ATTACHMENT_SUCCESSED]: downloadAttachmentSuccessed,
  [TYPES.DOWNLOAD_ATTACHMENT_FAILED]: downloadAttachmentFailed,

  [TYPES.ISSUES_CLOSE_NOTIFICATION]: issuesCloseNotification,

  [TYPES.ISSUE_ANSWER_REQUEST]: issueAnswerRequest,
  [TYPES.ISSUE_ANSWER_SUCCESSED]: issueAnswerSuccessed,
  [TYPES.ISSUE_ANSWER_FAILED]: issueAnswerFailed,
};

export const issues = createReducer(initState, handlers);
