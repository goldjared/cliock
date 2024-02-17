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

// interface of json structure that will be written to file on login attempts
interface UserData {
  projects: ProjectList;
  api: string;
  userProfile: UserProfile;
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

const clockifyResponse = async (
  url: string,
  reqOptions: ReqOptions
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

export { clockifyResponse, genReqOptions };
export type { UserProfile, UserData, ApiInvalid, Project, ProjectList };
