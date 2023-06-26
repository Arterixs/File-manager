import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { messageFsFailed, messageCurrentPath } from '../helpers.js';
import { env } from 'node:process';
import path from 'node:path';

export const calcHash = (data) => {
  const getPath = data.split(/\s/).slice(1);
  const pathToFile = path.resolve(env.work_directory, getPath.at(0));
  const readFile = createReadStream(pathToFile, { encoding: 'utf8' });
  const hash = createHash('sha256');
  readFile.on('data', (chunk) => {
    hash.update(chunk);
  });
  readFile.on('error', (err) => {
    messageFsFailed();
    messageCurrentPath();
  });
  readFile.on('end', () => {
    console.log(hash.digest('hex'));
    messageCurrentPath();
  });
};
