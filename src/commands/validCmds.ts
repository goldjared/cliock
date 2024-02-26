interface CommandData {
  key: string;
  value: [string, number];
}

// valid commands, key=command, value[0]=desc, value[1]=max length valid input (including cmd)
const commandData: CommandData[] = [
  {
    key: "login",
    value: ["Login to Clockify. Usage: login username password", 3],
  },
  {
    key: "start",
    value: [
      "Starts the timer for the currently selected project. Optional: start <project_name>",
      2,
    ],
  },
  {
    key: "stop",
    value: [
      "Stops the timer for the currently running timer. If no timer is running, returns no timer running",
      1,
    ],
  },
  {
    key: "info",
    value: [
      "Displays information about the current selected project and session time",
      1,
    ],
  },
  {
    key: "project",
    value: [
      "Select or create a project. Usage: project <project_name> or project list",
      2,
    ],
  },
  {
    key: "help",
    value: ["insert help msg", 2],
  },
  {
    key: "list",
    value: ["List projects on current workspace", 1],
  },
];

// map of valid commands created by mapping the above array.
const validCmds: Map<string, [string, number]> = new Map<
  string,
  [string, number]
>(commandData.map((obj) => [obj.key, obj.value]));

const isValid = (cmd: string): boolean => {
  return validCmds.has(cmd.toLowerCase());
};

export { validCmds, isValid };
