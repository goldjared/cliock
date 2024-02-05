import { argv } from 'node:process';
import { login } from './commands'

// print process.argv
const processor = () => {
argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

}

login(argv[2], argv[3]);

export { processor } 
