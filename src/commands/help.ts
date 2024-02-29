import { validCmds } from "./validCmds";

const help = (helpCmd: string): void => {
  if (helpCmd === "") {
    console.log("Command, description. Enter 'iok help <command>' for detail");
    console.log("---------------------------------------------------");
    for (const [key, value] of validCmds) {
      console.log("<" + key + ">: " + value[0]);
      console.log(value[1]);
      console.log();
    }
    return;
  }

  if (validCmds.has(helpCmd)) {
    const cmdDataArr: [string, string] | undefined = validCmds.get(helpCmd);
    if (cmdDataArr !== undefined) {
      console.log("Help for '" + helpCmd + "':");
      console.log(cmdDataArr[0]);
      console.log(cmdDataArr[1]);
    }
  }
};

export { help };
