import { readData } from "../sys/fileOps";
import type {
  ProjectList,
  UserData,
  Timer,
} from "../clockifyApi/validation";
const getWorkspaceTimeUrl = (wrkspcId: string): string =>
  `https://api.clockify.me/api/v1/workspaces/${wrkspcId}/time-entries`;

/*
  
start <project> 
record in json project, start-time, ""/null (end time) 

stop 
check file for time json 
if json is there, adds end: <end-time> 
then sends post to clockify with time entry, 
wipes time entry from file


 */

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

export { getProjectId, start };
