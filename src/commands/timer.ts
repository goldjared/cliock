import { readData, writeData } from "../sys/fileOps";
import {
  clockifyResponse,
  genPostReqOptions,
  type UserData,
} from "../clockifyApi/validation";

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

export { getProjectId, start, stop };
