const fs = require("fs");
const os = require("os");
const homeDir: string = os.homedir();

const writeApi = (content: string): boolean => {
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

export { fs, os, homeDir, writeApi };
