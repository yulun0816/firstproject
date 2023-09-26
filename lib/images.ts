import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'public/images');

export function getSortedImageFile(folder: string) {
  const fileNames = fs.readdirSync(`${postsDirectory}${folder ? '\\' + folder : ''}`);
  return fileNames;
}
