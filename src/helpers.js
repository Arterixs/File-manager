import { env } from 'node:process';

export const messageCurrentPath = () =>
  console.log(`You are currently in ${env.work_directory}`);
