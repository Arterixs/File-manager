import { stdin, exit } from 'node:process';
import { createInterface } from 'node:readline/promises';
import { env } from 'node:process';
import './greeting/greeting.js';
import { messageCurrentPath, messageInvalid } from './helpers.js';
import {
  upWorkingDirectory,
  listFiles,
  movedNewWorkingDirectory,
} from './navigation/navigate.js';
import { readFile } from './fs/readFile.js';
import { createFile } from './fs/createFile.js';
import { renameFile } from './fs/renameFile.js';
import { copyFile } from './fs/copyFile.js';
import { movedFile } from './fs/movedFile.js';
import { removeFile } from './fs/removeFile.js';
import { controller } from './os/controller.js';
import { calcHash } from './hash/calcHash.js';

const rl = createInterface({
  input: stdin,
});

const correctValueStdin = (data) => data.split(/\s/).at(0);

rl.on('line', async (data) => {
  const command = correctValueStdin(data);
  switch (command) {
    case 'up':
      upWorkingDirectory();
      messageCurrentPath();
      break;
    case 'ls':
      await listFiles();
      messageCurrentPath();
      break;
    case 'cd':
      await movedNewWorkingDirectory(data);
      messageCurrentPath();
      break;
    case 'cat':
      await readFile(data);
      break;
    case 'add':
      await createFile(data);
      messageCurrentPath();
      break;
    case 'rn':
      await renameFile(data);
      messageCurrentPath();
      break;
    case 'cp':
      await copyFile(data);
      break;
    case 'mv':
      await movedFile(data);
      break;
    case 'rm':
      await removeFile(data);
      messageCurrentPath();
      break;
    case 'os':
      controller(data);
      messageCurrentPath();
      break;
    case 'hash':
      calcHash(data);
      break;
    case '.exit':
      exit(0);
    default:
      messageInvalid();
  }
});

process.on('SIGINT', () => exit(0));

process.on('exit', () => {
  console.log(`Thank you for using File Manager, ${env.userName}, goodbye!`);
});
