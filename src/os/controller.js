import { messageInvalid } from '../helpers.js';
import { getEol } from './getEol.js';
import { getHomedir } from './getHomedir.js';
import { getInfoProccesor } from './getInfoProccesor.js';
import { getUsername } from './getUsername.js';
import { getArchitect } from './getArchitect.js';

export const controller = (data) => {
  const command = data.split(/\s/).at(1)?.slice(2);
  switch (command) {
    case 'EOL':
      getEol();
      break;
    case 'cpus':
      getInfoProccesor();
      break;
    case 'homedir':
      getHomedir();
      break;
    case 'username':
      getUsername();
      break;
    case 'architecture':
      getArchitect();
      break;
    default:
      messageInvalid();
  }
};
