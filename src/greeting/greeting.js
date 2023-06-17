import { argv } from 'node:process';
import { env } from 'node:process';

const arg = argv.slice(2);
const userArgv = arg.find((el) => el.startsWith('--username'));
const userName = userArgv ? userArgv.split('=').at(1) : 'guest';
env.userName = userName;

console.log(`Welcome to the File Manager, ${userName}!`);
