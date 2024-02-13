import { argv } from "node:process";
import { login } from "./login";
import { isValid } from "./validCmds";

const processor = (api: string): void => {
  // API input will either be empty string or a key.

  if (argv[2] === undefined) {
    console.log("No command input. Type 'iok help'");
    return;
  }

  const command: string = argv[2].toLowerCase();
  if (!isValid(command)) {
    console.log(`Invalid command '${command}'. Type 'iok help'`);
    return;
  }
  const inputArr: string[] = argv.slice(3);
  // for login, this may be redundant. maybe all login can go in api==='api'.
  if (command === "login") {
    login(inputArr[0]);
  } // end login command
};

export { processor };
