import { readData, writeData } from "../sys/fileOps";
import {
  clockifyResponse,
  genPostReqOptions,
  type UserData,
  type ProjectList,
} from "../clockifyApi/validation";

const getWorkspaceTimeUrl = (wrkspcId: string): string =>
  `https://api.clockify.me/api/v1/workspaces/${wrkspcId}/time-entries`;

const getProjectId = (projectName: string): string => {
  const data = readData();
  if (data === "") {
    console.log("No saved data found. Creating file...");
    return "";
  }

  const userData: string = data;
  const userDataJson: UserData = JSON.parse(userData);

  const projList: ProjectList = userDataJson.projects;
  const projListLength: number = Object.keys(projList).length;

  // iterate through project list, return proj ID if name param exists in projList
  for (let i = 0; i < projListLength; i++) {
    if (projList[i].name === projectName) return projList[i].id;
  }

  // projName/ID does not exist. Return blank string
  return "";
};

const getUTCTimeNow = (): string => {
  const date = new Date();
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  // yyyy-MM-ddThh:mm:ssZ
  return (
    year +
    "-" +
    month +
    "-" +
    day +
    "T" +
    hours +
    ":" +
    minutes +
    ":" +
    seconds +
    "Z"
  );
};

const start = (projectName: string, projectId: string): void => {
  const data = readData();
  if (data === "") {
    console.log("No saved data found. Creating file...");
    return;
  }

  const userData: string = data;
  const userDataJson: UserData = JSON.parse(userData);

  userDataJson.timer = {
    projectId,
    projectName,
    start: getUTCTimeNow(),
    end: "",
  };
  writeData(JSON.stringify(userDataJson));
  console.log("file rewritten with timer start, end reset!");
};

const isTimerRunning = (): boolean => {
  const data = readData();
  if (data === "") {
    console.log("No saved data found. Creating file...");
    return false;
  }
  const userData: string = data;
  const userDataJson: UserData = JSON.parse(userData);
  return userDataJson.timer.start !== "";
};

const stop = (): void => {
  const data = readData();
  if (data === "") {
    console.log("No saved data found. Creating file...");
    return;
  }
  const userData: string = data;
  const userDataJson: UserData = JSON.parse(userData);
  userDataJson.timer.end = getUTCTimeNow();

  const workspaceTimeUrl = getWorkspaceTimeUrl(
    userDataJson.userProfile.activeWorkspace
  );

  // send with URL link, and req options made with API.
  clockifyResponse(workspaceTimeUrl, genPostReqOptions(userDataJson.api))
    .then((data) => {
      console.log(`Suxcess.`);
      console.log(data);
    })
    .catch((error) => {
      // Handle any errors that occurred during the execution
      console.error("Error:", error);
    });

  userDataJson.timer.start = "";
  userDataJson.timer.end = "";
  writeData(JSON.stringify(userDataJson));
  console.log("file rewritten with timer start, end reset!");
};

export { getProjectId, start, stop, isTimerRunning };
