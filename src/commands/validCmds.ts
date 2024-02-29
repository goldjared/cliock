interface CommandData {
  key: string;
  value: [string, string];
}

const commandData: CommandData[] = [
  {
    key: "login",
    value: [
      "Login to your Clockify account with an API key",
      "iok login <API_key>",
    ],
  },
  {
    key: "start",
    value: [
      "Starts the timer for selected project, get project names with 'iok list'",
      "iok start <projectName>",
    ],
  },
  {
    key: "stop",
    value: [
      "Stops timer for the currently running timer. If no timer is running, returns no timer running",
      "iok stop",
    ],
  },
  {
    key: "info",
    value: [
      "Displays information about the current selected project and session time",
      "iok info insert help msg",
    ],
  },
  {
    key: "project",
    value: [
      "Select or create a project. Usage: project <project_name> or project list",
      "iok project insert help msg",
    ],
  },
  {
    key: "help",
    value: ["List available commands", "iok help ?commandName"],
  },
  {
    key: "list",
    value: [
      "List projects and their index values on current workspace",
      "iok list ?indexValue",
    ],
  },
];

// map of valid commands created by mapping the above array.
const validCmds: Map<string, [string, string]> = new Map<
  string,
  [string, string]
>(commandData.map((obj) => [obj.key, obj.value]));

const isValid = (cmd: string): boolean => {
  return validCmds.has(cmd.toLowerCase());
};

export { validCmds, isValid };
