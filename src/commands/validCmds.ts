interface CommandData {
  key: string;
  value: string[];
}

const commandData: CommandData[] = [
  {
    key: "login",
    value: [
      "Login to your Clockify account with an API key",
      "$iok login <API_key>",
    ],
  },
  {
    key: "start",
    value: [
      "Starts the timer for selected project, get project names with 'iok list'",
      "$iok start <projectName?>",
      "projectName can be omitted to use most recently used project in Cliock, if you have not changed workspace",
      "e.g. $iok start",
      "Will start the timer on the last project the timer was started/stopped on in Cliock, if present",
      "$iok start -- -n <indexValue>",
      "Obtain index value from '$iok list'. Remove need to type proj name",
    ],
  },
  {
    key: "stop",
    value: [
      "Stops timer for the currently running timer. If no timer is running, returns no timer running",
      "$iok stop",
    ],
  },
  {
    key: "info",
    value: [
      "Displays information about the current selected project and session",
      "$iok info",
    ],
  },
  {
    key: "project",
    value: [
      "Select or create a project. Usage: project <project_name> or project list",
      "$iok project insert help msg",
    ],
  },
  {
    key: "help",
    value: ["List available commands", "$iok help <commandName?>"],
  },
  {
    key: "list",
    value: [
      "List projects and their index values on current workspace",
      "$iok list <indexValue?>",
    ],
  },
  {
    key: "sync",
    value: [
      "Sync local Cliock file with Clockify API to match upstream",
      "$iok sync",
    ],
  },
];

// map of valid commands created by mapping the above array.
const validCmds: Map<string, string[]> = new Map<string, string[]>(
  commandData.map((obj) => [obj.key, obj.value])
);

const isValid = (cmd: string): boolean => {
  return validCmds.has(cmd.toLowerCase());
};

export { validCmds, isValid };
