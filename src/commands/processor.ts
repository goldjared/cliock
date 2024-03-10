import { argv } from "node:process";
import { login } from "./login";
import { isValid } from "./validCmds";
import type {
  ProjectList,
  UserProfile,
  UserData,
} from "../clockifyApi/validationTypes";
import { isTimerRunning, start, stop } from "./timer";
import { getProjectId } from "./util/timerUtil";
import { listProjectAtIndex, listProjects } from "./list";
import { help } from "./help";

const processor = (userData: string): void => {
  // check if userData (.cliock file) is not empty
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
    if (inputArr.length < 1) {
      console.log("Input invalid. Type 'iok help login'");
      return;
    }
    login(inputArr[0]);
    return;
  }
  // check if command was not login and user is not logged in
  if (userData === "") {
    console.log("No local data found. Type 'iok help login'");
    return;
  }

  const userDataJson: UserData = JSON.parse(userData);
  const api: string = userDataJson.api;
  const userProfile: UserProfile = userDataJson.userProfile;
  const userCurrentWorkspaceProjects: ProjectList = userDataJson.projects;

  if (command === "start") {
    const projectName: string = inputArr.join(" ");

    // will either be projectID or blank string
    const projectId: string = getProjectId(
      projectName,
      userCurrentWorkspaceProjects
    );

    // name.length > 0 to account for an omitted project name, in the event user wants to use a // saved project on file
    if (projectId === "" && projectName.length > 0) {
      console.log(
        `Invalid project name '${projectName}', *NOTE* input is case sensitive. Exiting`
      );
    } else {
      // if omitted name, attempt start w/o values. if name present, attempt start with values
      projectName === "" && projectId === ""
        ? start()
        : start(projectId, projectName);
    }
  } else if (command === "stop") {
    if (!isTimerRunning()) {
      console.log("No timer currently running. Exiting");
      return;
    }
    stop();
  } else if (command === "list") {
    inputArr[0] !== undefined
      ? listProjectAtIndex(inputArr[0], userDataJson)
      : listProjects(userDataJson);
  } else if (command === "help") {
    const helpCmd: string = inputArr.join(" ");
    help(helpCmd);
  } else if (command === "sync") {
    login(api);
  }
};

export { processor };
