const fs = require('fs');
const path = require('path');
const crypto = require('node:crypto');

const filePath = path.join(__dirname, 'large_file.bin');

console.log('dbg: Creating file stream');
const fileStream = fs.createReadStream(filePath, //{ highWaterMark: 900 * 1024 * 1024 }

);

console.log('dbg: Creating hash object');
const hash = crypto.createHash('sha512');

fileStream.on('data', (chunk) => {
  console.log('dbg: Reading chunk of size', Math.floor(chunk.length / (1024 * 1024)), 'MB');
  hash.update(chunk);
  console.log('dbg: Updated hash with chunk');
});

fileStream.on('end', () => {
  console.log('dbg: File read completed');
  const hashValue = hash.digest('hex');
  console.log('dbg: Hash computed');
  console.log('Hash Value:', hashValue);
});

fileStream.on('error', (err) => {
  console.log('dbg: Error occurred');
  console.error(err);
});
