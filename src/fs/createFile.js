import { writeFile } from 'node:fs/promises';
import { env } from 'node:process';
import { messageFsFailed } from '../helpers.js';
import { checkAbsolutePath } from '../navigation/helpers.js';
import path from 'node:path';

export const createFile = async (data) => {
  const { isAbsolutePath, normalPath } = checkAbsolutePath(data);
  const pathCreateFile = isAbsolutePath
    ? path.join(normalPath)
    : path.join(env.work_directory, normalPath);
  await writeFile(pathCreateFile, '', { flag: 'wx' }).catch(messageFsFailed);
};
