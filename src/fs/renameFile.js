import { rename } from 'node:fs/promises';
import { messageFsFailed } from '../helpers.js';
import { env } from 'node:process';
import path from 'node:path';

export const renameFile = async (data) => {
  const validData = data.split(/\s/).splice(1);
  const pathToFile = path.resolve(env.work_directory, validData.at(0));
  const newName = path.resolve(env.work_directory, validData.at(1));
  await rename(pathToFile, newName).catch(messageFsFailed);
};
