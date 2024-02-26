import type { ProjectList } from "../clockifyApi/validation";
import { readData } from "../sys/fileOps";

const listProjects = (index: string | undefined = undefined): void => {
  const data = JSON.parse(readData());
  if (data === "") {
    console.log(
      "No projects found for current workspace. Login with 'iok login <API_KEY>'"
    );
  }
  const projList: ProjectList = data.projects;
  const projListLength: number = Object.keys(projList).length;
  // check if index val is present, and isNaN(+index) returns true if NaN
  if (index !== undefined && isNaN(+index)) {
    console.log("Project index value entered '" + index + "' is not a number.");
    return;
  }

  const indexNum: number = Number(index) - 1;
  if (indexNum > projListLength || indexNum < 0) {
    console.log("Entered index value out of range");
    return;
  }

  if (projList[indexNum] !== null) {
    console.log(projList[Number(index) - 1].name);
    return;
  }

  console.log(
    "Workspace ID:",
    data.userProfile.activeWorkspace,
    "Projects: " + projListLength
  );
  console.log("---------------------------------------------");
  // iterate through project list, return proj ID if name param exists in projList
  for (let i = 0; i < projListLength; i++) {
    console.log(i + 1 + ":", projList[i].name);
  }
};

export { listProjects };
