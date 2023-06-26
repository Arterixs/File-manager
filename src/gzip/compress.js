import { createBrotliCompress } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { messageCurrentPath, messageFsFailed } from '../helpers.js';
import { env } from 'node:process';
import path, { normalize, isAbsolute } from 'node:path';

export const compress = async (data) => {
  const getPath = data.split(/\s/).slice(1);
  const arrInfoPath = getPath.reduce((acc, item) => {
    const obj = {};
    obj.path = normalize(item);
    obj.abs = isAbsolute(obj.path);
    acc.push(obj);
    return acc;
  }, []);

  const pathToFile = arrInfoPath[0].abs
    ? path.resolve(arrInfoPath[0].path)
    : path.resolve(env.work_directory, arrInfoPath[0].path);
  const pathToDesination = arrInfoPath[1].abs
    ? path.resolve(arrInfoPath[1].path)
    : path.resolve(env.work_directory, arrInfoPath[1].path);

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
