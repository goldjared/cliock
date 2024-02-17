#!/usr/bin/env node
import { processor } from "./commands/processor";
import { fs, homeDir, writeData } from "./sys/fileOps";

// check if .cliock exists, if not, create file.
fs.readFile(homeDir + "/.cliock", "utf8", (err: unknown, data: string) => {
  if (err) {
    writeData("");
    console.log("Set up complete. Type 'iok login <Clockify_API_key_here>'");
    return;
  }
  if (data === "") {
    processor("");
    return;
  }

  const userData: string = data;
  processor(userData);
});
