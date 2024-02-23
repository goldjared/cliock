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
  //   fs.readFile(homeDir + "/.cliock", "utf8", (err: unknown, data: string) => {
  //     if (err) {
  //       console.log("Read error.");
  //       return;
  //     }
  //     return data;
  //  });

  try {
    const data = fs.readFileSync(homeDir + "/.cliock", "utf8");
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
  return "";
};

export { fs, os, homeDir, writeData, readData };
