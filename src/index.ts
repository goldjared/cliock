#!/usr/bin/env node
import { processor } from "./commands/processor";
import { fs, homeDir, writeApi } from "./sys/fileOps";

// check if .cliock exists, if not, create file.  
fs.readFile(homeDir + "/.cliock", "utf8", (err: unknown, data: string) => {
  if (err) {
    writeApi("");
    console.log("Set up complete. Type 'iok login <Clockify_API_key_here>'");
    return;
  }
  let api: string = data;
  api = api.slice(0, -1);
  processor(api);
});
