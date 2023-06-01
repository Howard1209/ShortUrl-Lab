// import express from 'express';
import fs from 'fs';

// const app = express();
const PORT = 8080;

function generateKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const keyLength = 5;
  let key = '';
  for (let i = 0; i < keyLength; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    key += chars.charAt(randomIndex);
  }
  
  return key;
}
function writeKeyToFile(key) {
  fs.appendFile('keys.txt', key + '\n', (err) => {
    if (err) {
      console.error('Error writing key to file:', err);
    } else {
      console.log('Key written to file successfully');
    }
  });
}

function generateKeysIfNeeded() {
  const filecontent = fs.readFileSync('keys.txt', 'utf8');
  if (!filecontent.length > 0) {
    const keyNumber = 2000;
    for (let i = 0; i < keyNumber; i++) {
      const key = generateKey();
      writeKeyToFile(key);    
    }
  }
}

function startGeneratingKeys() {
  setInterval(generateKeysIfNeeded, 500); // Run every 1 second
}

startGeneratingKeys();


// app.listen(PORT, () => console.log(`Server is running on localhost:${PORT}`));
