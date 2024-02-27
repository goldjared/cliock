import { argv } from "node:process";
import { login } from "./login";
import { isValid } from "./validCmds";
import type {
  ProjectList,
  UserProfile,
  UserData,
} from "../clockifyApi/validationTypes";
import { getProjectId, isTimerRunning, start, stop } from "./timer";
import { listProjectAtIndex, listProjects } from "./list";

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
  } else if (command === "start") {
    const projectName: string = inputArr.join(" ");

    // will either be projectID or blank string
    const projectId: string = getProjectId(projectName);

    if (projectId === "") {
      console.log(`Invalid project name '${projectName}'. Exiting`);
    }
    start(projectId);
    console.log("Timer started on project: '" + projectName + "'");
  } else if (command === "stop") {
    if (!isTimerRunning()) {
      console.log("No timer currently running. Exiting");
      return;
    }
    stop();
    console.log("Timer stopped");
  } else if (command === "list") {
    inputArr[0] !== undefined
      ? listProjectAtIndex(inputArr[0])
      : listProjects();
  }
};

export { processor };
