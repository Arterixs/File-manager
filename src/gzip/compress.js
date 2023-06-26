import { createBrotliCompress } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { messageCurrentPath, messageFsFailed } from '../helpers.js';
import { env } from 'node:process';
import path from 'node:path';

export const compress = async (data) => {
  const getPath = data.split(/\s/).slice(1);
  const pathToFile = path.resolve(env.work_directory, getPath.at(0));
  const pathToDesination = path.resolve(env.work_directory, getPath.at(1));
  const readFile = createReadStream(pathToFile);
  readFile.on('error', () => {
    messageFsFailed();
    messageCurrentPath();
  });
  const zipFile = createBrotliCompress();
  const writeFile = createWriteStream(pathToDesination);
  writeFile.on('error', () => {
    messageFsFailed();
    messageCurrentPath();
  });
  await pipeline(readFile, zipFile, writeFile);
  messageCurrentPath();
};
