import { argv } from 'node:process';
import { login } from './login'

// print process.argv
const processor = () => {
/*
argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
  if(val === 'login') {
        
  }
});
*/
  const command : string = argv[2]; 
  // if there is only 1 input, and input is valid command, display help for said cmd
  if(argv.length === 3) {

  }
  if(command === "login") {
    // validate the argv array for the matching command
    validate(argv, command);
    login(argv[2], argv[3]);
  }
}

export { processor } 
