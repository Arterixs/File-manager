import { createReadStream } from 'node:fs';
import path from 'node:path';
import { env } from 'node:process';
import { EOL } from 'node:os';
import { messageCurrentPath, messageFsFailed } from '../helpers.js';

export const readFile = async (data) => {
  const getPath = data.split(/\s/).slice(1).join(' ');
  const pathReadFile = path.resolve(env.work_directory, getPath);
  const readFile = createReadStream(pathReadFile, { encoding: 'utf8' });
  readFile.on('data', (chunk) => console.log(`${EOL}${chunk}${EOL}`));
  readFile.on('error', messageFsFailed);
  readFile.on('end', messageCurrentPath);
};
