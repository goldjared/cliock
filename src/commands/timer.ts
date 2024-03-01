import { readData, writeData } from "../sys/fileOps";
import type {
  UserData,
  PostedTimeResponse,
} from "../clockifyApi/validationTypes";
import { clockifyResponse, genPostReqOptions } from "../clockifyApi/validation";
import {
  parseTimeDuration,
  getWorkspaceTimeUrl,
  getUTCTimeNow,
} from "./util/timerUtil";

const start = (projectId: string, projectName: string): void => {
  const data = readData();
  if (data === "") {
    console.log("No saved data found. Creating file...");
    return;
  }

  const userData: string = data;
  const userDataJson: UserData = JSON.parse(userData);

  userDataJson.timer.projectId = projectId;
  userDataJson.timer.projectName = projectName;
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
      if ("projectId" in data && "timeInterval" in data) {
        const postedTimeResp: PostedTimeResponse = {
          projectId: data.projectId,
          timeInterval: {
            duration: data.timeInterval.duration,
          },
        };
        const timeDuration: string = parseTimeDuration(
          postedTimeResp.timeInterval.duration
        );
        const projectName = userDataJson.timer.projectName;
        console.log("Timer stopped on project '" + projectName + "'");
        console.log(`Time entry successfully posted to Clockify`);
        console.log("Duration: " + timeDuration);
      }
    })
    .catch((error) => {
      // Handle any errors that occurred during the execution
      console.error("Error:", error);
    });

  userDataJson.timer.start = "";
  userDataJson.timer.end = "";
  writeData(JSON.stringify(userDataJson));
};

export { start, stop, isTimerRunning };
