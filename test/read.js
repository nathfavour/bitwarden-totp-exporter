const Jimp = require('jimp');
const jsQR = require('jsqr');

async function readQRCode(filePath) {
  try {
    const image = await Jimp.read(filePath);
    const { width, height, data } = image.bitmap;
    const qrCodeImageData = new Uint8ClampedArray(data.buffer);
    const qrCode = jsQR(qrCodeImageData, width, height);

    if (qrCode) {
      console.log('QR Code Text:', qrCode.data);
    } else {
      console.log('No QR code found.');
    }
  } catch (error) {
    console.error('Failed to read QR code:', error);
  }
}

// Get the path from the command line arguments
const filePath = process.argv[2];

if (!filePath) {
  console.log('Usage: node script.js <path_to_qr_code_image>');
  process.exit(1);
}

// Example usage with CLI-provided path
readQRCode(filePath);