const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const readline = require('readline');

// Step 1: Parse command line argument for the JSON file path
const filePath = process.argv[2];


// Create a read stream and line reader
const fileStream = fs.createReadStream(filePath);
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});


const totps = [];


// Step 2: Read JSON file line by line
rl.on('line', (line) => {
    // Use regex to find "totp" values
    const match = line.match(/"totp"\s*:\s*"(.+?)"/);
    if (match) {
        totps.push(match[1]);
    }
});




rl.on('close', () => {
    // Step 5: Generate random file name
    const randomFileName = path.join(path.dirname(filePath), `${Math.random().toString(36).substring(2, 15)}.txt`);

    // Step 6: Write TOTP values to file
    fs.writeFile(randomFileName, totps.join('\n'), (err) => {
        if (err) {
            console.error('Error writing TOTP values to file:', err);
            return;
        }

        // Step 7: Execute script.js with each TOTP value
        totps.forEach((totp, index) => {
            exec(`node script.js "${totp}"`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                }

                // Check if it's the last TOTP value to inform completion
                if (index === totps.length - 1) {
                    console.log('All scripts executed successfully.');
                }
            });
        });
    });
});

















// // Step 2: Read JSON file
// fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//         console.error('Error reading the file:', err);
//         return;
//     }

//     // Step 3: Parse JSON content
//     const json = JSON.parse(data);

//     // Step 4: Extract TOTP entries
//     const totps = json.filter(entry => entry.totp).map(entry => entry.totp);

//     // Step 5: Generate random file name
//     const randomFileName = path.join(path.dirname(filePath), `${Math.random().toString(36).substring(2, 15)}.txt`);

//     // Step 6: Write TOTP values to file
//     fs.writeFile(randomFileName, totps.join('\n'), (err) => {
//         if (err) {
//             console.error('Error writing TOTP values to file:', err);
//             return;
//         }

//         // Step 7: Execute script.js with each TOTP value
//         totps.forEach((totp, index) => {
//             exec(`node script.js "${totp}"`, (error, stdout, stderr) => {
//                 if (error) {
//                     console.error(`exec error: ${error}`);
//                     return;
//                 }
//                 console.log(`stdout: ${stdout}`);
//                 if (stderr) {
//                     console.error(`stderr: ${stderr}`);
//                 }

//                 // Check if it's the last TOTP value to inform completion
//                 if (index === totps.length - 1) {
//                     console.log('All scripts executed successfully.');
//                 }
//             });
//         });
//     });
// });