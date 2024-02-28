import { readData, writeData } from "../sys/fileOps";
import type { UserData, ProjectList } from "../clockifyApi/validationTypes";
import { clockifyResponse, genPostReqOptions } from "../clockifyApi/validation";

const getWorkspaceTimeUrl = (wrkspcId: string): string =>
  `https://api.clockify.me/api/v1/workspaces/${wrkspcId}/time-entries`;

const getProjectId = (projectName: string, projList: ProjectList): string => {
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
  const year: string = date.getUTCFullYear().toString();
  let month: string = date.getUTCMonth().toString();
  let day: string = date.getUTCDate().toString();
  let hours: string = date.getUTCHours().toString();
  let minutes: string = date.getUTCMinutes().toString();
  let seconds: string = date.getUTCSeconds().toString();

  // yyyy-MM-ddThh:mm:ssZ
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  if (hours.length < 2) hours = "0" + hours;
  if (minutes.length < 2) minutes = "0" + minutes;
  if (seconds.length < 2) seconds = "0" + seconds;
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

const start = (projectId: string): void => {
  const data = readData();
  if (data === "") {
    console.log("No saved data found. Creating file...");
    return;
  }

  const userData: string = data;
  const userDataJson: UserData = JSON.parse(userData);

  userDataJson.timer.projectId = projectId;
  userDataJson.timer.start = getUTCTimeNow();

  writeData(JSON.stringify(userDataJson));
};

const isTimerRunning = (): boolean => {
  const data = readData();
  if (data === "") {
    console.log("No saved data found.");
    return false;
  }
  const userData: string = data;
  const userDataJson: UserData = JSON.parse(userData);
  return userDataJson.timer.start !== "";
};

const stop = (): void => {
  const data = readData();
  if (data === "") {
    console.log("No saved data found.");
    return;
  }
  const userData: string = data;
  const userDataJson: UserData = JSON.parse(userData);
  userDataJson.timer.end = getUTCTimeNow();

  const workspaceTimeUrl = getWorkspaceTimeUrl(
    userDataJson.userProfile.activeWorkspace
  );

  // send with URL link, and req options made with API.
  clockifyResponse(
    workspaceTimeUrl,
    genPostReqOptions(userDataJson.api, JSON.stringify(userDataJson.timer))
  )
    .then((data) => {
      console.log(`Success, time stopped and posted.`);
    })
    .catch((error) => {
      // Handle any errors that occurred during the execution
      console.error("Error:", error);
    });

  userDataJson.timer.start = "";
  userDataJson.timer.end = "";
  writeData(JSON.stringify(userDataJson));
};

export { getProjectId, start, stop, isTimerRunning };
