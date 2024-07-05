// declare module 'yargs/yargs';

import * as QRCode from 'qrcode';
import * as fs from 'fs';
// import * as yargs from 'yargs/yargs';

// import yargs from 'yargs/yargs';
import { Arguments } from 'yargs';
import yargs from 'yargs/yargs';

import * as crypto from 'crypto';
import { hideBin } from 'yargs/helpers';

let save = process.env.OUTPUT_DIR || '0';

// const argv = yargs(hideBin(process.argv)).argv;
const argv = yargs(hideBin(process.argv)).argv as Arguments;

async function generateQRCode(text: string ) {
    try {
        const qr = await QRCode.toString(text);
        console.log(qr);

        if (save !== '0') {
            let filename;
            do {
                filename = crypto.randomBytes(10).toString('hex') + '.png';
            } while (fs.existsSync(save + '/' + filename));
            const qrPng = await QRCode.toDataURL(text);
            const base64Image = qrPng.split(';base64,').pop();
            if (base64Image) {
                fs.writeFileSync(save + '/' + filename, base64Image, {encoding: 'base64'});
              } else {
                console.error('base64Image is undefined');
              }
                    }
    } catch (err) {
        console.error(err);
    }
}

if (argv._.length > 0) {
    generateQRCode(argv._[0] as string);
}

export { generateQRCode };