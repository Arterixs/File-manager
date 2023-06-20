import { readdir, stat } from 'node:fs/promises';
import { env } from 'node:process';
import { homedir } from 'node:os';
import path, { dirname } from 'node:path';

env.work_directory = homedir();

console.log(`You are currently in ${env.work_directory}`);

export const updateWorkingDirectory = () => {
  env.work_directory = dirname(env.work_directory);
};

export const listFiles = async () => {
  try {
    const files = await readdir(env.work_directory);
    const getArrObjectFile = files.map(async (item) => {
      const pathUrl = path.join(env.work_directory, item);
      const pathItem = await stat(pathUrl);
      const type = pathItem.isDirectory() ? 'directory' : 'file';
      return { Name: item, Type: type };
    });
    const listFilesTable = await Promise.all(getArrObjectFile);
    listFilesTable.sort(
      (a, b) =>
        a.Type.localeCompare(b.Type) ||
        a.Name.toLowerCase().localeCompare(b.Name.toLowerCase())
    );
    console.table(listFilesTable);
  } catch (err) {
    console.error(err);
  }
};
