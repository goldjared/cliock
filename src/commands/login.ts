import { clockifyResponse, genReqOptions } from "../clockifyApi/validation";
import { readData, writeData } from "../sys/fileOps";
import type {
  UserProfile,
  ApiInvalid,
  Project,
  ProjectList,
} from "../clockifyApi/validation";

const userUrl: string = "https://api.clockify.me/api/v1/user";
const getWorkspaceProjectsUrl = (wrkspcId: string): string =>
  `https://api.clockify.me/api/v1/workspaces/${wrkspcId}/projects`;

const login = (apiKey: string): void => {
  clockifyResponse(userUrl, genReqOptions(apiKey))
    .then((data: ApiInvalid | UserProfile | Project | ProjectList) => {
      // type guard
      if ("name" in data && "activeWorkspace" in data) {
        //         const responseLen: number = Object.keys(data).length;
        //         should also write the workspace ID
        //
        const userProfile: UserProfile = {
          id: data.id,
          name: data.name,
          activeWorkspace: data.activeWorkspace,
          defaultWorkspace: data.defaultWorkspace,
        };

        const userData: object = {
          api: apiKey,
          userProfile,
        };
        // writeApi(JSON.stringify(userData));
        //        dataToWrite.push(userData);
        console.log(
          `Key authenticated. '${data.name}' Logged in successfully.`
        );
        // get array of project objs (ProjectList of Projects)
        //
        clockifyResponse(
          getWorkspaceProjectsUrl(data.activeWorkspace),
          genReqOptions(apiKey)
        )
          .then((data: ApiInvalid | UserProfile | Project | ProjectList) => {
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
              const mergedJson = Object.assign({}, projList, userData);
              writeData(JSON.stringify(mergedJson));
            }
          })
          .catch((error) => {
            // Handle any errors that occurred during the execution
            console.error("Error:", error);
          });
      } else {
        console.log("Failed to get projects on workspace");
      }
    })
    .catch((error) => {
      // Handle any errors that occurred during the execution
      console.error("Error:", error);
    });
  // end userProfile fetch
};

export { login };
