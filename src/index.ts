import { execSync } from 'child_process';
import { generateQRCode } from './qr';

// Get DATA_TYPE from environment variables
const dataType = process.env.DATA_TYPE;

let output = '';

// Run the corresponding script based on DATA_TYPE
// switch (dataType) {
//     case 'json':
//         output = execSync('node format/json.js').toString();
//         break;
//     case 'json-encrypted':
//         output = execSync('node format/json-encrypted.js').toString();
//         break;
//     case 'csv':
//         output = execSync('node format/csv.js').toString();
//         break;
//     default:
//         console.error('Invalid DATA_TYPE');
//         process.exit(1);
// }

output = execSync('node dist/formats/json.js').toString();

// Split the output by commas
const data = output.split(',');

// Generate a QR code for each string
data.forEach(async (item) => {
    await generateQRCode(item.trim());
});













// when run, it takes the DATA_TYPE field from environment variables
// it runs the file name with the DATA_TYPE value
// that file name in turn scans for all such FIELD_NAME variables values
// and returns the values in a comma separated string
// each of these comma separated strings are then passed to the qr.ts