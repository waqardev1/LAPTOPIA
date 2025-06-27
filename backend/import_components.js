import mongoose from 'mongoose';
import fs from 'fs-extra';
import path from 'path';

// === CONFIG ===
const MONGO_URI = 'mongodb://127.0.0.1:27017/laptopia'; // or from .env if you want
const ASSETS_PATH = path.resolve('./src/assets'); // Adjust if needed

// Mapping: folder -> collection/model name
const COMPONENT_MAP = {
  'case': 'Case',
  'CPU': 'Cpu',
  'CPU cooler': 'CpuCooler',
  'GPU': 'Gpu',
  'Motherboard': 'Motherboard',
  'Memory': 'Memory',
  'Storage': 'Storage',
  'Power Supply': 'PowerSupply',
  'Operating System': 'OperatingSystem',
  'Monitor': 'Monitor'
  // Add more if you have more folders!
};

// Helper to create Mongoose model dynamically
function getModel(name) {
  // We use a loose schema for import purposes (accepts any fields)
  const schema = new mongoose.Schema({}, { strict: false });
  return mongoose.models[name] || mongoose.model(name, schema, name.toLowerCase() + 's'); // 'cpus', 'cases', etc
}

// Main import function
async function importAll() {
  await mongoose.connect(MONGO_URI, {});

  for (const [folder, modelName] of Object.entries(COMPONENT_MAP)) {
    // Find .json in this folder
    const folderPath = path.join(ASSETS_PATH, folder);
    if (!(await fs.pathExists(folderPath))) {
      console.log(`[!] Folder not found: ${folderPath}`);
      continue;
    }

    const files = await fs.readdir(folderPath);
    const jsonFiles = files.filter(f => f.endsWith('.json'));

    for (const file of jsonFiles) {
      const filePath = path.join(folderPath, file);
      const rawData = await fs.readFile(filePath, 'utf8');
      let data;
      try {
        data = JSON.parse(rawData);
      } catch (e) {
        console.error(`[!] Invalid JSON in: ${filePath}`);
        continue;
      }
      if (!Array.isArray(data)) {
        // If file contains a single object or has a field, extract array
        if (data && data.data && Array.isArray(data.data)) {
          data = data.data;
        } else if (typeof data === 'object') {
          data = [data];
        } else {
          console.error(`[!] Unexpected format in: ${filePath}`);
          continue;
        }
      }

      const Model = getModel(modelName);
      // Insert many, skip duplicates if any (_id)
      try {
        const inserted = await Model.insertMany(data, { ordered: false });
        console.log(`✅ Imported ${inserted.length} items into ${modelName}`);
      } catch (err) {
        if (err.code === 11000) {
          // Duplicate key error
          console.warn(`[!] Some items already exist in ${modelName}, skipping duplicates`);
        } else {
          console.error(`[!] Error inserting to ${modelName}:`, err.message);
        }
      }
    }
  }

  mongoose.disconnect();
}

importAll().then(() => {
  console.log('All imports done.');
  process.exit(0);
}).catch(err => {
  console.error('Fatal import error:', err);
  process.exit(1);
});
