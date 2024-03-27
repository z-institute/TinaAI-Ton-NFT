"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const csv_parser_1 = __importDefault(require("csv-parser"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
// Function to convert a single CSV row to the desired JSON format
function convertToJSON(row, rowNumber) {
    const jsonData = {
        name: row.name,
        description: "Just another cute AI girl >//<",
        attributes: [
            { trait_type: "MBTI", value: row.MBTI },
            { trait_type: "Career", value: row.career },
            { trait_type: "Age", value: row.age },
        ],
    };
    const filePath = path_1.default.join(__dirname, `../data/metadata/${rowNumber}.json`);
    (0, fs_1.writeFileSync)(filePath, JSON.stringify(jsonData, null, 2));
}
// Main function to process the CSV and generate JSON files
function processCSV(filePath) {
    const results = [];
    let rowNumber = 0;
    (0, fs_1.createReadStream)(filePath)
        .pipe((0, csv_parser_1.default)())
        .on("data", (data) => {
        convertToJSON(data, rowNumber);
        rowNumber++; // Increment row number for each row processed
    })
        .on("end", () => {
        results.forEach(convertToJSON);
        console.log("Finished generating JSON files.");
    });
}
const csvFilePath = path_1.default.resolve(__dirname + "/../src/", "girlfriendInfo.csv");
processCSV(csvFilePath);
//# sourceMappingURL=parseCsv.js.map