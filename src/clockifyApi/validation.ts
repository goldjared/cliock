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

interface Timer {
  projectId: string;
  projectName: string;
  start: string;
  end: string;
}

interface TimeEntryRequest {
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

const genReqOptions = (apiKey: string): ReqOptions => {
  return {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
    },
  };
};

interface PostReqOptions {
  method: string;
  headers: HeadersInit;
  body: string;
}

const genPostReqOptions = (apiKey: string, data: string): PostReqOptions => {
  return {
    method: "POST",
    headers: {
      "X-Api-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: data,
  };
};

const clockifyResponse = async (
  url: string,
  reqOptions: ReqOptions | PostReqOptions
): Promise<ApiInvalid | UserProfile | Project | ProjectList> => {
  try {
    const response = await fetch(url, reqOptions);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error fetching data: ", error);
    throw error;
  }
};

export { clockifyResponse, genReqOptions, genPostReqOptions };
export type {
  UserProfile,
  UserData,
  ApiInvalid,
  Project,
  ProjectList,
  Timer,
  TimeEntryRequest,
};
