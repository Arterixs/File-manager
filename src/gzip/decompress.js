import { createBrotliDecompress } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { messageCurrentPath, messageFsFailed } from '../helpers.js';
import { checkAbsolutePaths } from '../navigation/helpers.js';

export const decompress = async (data) => {
  const getPath = data.split(/\s/).slice(1);
  const { pathToFile, pathToDesination } = checkAbsolutePaths(getPath);

  const readFile = createReadStream(pathToFile);
  readFile.on('error', () => {
    messageFsFailed();
    messageCurrentPath();
  });
  const zipFile = createBrotliDecompress();
  const writeFile = createWriteStream(pathToDesination);
  writeFile.on('error', () => {
    messageFsFailed();
    messageCurrentPath();
  });
  await pipeline(readFile, zipFile, writeFile);
  messageCurrentPath();
};
