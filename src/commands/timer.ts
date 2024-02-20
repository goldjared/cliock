const getWorkspaceTimeUrl = (wrkspcId: string): string =>
  `https://api.clockify.me/api/v1/workspaces/${wrkspcId}/time-entries`;

interface Time {
  end: string,
  projectId: string,
  start: string,
}

 const timer = (apiKey: string, startOrEnd: string, time: string, projectId: string): void => {
  clockifyResponse(userUrl, genReqOptions(apiKey))
    .then((data) => {
     
    })
    .catch((error) => {
      // Handle any errors that occurred during the execution
      console.error("Error:", error);
    });
};

export { timer };


