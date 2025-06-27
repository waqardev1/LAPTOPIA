import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Edit these as needed
const inputCsv = path.join(__dirname, "../../src/assets/CPU/AMD/filtered_cpu.csv");
const outputCsv = path.join(__dirname, "../../src/assets/CPU/AMD/filtered_cpu_with_manufacturer.csv");
const manufacturer = "AMD";

// Read the CSV
const lines = fs.readFileSync(inputCsv, "utf-8").split("\n");

// Add manufacturer to header
const header = lines[0].trim().replace(/\r$/, "") + ",manufacturer";
const dataLines = lines.slice(1).filter(Boolean);

// Add manufacturer to each data row
const updatedLines = dataLines.map(line => {
  // Avoid double-appending if script re-run
  if (line.endsWith(",AMD")) return line;
  return line.trim().replace(/\r$/, "") + "," + manufacturer;
});

// Combine header + rows
const output = [header, ...updatedLines].join("\n");

// Write to new CSV
fs.writeFileSync(outputCsv, output, "utf-8");
console.log("Done! New file saved as:", outputCsv);
