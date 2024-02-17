import { argv } from "node:process";
import { login } from "./login";
import { isValid } from "./validCmds";
import {
  Project,
  ProjectList,
  UserData,
  UserProfile,
} from "../clockifyApi/validation";

const processor = (userData: string): void => {
  // check if userData (.cliock file) is not empty
  let userDataJson: UserData;
  let api: string;
  let userProfile: UserProfile;
  let userCurrentWorkspaceProjects: ProjectList;
  if (userData !== "") {
    // convert string into json obj
    userDataJson = JSON.parse(userData);

    api = userDataJson.api;
    // console.log(api)
    userProfile = userDataJson.userProfile;
    // console.log(userProfile);
    userCurrentWorkspaceProjects = userDataJson.projects;
    // console.log(userCurrentWorkspaceProjects);
  }

  if (argv[2] === undefined) {
    console.log("No command input. Type 'iok help'");
    return;
  }

  const command: string = argv[2].toLowerCase();
  if (!isValid(command)) {
    console.log(`Invalid command '${command}'. Type 'iok help'`);
    return;
  }

  const inputArr: string[] = argv.slice(3);
  if (command === "login") {
    login(inputArr[0]);
  } // end login command
};

export { processor };
