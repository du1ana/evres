const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');

// Get the total memory in bytes
const totalMemoryBytes = os.totalmem() + Math.floor(os.totalmem() / 1000);

// Define the file path
const filePath = path.join(__dirname, 'large_file.bin');

let writtenBytes = 0;

// Function to write the buffer to the file
function writeToFile(fd) {
  if (writtenBytes >= totalMemoryBytes) {
    console.log('File writing completed.');
    return;
  }

  // Calculate the remaining bytes to write
  const remainingBytes = totalMemoryBytes - writtenBytes;
  const bytesToWrite = Math.min(remainingBytes, 1024 * 1024); // 1 MB at a time

  // Create a buffer filled with random data
  const buffer = crypto.randomBytes(bytesToWrite);

  // Write the buffer to the file
  fs.write(fd, buffer, 0, bytesToWrite, writtenBytes, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return;
    }
    writtenBytes += bytesToWrite;
    console.log(`Written ${writtenBytes} bytes so far...`);
    writeToFile(fd);
  });
}

// Open the file for writing
fs.open(filePath, 'w', (err, fd) => {
  if (err) {
    console.error('Error opening file:', err);
    return;
  }
  writeToFile(fd);
});

