import { writeFile } from 'node:fs/promises';
import { env } from 'node:process';
import { messageFsFailed } from '../helpers.js';
import path from 'node:path';

export const createFile = async (data) => {
  const nameFile = data.split(/\s/).slice(1).join(' ');
  const pathCreateFile = path.join(env.work_directory, nameFile);
  await writeFile(pathCreateFile, '', { flag: 'wx' }).catch(messageFsFailed);
};
