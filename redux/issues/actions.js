import * as TYPES from './types';

export const createIssueRequest = issueData => ({
  type: TYPES.CREATE_ISSUE_REQUEST,
  payload: issueData
});
export const createIssueSuccessed = createIssueResponse => ({
  type: TYPES.CREATE_ISSUE_SUCCESSED,
  payload: createIssueResponse
});
export const createIssueFailed = error => ({
  type: TYPES.CREATE_ISSUE_FAILED,
  payload: error
});

export const uploadFilesRequest = uploadTask => ({
  type: TYPES.UPLOAD_FILES_REQUEST,
  payload: uploadTask,
});

export const uploadProgressChanged = progressData => ({
  type: TYPES.UPLOAD_PROGRESS_CHANGED,
  payload: progressData
});

export const uploadPaused = uploadTask => ({
  type: TYPES.UPLOAD_PAUSED,
  payload: uploadTask
});
export const uploadPausedSuccessed = () => ({
  type: TYPES.UPLOAD_PAUSED_SUCCESSED,
});
export const uploadPausedFailed = error => ({
  type: TYPES.UPLOAD_PAUSED_FAILED,
  payload: error,
});

export const uploadRunning = () => ({
  type: TYPES.UPLOAD_RESUME,
});
export const uploadRunningSuccessed = () => ({
  type: TYPES.UPLOAD_RESUME_SUCCESSED,
});
export const uploadRunningFailed = error => ({
  type: TYPES.UPLOAD_RESUME_FAILED,
  payload: error,
});

export const uploadCancel = filename => ({
  type: TYPES.UPLOAD_CANCEL,
  payload: filename,
});
export const uploadCancelSuccessed = () => ({
  type: TYPES.UPLOAD_CANCEL_SUCCESSED,
});
export const uploadCancelFailed = error => ({
  type: TYPES.UPLOAD_CANCEL_FAILED,
  payload: error,
});

export const deleteIssueRequest = issue => ({
  type: TYPES.DELETE_ISSUE_REQUEST,
  payload: issue
});
export const deleteIssueSuccessed = createIssueResponse => ({
  type: TYPES.DELETE_ISSUE_SUCCESSED,
  payload: createIssueResponse
});
export const deleteIssueFailed = error => ({
  type: TYPES.DELETE_ISSUE_FAILED,
  payload: error
});

export const openIssueEditor = issue => ({
  type: TYPES.OPEN_ISSUE_EDITOR,
  payload: issue
});

export const getIssueRequest = issueData => ({
  type: TYPES.GET_ISSUE_REQUEST,
  payload: issueData
});
export const getIssueSuccessed = issue => ({
  type: TYPES.GET_ISSUE_SUCCESSED,
  payload: issue
});
export const getIssueFailed = error => ({
  type: TYPES.GET_ISSUE_FAILED,
  payload: error
});
export const editIssueRequest = issueData => ({
  type: TYPES.EDIT_ISSUE_REQUEST,
  payload: issueData
});
export const editIssueSuccessed = updatedIssue => ({
  type: TYPES.EDIT_ISSUE_SUCCESSED,
  payload: updatedIssue
});
export const editIssueFailed = error => ({
  type: TYPES.EDIT_ISSUE_FAILED,
  payload: error
});

export const fetchIssuesRequest = fetchingParams => ({
  type: TYPES.FETCH_ISSUES_REQUEST,
  payload: fetchingParams
});
export const fetchIssuesSuccessed = fetchIssuesResponse => ({
  type: TYPES.FETCH_ISSUES_SUCCESSED,
  payload: fetchIssuesResponse
});
export const fetchIssuesFailed = error => ({
  type: TYPES.FETCH_ISSUES_FAILED,
  payload: error
});

export const downloadAttachmentRequest = url => ({
  type: TYPES.DOWNLOAD_ATTACHMENT_REQUEST,
  payload: url
});
export const downloadAttachmentSuccessed = downloadRes => ({
  type: TYPES.DOWNLOAD_ATTACHMENT_SUCCESSED,
  payload: downloadRes
});
export const downloadAttachmentFailed = error => ({
  type: TYPES.DOWNLOAD_ATTACHMENT_FAILED,
  payload: error
});

export const closeNotification = () => ({
  type: TYPES.ISSUES_CLOSE_NOTIFICATION
});

export const issuesAnswerRequest = issueAnswerData => ({
  type: TYPES.ISSUE_ANSWER_REQUEST,
  payload: issueAnswerData
});
export const issuesAnswerSuccessed = answerData => ({
  type: TYPES.ISSUE_ANSWER_SUCCESSED,
  payload: answerData
});
export const issuesAnswerFailed = issueAnswerInfo => ({
  type: TYPES.ISSUE_ANSWER_FAILED,
  payload: issueAnswerInfo
});
