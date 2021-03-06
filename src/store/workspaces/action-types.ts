export enum WorkspaceActionTypes {
  CREATE_WORKSPACE = 'WORKSPACE/CREATE_WORKSPACE',
  GET_OWNERS_WORKSPACES = 'WORKSPACE/GET_OWNERS_WORKSPACES',
  GET_SHARED_WORKSPACES = 'WORKSPACE/GET_SHARED_WORKSPACES',
  GET_ALL_WORKSPACES = 'WORKSPACE/GET_ALL_WORKSPACES',
  GET_USER_WORKSPACES_REQUESTS = 'WORKSPACE/GET_ALL_WORKSPACES_REQUESTS',
  GET_WORKSPACE_SHARE_CODE = 'WORKSPACE/GET_WORKSPACE_SHARE_CODE',
  ADD_WORKSPACE_BY_SHARE_CODE = 'WORKSPACE/ADD_WORKSPACE_BY_SHARE_CODE',
  ACCEPT_WORKSPACE_REQUEST = 'WORKSPACE/ACCEPT_WORKSPACE_REQUEST',
  DECLINE_WORKSPACE_REQUEST = 'WORKSPACE/DECLINE_WORKSPACE_REQUEST'
}
