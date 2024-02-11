#!/usr/bin/env node
import { processor } from "./commands/cmdProcessor";

const fs = require("fs");
const os = require("os");
const homeDir: string = os.homedir();

// check if .cliock exists, if not, prompt for API.
fs.readFile(homeDir + "/.cliock", "utf8", (err: unknown, data: string) => {
  if (err) {
    console.error(err);
    processor("api");
    return;
  }
  console.log(data);
  processor(data);
});

// const readFile2 = async(): Promise<unknown> => {
//  const data: string = await fs.readFile(homeDir + '/.cliock', 'utf8')
//   return Buffer.from(data);
// }
//     // validate API
// const test10: unknown = readFile2();
//
//
// setTimeout(() => {
// console.log(test10, 'test10 after timeout');
//
// }, 2000);

// const content = 'thisIsanAPI754802957482';
// fs.writeFile(homeDir + '/.cliock', content, (err: unknown) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log('success!');
//   }
// });
