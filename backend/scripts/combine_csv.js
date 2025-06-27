import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';

const folderPath = 'C:/Users/Administrator/Desktop/laptopia/src/assets/CPU/AMD';
const outputCsv = 'C:/Users/Administrator/Desktop/laptopia/src/assets/CPU/AMD/combined.csv';

const allRows = [];
let headerSet = false;
let headers = [];

fs.readdir(folderPath, (err, files) => {
  if (err) throw err;

  // Only process .csv files
  const csvFiles = files.filter(f => f.endsWith('.csv'));
  let filesProcessed = 0;

  csvFiles.forEach((file, idx) => {
    const filePath = path.join(folderPath, file);
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('headers', (csvHeaders) => {
        if (!headerSet) {
          headers = csvHeaders;
          headerSet = true;
        }
      })
      .on('data', (row) => {
        allRows.push(row);
      })
      .on('end', () => {
        filesProcessed++;
        if (filesProcessed === csvFiles.length) {
          // All files processed, now write combined CSV
          const csvWriter = createObjectCsvWriter({
            path: outputCsv,
            header: headers.map(h => ({ id: h, title: h }))
          });
          csvWriter.writeRecords(allRows).then(() => {
            console.log('✅ All CSVs combined into:', outputCsv);
          });
        }
      });
  });
});
