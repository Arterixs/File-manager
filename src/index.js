import { stdin, exit } from 'node:process';
import { env } from 'node:process';
import './greeting/greeting.js';
import {
  updateWorkingDirectory,
  listFiles,
  movedNewWorkingDirectory,
} from './navigation/navigate.js';

stdin.on('data', async (data) => {
  const convertDataString = data.toString().trim();
  switch (convertDataString) {
    case 'up':
      updateWorkingDirectory();
      break;
    case 'ls':
      await listFiles();
      break;
    case 'cd':
      movedNewWorkingDirectory(convertData);
      break;
    case '.exit':
      exit(0);
    default:
      console.log('Invalid input');
  }
  console.log(`You are currently in ${env.work_directory}`);
});

process.on('SIGINT', () => exit(0));

process.on('exit', () => {
  console.log(`Thank you for using File Manager, ${env.userName}, goodbye!`);
});
