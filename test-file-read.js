const fs = require('fs');
const path = require('path');
const crypto = require('node:crypto');

const filePath = path.join(__dirname, 'large_file.bin');

const fileStream = fs.createReadStream(filePath, { highWaterMark: 900 * 1024 * 1024 }

);
const hash = crypto.createHash('sha512');

fileStream.on('data', (chunk) => {
  console.log(Math.floor(chunk.length / (1024 * 1024)));
  hash.update(chunk);
});

fileStream.on('end', () => {
  const hashValue = hash.digest('hex');
  console.log(hashValue);
});

fileStream.on('error', (err) => {
  console.log(err);
});
