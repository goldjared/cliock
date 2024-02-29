import { clockifyResponse, genReqOptions } from "../clockifyApi/validation";
import { writeData } from "../sys/fileOps";
import type {
  UserProfile,
  ApiInvalid,
  Project,
  ProjectList,
  UserData,
  PostedTimeResponse,
} from "../clockifyApi/validationTypes";

const userUrl: string = "https://api.clockify.me/api/v1/user";
const getWorkspaceProjectsUrl = (wrkspcId: string): string =>
  `https://api.clockify.me/api/v1/workspaces/${wrkspcId}/projects`;

const login = (apiKey: string): void => {
  clockifyResponse(userUrl, genReqOptions(apiKey))
    .then(
      (
        data:
          | ApiInvalid
          | UserProfile
          | Project
          | ProjectList
          | PostedTimeResponse
      ) => {
        // type guard
        if ("name" in data && "activeWorkspace" in data) {
          const userProfile: UserProfile = {
            id: data.id,
            name: data.name,
            activeWorkspace: data.activeWorkspace,
            defaultWorkspace: data.defaultWorkspace,
          };

          const userData: UserData = {
            projects: [],
            api: apiKey,
            userProfile,
            // set empty timer to userData.timer
            timer: {
              billable: false,
              customAttributes: [],
              customFields: [],
              description: "",
              end: "",
              projectId: "",
              start: "",
              tagIds: [],
              taskId: "",
              type: "REGULAR",
            },
          };
          console.log(
            `Key authenticated. '${data.name}' Logged in successfully.`
          );
          // get array of project objs (ProjectList of Projects)
          clockifyResponse(
            getWorkspaceProjectsUrl(data.activeWorkspace),
            genReqOptions(apiKey)
          )
            .then(
              (
                data:
                  | ApiInvalid
                  | UserProfile
                  | Project
                  | ProjectList
                  | PostedTimeResponse
              ) => {
                // data is the array of project objects
                if (Array.isArray(data)) {
                  const projList: ProjectList = [];
                  for (const proj of data) {
                    const currentProj = {
                      name: proj.name,
                      id: proj.id,
                      workspaceId: proj.workspaceId,
                    };
                    projList.push(currentProj);
                  }
                  // set projectList obj to userData.projects
                  userData.projects = { ...projList };
                  writeData(JSON.stringify(userData));
                }
              }
            )
            .catch((error) => {
              // Handle any errors that occurred during the execution
              console.error("Error:", error);
            });
        } else {
          console.log("API key entered is invalid");
        }
      }
    )
    .catch((error) => {
      // Handle any errors that occurred during the execution
      console.error("Error:", error);
    });
};

export { login };
