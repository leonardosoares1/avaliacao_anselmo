import path from 'node:path';

function getRootPath(): string {
  return path.resolve(__dirname, '..', '..');
}

export default getRootPath;
