import { stdin, exit } from 'node:process';
import { env } from 'node:process';
import './greeting/greeting.js';
import { updateWorkingDirectory, listFiles } from './navigation/navigate.js';

stdin.on('data', (data) => {
  if (data.includes('up')) {
    updateWorkingDirectory();
  }
  if (data.includes('ls')) {
    listFiles();
  }
  if (data.includes('.exit')) {
    exit(0);
  } else {
    console.log(`You are currently in ${env.work_directory}`);
  }
});

process.on('SIGINT', () => exit(0));

process.on('exit', () => {
  console.log(`Thank you for using File Manager, ${env.userName}, goodbye!`);
});
