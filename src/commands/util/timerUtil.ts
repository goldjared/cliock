import type { ProjectList } from "../../clockifyApi/validationTypes";

const parseTimeDuration = (durationTimeToParse: string): string => {
  // parameter string example: PT4M33S
  const durationTimeToParseLeng: number = durationTimeToParse.length;
  let workingSectionChar: string = "";
  let passedSeconds: string = "";
  let passedMinutes: string = "";
  let passedHours: string = "";

  // iterate through string param right to left, breaks on 'T' for end of useful values
  for (let i = durationTimeToParseLeng - 1; i > 0; i--) {
    const currentChar: string = durationTimeToParse.charAt(i);
    if (currentChar === "T") break;

    if (workingSectionChar === "") {
      workingSectionChar = currentChar;
      continue;
    } else if (workingSectionChar !== currentChar && isNaN(+currentChar)) {
      workingSectionChar = currentChar;
      continue;
    }

    if (workingSectionChar === "S") passedSeconds = currentChar + passedSeconds;
    if (workingSectionChar === "M") passedMinutes = currentChar + passedMinutes;
    if (workingSectionChar === "H") passedHours = currentChar + passedHours;
  }

  // finalize time values with prefix 0's or 00 in case of empty string
  passedSeconds = parseTimeWithZeros(passedSeconds);
  passedMinutes = parseTimeWithZeros(passedMinutes);
  passedHours = parseTimeWithZeros(passedHours);

  return passedHours + ":" + passedMinutes + ":" + passedSeconds;
};

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

const parseTimeWithZeros = (timeValue: string): string => {
  if (timeValue.length < 2 && timeValue.length >= 1) {
    timeValue = "0" + timeValue;
  } else if (timeValue.length === 0) {
    timeValue = "00";
  }

  return timeValue;
};

export { parseTimeDuration, getProjectId, getUTCTimeNow, getWorkspaceTimeUrl };
