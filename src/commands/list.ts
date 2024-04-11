import type {
  Project,
  ProjectList,
  UserData,
  UserProfile,
} from "../clockifyApi/validationTypes";
import { readData } from "../sys/fileOps";

const getProjectList = (): ProjectList | undefined => {
  const data = JSON.parse(readData());
  if (data === "") {
    console.log(
      "No projects found for current workspace. Login with 'iok login <API_KEY>'"
    );
    return undefined;
  }
  const projList: ProjectList = data.projects;

  return projList;
};

// displays active workspace and total projects on workspace
const displayProjectHeader = (
  userData: UserProfile,
  projListLeng: number
): void => {
  console.log(
    "Workspace ID:",
    userData.activeWorkspace,
    "Projects: " + projListLeng
  );
  console.log("See '$iok help start' for omitting project name on timer start");
  console.log("____________________________________________________________");
  console.log();
};

// ternary for display w/ or w/o prefix
const displayProject = (proj: Project, prefix?: string): void => {
  prefix !== undefined
    ? console.log(prefix + ":", proj.name)
    : console.log(proj.name);
};

const listProjectAtIndex = (index: string, userData: UserData): void => {
  const projList: ProjectList = userData.projects;

  const projListLength: number = Object.keys(projList).length;
  if (projListLength === 0) {
    console.log("No projects on workspace");
    return;
  }
  // check if index val is present, and isNaN(+index) returns true if NaN
  if (index !== undefined && isNaN(+index)) {
    console.log("Project index value entered '" + index + "' is not a number.");
    return;
  }

  const indexNum: number = Number(index) - 1;
  if (indexNum >= projListLength || indexNum < 0) {
    console.log(
      "Entered index value out of range, type 'cliok list' for index values"
    );
    return;
  }

  if (projList[indexNum] !== null) {
    displayProject(projList[indexNum]);
  }
};

// lists all projects saved to file
const listProjects = (userData: UserData): void => {
  //  const userData: UserData = JSON.parse(readData());
  const projList: ProjectList = userData.projects;

  const projListLength: number = Object.keys(projList).length;
  if (projListLength === 0) {
    console.log("No projects on workspace");
    return;
  }
  displayProjectHeader(userData.userProfile, projListLength);
  for (let i = 0; i < projListLength; i++) {
    displayProject(projList[i], i + 1 + "");
  }
};

export { listProjects, listProjectAtIndex, displayProject };
