"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const utils_1 = require("./utils");
const metadata_1 = require("./metadata");
dotenv.config();
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const metadataFolderPath = "./data/metadata/";
        const imagesFolderPath = "./data/images/";
        const wallet = yield (0, utils_1.openWallet)(process.env.MNEMONIC.split(" "), true);
        console.log("Started uploading images to IPFS...");
        const imagesIpfsHash = yield (0, metadata_1.uploadFolderToIPFS)(imagesFolderPath);
        console.log(`Successfully uploaded the pictures to ipfs: https://gateway.pinata.cloud/ipfs/${imagesIpfsHash}`);
        // sleep for a little
        yield new Promise((resolve) => setTimeout(resolve, 5000));
        console.log("Started uploading metadata files to IPFS...");
        yield (0, metadata_1.updateMetadataFiles)(metadataFolderPath, imagesIpfsHash);
        const metadataIpfsHash = yield (0, metadata_1.uploadFolderToIPFS)(metadataFolderPath);
        console.log(`Successfully uploaded the metadata to ipfs: https://gateway.pinata.cloud/ipfs/${metadataIpfsHash}`);
    });
}
void init();
//# sourceMappingURL=app.js.map