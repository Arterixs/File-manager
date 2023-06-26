import { rm } from 'node:fs/promises';
import { env } from 'node:process';
import { messageFsFailed } from '../helpers.js';
import path from 'node:path';

export const removeFile = async (data) => {
  const separateData = data.split(/\s/).slice(1).at(0);
  const pathToFile = path.resolve(env.work_directory, separateData);
  await rm(pathToFile).catch(messageFsFailed);
};
