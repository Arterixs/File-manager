import { readdir } from 'node:fs/promises';
import { env } from 'node:process';
import { homedir } from 'node:os';
import path, { dirname, isAbsolute, sep, normalize } from 'node:path';
import { createObjectFiles, sortedObjectFiles } from './helpers.js';

env.work_directory = homedir();

console.log(`You are currently in ${env.work_directory}`);

export const upWorkingDirectory = () => {
  env.work_directory = dirname(env.work_directory);
};

const checked = async (name, pathUrl) => {
  const files = await readdir(pathUrl, { withFileTypes: true }).catch(
    () => false
  );
  if (name) {
    const isExist = files.some(
      (item) => item.name === name && item.isDirectory()
    );
    const result = isExist ? true : false;
    return result;
  }
  const isResult = files ? true : false;
  return isResult;
};

export const movedNewWorkingDirectory = async (command) => {
  const pathCommand = command.split(/\s/).at(1);
  if (pathCommand) {
    const pathNormal = normalize(pathCommand);
    if (isAbsolute(pathCommand)) {
      const arrDirectory = pathNormal.split(sep).filter((item) => item);
      let pathUrl = path.join(arrDirectory.at(0) + sep);
      const resultCheck = arrDirectory.map((item, indx) => {
        if (indx > 0) {
          const isCheck = checked(item, pathUrl);
          pathUrl = path.join(pathUrl, item);
          return isCheck;
        }
        const isCheck = checked('', pathUrl);
        return isCheck;
      });
      const checkedPromise = await Promise.all(resultCheck);
      if (checkedPromise.every((item) => item)) {
        env.work_directory = pathUrl;
      } else {
        console.log('Invalid absolutli');
      }
    } else {
      const arrDirectory = pathNormal.split(sep);
      let pathUrl = path.join(env.work_directory);
      const resultCheck = arrDirectory.map((item) => {
        const isCheck = checked(item, pathUrl);
        pathUrl = path.join(pathUrl, item);
        return isCheck;
      });
      const checkedPromise = await Promise.all(resultCheck);
      if (checkedPromise.every((item) => item)) {
        env.work_directory = pathUrl;
      } else {
        console.log('Invalid inpu');
      }
    }
  } else {
    console.log('Invalid inp');
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
