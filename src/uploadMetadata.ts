import * as dotenv from "dotenv";

import { openWallet } from "./utils";
import { readdir } from "fs/promises";
import { updateMetadataFiles, uploadFolderToIPFS } from "./metadata";

dotenv.config();

async function init() {
  const metadataFolderPath = "./data/metadata/";
  const imagesFolderPath = "./data/images/";

  const wallet = await openWallet(process.env.MNEMONIC!.split(" "), true);

  const metadataIpfsHash = await uploadFolderToIPFS(metadataFolderPath);
  console.log(
    `Successfully uploaded the metadata to ipfs: https://gateway.pinata.cloud/ipfs/${metadataIpfsHash}`
  );
}

void init();
