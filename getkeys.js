import fs from 'fs';


export function readTextFile(filename) {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    const keys = data.split('\n').filter(line => line.trim());
    fs.writeFileSync(filename, '');
    return keys;
  } catch (err) {
    console.error(`Error reading file: ${filename}`);
    return [];
  }
}
