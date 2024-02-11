import { argv } from "node:process";
import { login } from "./login";
import { isValid } from "./validCmds";

const processor = (api: string): void => {
  if (argv[2] === undefined) {
    console.log("No command input. Type 'iok help'");
    return;
  }
  if (api === "api") {
    // call method to validate API. return
    const apiKey: string = argv[2];
    console.log(apiKey, " yo");
  }
  const command: string = argv[2].toLowerCase();
  if (!isValid(command)) {
    console.log(`Invalid command '${command}'. Type 'iok help'`);
    return;
  }
  const inputArr: string[] = argv.slice(3);

  if (command === "login") {
    // validate the argv array for the matching command
    login(inputArr);
  }
};

export { processor };
