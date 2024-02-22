import { readData, writeData } from "../sys/fileOps";
import type { UserData } from "../clockifyApi/validation";

const getWorkspaceTimeUrl = (wrkspcId: string): string =>
  `https://api.clockify.me/api/v1/workspaces/${wrkspcId}/time-entries`;

const getProjectId = (projectName: string): string => {
  if (readData() === "") {
    // display start up message
    console.log("No saved data found. Creating file...");
    return "";
  }
  const userData: string = readData();
  const userDataJson: UserData = JSON.parse(userData);
  for (const proj of userDataJson.projects) {
    if (proj.name === projectName) return proj.id;
  }
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
  const userData: string = readData();
  const userDataJson: UserData = JSON.parse(userData);
  userDataJson.timer = {
    projectId,
    projectName,
    start: getUTCTimeNow(),
    end: "",
  };
};

const stop = (): void => {
  if (readData() === "") {
    // display start up message
    console.log("No saved data found. Creating file...");
    return;
  }
  const userData: string = readData();
  const userDataJson: UserData = JSON.parse(userData);
  userDataJson.timer.end = getUTCTimeNow();
  // send the POST request with the timer.
  // set .timer to blank values, then write it to file.
  writeData(JSON.stringify());
};

export { getProjectId, start, stop };
