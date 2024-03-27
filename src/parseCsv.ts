import csv from "csv-parser";
import fs from "fs";
import path from "path";

import { createReadStream, writeFileSync } from "fs";

interface CSVRow {
  name: string;
  MBTI: string;
  career: string;
  age: string;
}

// Function to convert a single CSV row to the desired JSON format
function convertToJSON(row: CSVRow, rowNumber: number): void {
  const jsonData = {
    name: row.name,
    description: "Just another cute AI girl >//<",
    attributes: [
      { trait_type: "MBTI", value: row.MBTI },
      { trait_type: "Career", value: row.career },
      { trait_type: "Age", value: row.age },
    ],
  };

  const filePath = path.join(__dirname, `../data/metadata/${rowNumber}.json`);
  writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
}

// Main function to process the CSV and generate JSON files
function processCSV(filePath: string): void {
  const results: CSVRow[] = [];
  let rowNumber = 0;
  createReadStream(filePath)
    .pipe(csv())
    .on("data", (data: CSVRow) => {
      convertToJSON(data, rowNumber);
      rowNumber++; // Increment row number for each row processed
    })
    .on("end", () => {
      results.forEach(convertToJSON);
      console.log("Finished generating JSON files.");
    });
}

const csvFilePath = path.resolve(__dirname + "/../src/", "girlfriendInfo.csv");
processCSV(csvFilePath);
