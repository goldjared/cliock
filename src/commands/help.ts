import { isValid, validCmds } from "./validCmds";

const help = (helpCmd: string): void => {
  if (helpCmd === "") {
    console.log("Command, description. Enter 'iok help <command>' for detail");
    console.log("Note '?' means optional value");
    console.log("---------------------------------------------------");
    for (const [key, value] of validCmds) {
      console.log(key + ": " + value[0]);
      console.log(value[1]);
      console.log();
    }
    return;
  }

  if (isValid(helpCmd)) {
    const cmdDataArr: string[] | undefined = validCmds.get(helpCmd);
    if (cmdDataArr !== undefined) {
      console.log("Help for '" + helpCmd + "':");
      for (let i = 1; i < cmdDataArr.length; i++) {
        console.log(cmdDataArr[i]);
        console.log();
      }
    }
  }
};

export { help };
