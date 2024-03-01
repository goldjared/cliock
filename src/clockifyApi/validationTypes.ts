interface ApiInvalid {
  message: string;
  code: number;
}

interface UserProfile {
  id: string;
  name: string;
  activeWorkspace: string;
  defaultWorkspace: string;
}

interface Project {
  id: string;
  name: string;
  workspaceId: string;
}
interface ProjectList extends Array<Project> {}

interface TimeEntryRequest {
  projectName: string;
  billable: boolean;
  customAttributes?: unknown[];
  customFields?: unknown[];
  description: string;
  end: string;
  projectId: string;
  start: string;
  tagIds?: string[];
  taskId?: string;
  type: "REGULAR";
}

// interface of json structure that will be written to file on login attempts
interface UserData {
  projects: ProjectList;
  api: string;
  userProfile: UserProfile;
  timer: TimeEntryRequest;
}

interface ReqOptions {
  method: string;
  headers: HeadersInit;
}

interface PostReqOptions {
  method: string;
  headers: HeadersInit;
  body: string;
}

interface PostedTimeResponse {
  projectId: string;
  timeInterval: {
    duration: string;
  };
}

export type {
  UserProfile,
  UserData,
  ApiInvalid,
  Project,
  ProjectList,
  TimeEntryRequest,
  ReqOptions,
  PostReqOptions,
  PostedTimeResponse,
};
