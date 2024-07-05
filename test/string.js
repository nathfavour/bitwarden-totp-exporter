const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const readline = require('readline');

// Utility function to generate a random string for file names
function generateRandomString(length = 6) {
  return Math.random().toString(20).substr(2, length);
}

// Utility function to check if a file exists
async function fileExists(filePath) {
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
    return true;
  } catch (e) {
    return false;
  }
}

async function saveQRCode(data) {
  const base64Data = data.replace(/^data:image\/png;base64,/, "");
  let fileName = generateRandomString() + '.png';
  let filePath = path.join(__dirname, 'out', fileName);

  // Ensure 'out' directory exists
  if (!fs.existsSync(path.join(__dirname, 'out'))) {
    fs.mkdirSync(path.join(__dirname, 'out'));
  }

  // Check if file exists and generate a new name if it does
  while (await fileExists(filePath)) {
    fileName = generateRandomString() + '.png';
    filePath = path.join(__dirname, 'out', fileName);
  }

  // Save the QR code to a file
  fs.writeFile(filePath, base64Data, 'base64', function(err) {
    if (err) console.log(err);
    else console.log(`QR Code saved as ${fileName}`);
  });
}

// Function to process a single data string
function processString(data) {
  QRCode.toDataURL(data, function (err, url) {
    if (err) throw err;
    saveQRCode(url);
  });
}

// Main function to handle command line arguments
function main() {
  const args = process.argv.slice(2);
  if (args[0] === '-f' && args[1]) {
    const filePath = args[1];
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      processString(line);
    });
  } else {
    const data = args[0];
    processString(data);
  }
}

main();