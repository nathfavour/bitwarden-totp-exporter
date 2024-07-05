import fs from 'fs';
import path from 'path';

export function extractValuesFromJson(filePath: string, fieldName: string): string {
    const absolutePath = path.resolve(filePath);
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);
    const values = jsonData.map((item: any) => item[fieldName]).filter((value: any) => value !== undefined);
    return values.join(',');
}

if (require.main === module) {
    const filePath = process.env.FILE_PATH;
    const fieldName = process.env.FIELD_NAME;
    if (!filePath || !fieldName) {
        console.error('Please provide a file path and set the FIELD_NAME environment variable.');
        process.exit(1);
    }
    const result = extractValuesFromJson(filePath, fieldName);
    console.log(result);
}