import type {
  UserProfile,
  ApiInvalid,
  Project,
  ProjectList,
  ReqOptions,
  PostReqOptions,
} from "./validationTypes";

const genReqOptions = (apiKey: string): ReqOptions => {
  return {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
    },
  };
};

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
