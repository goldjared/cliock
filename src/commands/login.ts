import { clockifyResponse, genReqOptions } from "../clockifyApi/validation";
import type {
  UserProfile,
  ApiValid,
  ApiInvalid,
} from "../clockifyApi/validation";
import { writeApi } from "../sys/fileOps";

const userUrl: string = "https://api.clockify.me/api/v1/user";

const login = (apiKey: string): boolean => {
  clockifyResponse(userUrl, genReqOptions(apiKey))
    .then((data: ApiValid | ApiInvalid | UserProfile) => {
      // type guard
      if ("name" in data) {
        //         const responseLen: number = Object.keys(data).length;
        writeApi(apiKey);
        console.log(
          `Key authenticated. '${data.name}' Logged in successfully.`
        );
        return true;
      } else {
        console.log("Invalid. Authentication failed");
      }
    })
    .catch((error) => {
      // Handle any errors that occurred during the execution
      console.error("Error:", error);
    });
  return false;
};

export { login };
