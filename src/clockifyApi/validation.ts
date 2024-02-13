interface ApiInvalid {
  message: string;
  code: number;
}

interface ApiValid {
  timestamp: string;
  status: number;
  error: string;
  path: string;
}

interface UserProfile {
  id: string;
  name: string;
  activeWorkspace: string;
  defaultWorkspace: string;
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
): Promise<ApiValid | ApiInvalid | UserProfile> => {
  try {
    const response = await fetch(url, reqOptions);
    const data = await response.json();

    const userProfile: UserProfile = {
      id: data.id,
      name: data.name,
      activeWorkspace: data.activeWorkspace,
      defaultWorkspace: data.defaultWorkspace,
  }
    return userProfile;

  } catch (error) {
    console.log("Error fetching data: ", error);
    throw error;
  }
};

export { clockifyResponse, genReqOptions };
export type { UserProfile, ApiValid, ApiInvalid };
