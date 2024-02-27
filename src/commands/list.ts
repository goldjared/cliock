import type {
  Project,
  ProjectList,
  UserData,
  UserProfile,
} from "../clockifyApi/validationTypes";
import { readData } from "../sys/fileOps";

// displays active workspae and total projects on wrkspace
const displayProjectHeader = (
  userData: UserProfile,
  projListLeng: number
): void => {
  console.log(
    "Workspace ID:",
    userData.activeWorkspace,
    "Projects: " + projListLeng
  );
  console.log("---------------------------------------------");
};

const displayProject = (proj: Project, prefix?: string): void => {
  prefix !== undefined
    ? console.log(prefix + ":", proj.name)
    : console.log(proj.name);
};

const listProjectAtIndex = (index: string): Project | undefined => {
  const userData: UserData = JSON.parse(readData());
  const projList: ProjectList = userData.projects;
  if (projList === undefined) {
    console.log("No projects found");
    return undefined;
  }
  const projListLength: number = Object.keys(projList).length;
  // check if index val is present, and isNaN(+index) returns true if NaN
  if (index !== undefined && isNaN(+index)) {
    console.log("Project index value entered '" + index + "' is not a number.");
    return undefined;
  }

  const indexNum: number = Number(index) - 1;
  if (indexNum >= projListLength || indexNum < 0) {
    console.log(
      "Entered index value out of range, type 'cliok list' for index values"
    );
    return undefined;
  }

  if (projList[indexNum] !== null) {
    displayProject(projList[indexNum]);
  }
};

// lists all projects saved to file
const listProjects = (): void => {
  const userData: UserData = JSON.parse(readData());
  const projList: ProjectList = userData.projects;
  if (projList === undefined) {
    console.log("No projects found");
    return;
  }
  const projListLength: number = Object.keys(projList).length;
  displayProjectHeader(userData.userProfile, projListLength);
  for (let i = 0; i < projListLength; i++) {
    displayProject(projList[i], i + 1 + "");
  }
};

export { listProjects, listProjectAtIndex };
