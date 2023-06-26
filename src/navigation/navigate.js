import { readdir } from 'node:fs/promises';
import { env } from 'node:process';
import { homedir } from 'node:os';
import { dirname, isAbsolute } from 'node:path';
import {
  createObjectFiles,
  sortedObjectFiles,
  normalizationPath,
  shiftWorkingDirectory,
} from './helpers.js';

env.work_directory = homedir();

console.log(`You are currently in ${env.work_directory}`);

export const upWorkingDirectory = () => {
  env.work_directory = dirname(env.work_directory);
};

export const movedNewWorkingDirectory = async (command) => {
  try {
    const pathNormal = normalizationPath(command);
    await shiftWorkingDirectory(pathNormal, isAbsolute(pathNormal));
  } catch (err) {
    console.log('Operation failed');
  }
};

export const listFiles = async () => {
  try {
    const files = await readdir(env.work_directory, { withFileTypes: true });
    const getArrObjectFile = files.map(createObjectFiles);
    const listFilesTable = await Promise.all(getArrObjectFile);
    listFilesTable.sort(sortedObjectFiles);
    console.table(listFilesTable);
  } catch (err) {
    console.error(err);
  }
};
