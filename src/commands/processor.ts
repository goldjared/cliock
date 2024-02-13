import { argv } from "node:process";
import { login } from "./login";
import { isValid } from "./validCmds";
import { clockifyResponse, genReqOptions } from "../clockifyLogic/getUser";
import { writeApi } from "../sys/fileOps";
import type {
  UserProfile,
  ApiValid,
  ApiInvalid,
} from "../clockifyLogic/getUser";

const processor = (api: string): void => {
  // API input will either be empty string or a key.
  const url: string = "https://api.clockify.me/api/v1/user";

  if (argv[2] === undefined) {
    console.log("No command input. Type 'iok help'");
    return;
  }

  const command: string = argv[2].toLowerCase();
  if (!isValid(command)) {
    console.log(`Invalid command '${command}'. Type 'iok help'`);
    return;
  }
  //  const inputArr: string[] = argv.slice(3);
  // for login, this may be redundant. maybe all login can go in api==='api'.
  if (command === "login") {
    clockifyResponse(url, genReqOptions(argv[3]))
      .then((data: ApiValid | ApiInvalid | UserProfile) => {
        if ("name" in data) {
          //         const responseLen: number = Object.keys(data).length;
          writeApi(argv[3]);
          console.log(
            `Key authenticated. '${data.name}' Logged in successfully.`
          );
        } else {
          console.log("Invalid. Authentication failed");
        }
      })
      .catch((error) => {
        // Handle any errors that occurred during the execution
        console.error("Error:", error);
      });
  } // end login command
};

export { processor };
