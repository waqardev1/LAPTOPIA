// File: backend/scripts/filter_cpu_csv.js

import fs from "fs";
import csv from "csv-parser";
import { createObjectCsvWriter } from "csv-writer";

// Columns to keep (update if needed)
const COLUMNS = [
  "Name",
  "Family",
  "Series",
  "# of CPU Cores",
  "# of Threads",
  "Base Clock",
  "Max. Boost Clock",
  "L3 Cache",
  "Default TDP",
  "CPU Socket",
  "Graphics Model",
  "Graphics Core Count",
  "Launch Date"
];

// Path to your combined CPU CSV
const inputFile = "C:/Users/Administrator/Desktop/laptopia/src/assets/CPU/AMD/combined.csv";
// Output file (filtered)
const outputFile = "C:/Users/Administrator/Desktop/laptopia/src/assets/CPU/AMD/filtered_cpu.csv";

// Remove potential BOM and fix headers
function cleanHeader(header) {
  return header.replace(/(^\uFEFF|"+|^\s+|\s+$)/g, "");
}

const rows = [];

fs.createReadStream(inputFile)
  .pipe(csv())
  .on("data", (row) => {
    // Create a new object with only the selected columns
    const filteredRow = {};
    for (const col of COLUMNS) {
      // Try both cleaned and raw header
      filteredRow[col] = row[col] || row[cleanHeader(col)] || "";
    }
    rows.push(filteredRow);
  })
  .on("end", () => {
    // Write filtered rows to CSV
    const csvWriter = createObjectCsvWriter({
      path: outputFile,
      header: COLUMNS.map((c) => ({ id: c, title: c })),
    });
    csvWriter
      .writeRecords(rows)
      .then(() =>
        console.log(`✅ Filtered CSV saved as: ${outputFile}\nTotal rows: ${rows.length}`)
      );
  });
