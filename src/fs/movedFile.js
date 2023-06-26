import { createReadStream, createWriteStream } from 'node:fs';
import { rm } from 'node:fs/promises';
import { env } from 'node:process';
import { messageFsFailed, messageCurrentPath } from '../helpers.js';
import { getNameFile } from './helpers.js';
import path from 'node:path';

export const movedFile = async (data) => {
  const getPath = data.split(/\s/).slice(1);
  const pathToFile = path.resolve(env.work_directory, getPath.at(0));
  const nameFile = getNameFile(pathToFile);
  const pathToDirectory = path.resolve(
    env.work_directory,
    getPath.at(1),
    nameFile
  );
  const readFile = createReadStream(pathToFile, { encoding: 'utf8' });
  const writeFile = createWriteStream(pathToDirectory, { flags: 'wx' });
  readFile.on('data', (chunk) => {
    writeFile.write(chunk);
  });
  writeFile.on('error', messageFsFailed);
  readFile.on('error', messageFsFailed);
  readFile.on('end', async () => {
    await rm(pathToFile).catch(messageFsFailed);
    messageCurrentPath();
  });
};
