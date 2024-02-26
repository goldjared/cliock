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

const readData = (): string => {
  try {
    const data = fs.readFileSync(homeDir + "/.cliock", "utf8");
    return data;
  } catch (err) {
    console.error(err);
  }
  return "";
};

export { fs, os, homeDir, writeData, readData };
