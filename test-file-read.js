const fs = require('fs');
const path = require('path');
const crypto = require('node:crypto');

const filePath = path.join(__dirname, 'large_file.bin');

console.log('dbg: Creating file stream');
const fileStream = fs.createReadStream(filePath);

console.log('dbg: Creating hash object');
const hash = crypto.createHash('sha512');
const hash1 = crypto.createHash('sha512');
const hash2 = crypto.createHash('sha512');
const hash3 = crypto.createHash('sha512');
const hash4 = crypto.createHash('sha512');
const hash5 = crypto.createHash('sha512');
const hash6 = crypto.createHash('sha512');
const hash7 = crypto.createHash('sha512');
const hash8 = crypto.createHash('sha512');
const hash9 = crypto.createHash('sha512');
const hash10 = crypto.createHash('sha512');

fileStream.on('data', (chunk) => {
  console.log('dbg: Reading chunk of size', Math.floor(chunk.length / (1024 * 1024)), 'MB');
  hash.update(chunk);
  hash1.update(chunk + "1");
  hash2.update(chunk + "2");
  hash3.update(chunk + "3");
  hash4.update(chunk + "4");
  hash5.update(chunk + "5");
  hash6.update(chunk + "6");
  hash7.update(chunk + "7");
  hash8.update(chunk + "8");
  hash9.update(chunk + "9");
  hash10.update(chunk + "10");
  console.log('dbg: Updated hash with chunk');
});

fileStream.on('end', () => {
  console.log('dbg: File read completed');
  const hashValue = hash.digest('hex');
  console.log("Hash1:", hash1.digest('hex'));
  console.log("Hash2:", hash2.digest('hex'));
  console.log("Hash3:", hash3.digest('hex'));
  console.log("Hash4:", hash4.digest('hex'));
  console.log("Hash5:", hash5.digest('hex'));
  console.log("Hash6:", hash6.digest('hex'));
  console.log("Hash7:", hash7.digest('hex'));
  console.log("Hash8:", hash8.digest('hex'));
  console.log("Hash9:", hash9.digest('hex'));
  console.log("Hash10:", hash10.digest('hex'));
  console.log('dbg: Hash computed');
  console.log('Hash Value:', hashValue);
});

fileStream.on('error', (err) => {
  console.log('dbg: Error occurred');
  console.error(err);
});
