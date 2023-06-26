import path, { normalize, sep } from 'node:path';
import { env } from 'node:process';
import { readdir } from 'node:fs/promises';
import { messageFsFailed } from '../helpers.js';

export const createObjectFiles = async (item) => {
  const type = item.isDirectory() ? 'directory' : 'file';
  return { Name: item.name, Type: type };
};

export const sortedObjectFiles = (a, b) =>
  a.Type.localeCompare(b.Type) ||
  a.Name.toLowerCase().localeCompare(b.Name.toLowerCase());

export const normalizationPath = (path) => {
  const pathCommand = path.split(/\s/).slice(1).join(' ');
  const pathNormal = normalize(pathCommand);
  return pathNormal;
};

const checkFiles = async (name, pathUrl) => {
  const files = await readdir(pathUrl, { withFileTypes: true }).catch(
    () => false
  );
  const filesExist = files ? true : false;
  if (name) {
    const isExistDir = files.some(
      (item) => item.name === name && item.isDirectory()
    );
    return isExistDir;
  }
  return filesExist;
};

export const checkedFilesInDir = (arrPaths, isAbsPath) => {
  let pathUrl = path.join(
    isAbsPath ? `${arrPaths.at(0)}${sep}` : env.work_directory
  );
  const isCheckFile = arrPaths.map((item, indx) => {
    const isAbsDir = isAbsPath && indx === 0;
    const isCheck = isAbsDir
      ? checkFiles('', pathUrl)
      : checkFiles(item, pathUrl);
    if (!isAbsDir) {
      pathUrl = path.join(pathUrl, item);
    }
    return isCheck;
  });
  return { isCheckFile, pathUrl };
};

export const shiftWorkingDirectory = async (pathNormal, isAbsPath) => {
  const arrClearPaths = pathNormal.split(sep).filter((item) => item);
  const { isCheckFile, pathUrl } = checkedFilesInDir(arrClearPaths, isAbsPath);
  const startPromiseCorrectPath = await Promise.all(isCheckFile);
  const isCorrectPath = startPromiseCorrectPath.every((item) => item);
  if (isCorrectPath) {
    env.work_directory = pathUrl;
  } else {
    messageFsFailed();
  }
};
