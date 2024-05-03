import { readData } from "../sys/fileOps";
import { isTimerRunning } from "./timer";
import type { UserData, ProjectList } from "../clockifyApi/validationTypes";
import { getUTCTimeNow } from "./util/timerUtil";

const info = (): void => {
  const data = readData();

  const userData: string = data;
  const userDataJson: UserData = JSON.parse(userData);
  const username: string = userDataJson.userProfile.name;
  const userId: string = userDataJson.userProfile.id;
  const activeWorkspace: string = userDataJson.userProfile.activeWorkspace;
  const defaultWorkspace: string = userDataJson.userProfile.defaultWorkspace;
  const projList: ProjectList = userDataJson.projects;
  const projListLength: number = Object.keys(projList).length;

  const isRunning: boolean = isTimerRunning();
  const selectedProj: string = userDataJson.timer.projectName;
  const startTime: string = userDataJson.timer.start;
  const timeNow: string = getUTCTimeNow();

  console.log("Cliock");
  console.log("____________________________________________________________");
  console.log();
  console.log("Username: " + username);
  console.log("User ID: " + userId);
  console.log("Active Workspace: " + activeWorkspace);
  console.log("Default Workspace: " + defaultWorkspace);
  console.log("Projects: " + projListLength);
  console.log();
  console.log("Timer Running: " + isRunning);
  console.log("Selected Project: " + selectedProj);
  if (startTime !== "") {
    console.log("Start Time: " + startTime);
  }
};

export { info };
