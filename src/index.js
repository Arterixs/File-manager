import { stdin, exit } from 'node:process';
import { env } from 'node:process';
import './greeting/greeting.js';

stdin.on('data', (data) => {
  if (data.includes('.exit')) exit(0);
});
process.on('SIGINT', () => exit(0));

process.on('exit', () => {
  console.log(`Thank you for using File Manager, ${env.userName}, goodbye!`);
});
