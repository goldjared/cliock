const fs = require("fs");
const os = require("os");
const homeDir: string = os.homedir();

const writeData = (content: string): boolean => {
  fs.writeFile(homeDir + "/.cliock", content, (err: unknown) => {
    if (err) {
      console.error(err);
      return false;
    } else {
      console.log("success!");
    }
  });
  return true;
};

const readData = (): void => {
  fs.readFile(homeDir + "/.cliock", "utf8", (err: unknown, data: string) => {
    if (err) {
      console.log("Read error.");
      return;
    }
    return data;
  });
};
export { fs, os, homeDir, writeData, readData };
