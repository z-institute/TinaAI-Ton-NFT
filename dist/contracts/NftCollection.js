"use strict";
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
exports.NftCollection = void 0;
const ton_core_1 = require("ton-core");
const utils_1 = require("../utils");
class NftCollection {
    constructor(collectionData) {
        this.collectionData = collectionData;
    }
    createCodeCell() {
        const NftCollectionCodeBoc = "te6cckECFAEAAh8AART/APSkE/S88sgLAQIBYgkCAgEgBAMAJbyC32omh9IGmf6mpqGC3oahgsQCASAIBQIBIAcGAC209H2omh9IGmf6mpqGAovgngCOAD4AsAAvtdr9qJofSBpn+pqahg2IOhph+mH/SAYQAEO4tdMe1E0PpA0z/U1NQwECRfBNDUMdQw0HHIywcBzxbMyYAgLNDwoCASAMCwA9Ra8ARwIfAFd4AYyMsFWM8WUAT6AhPLaxLMzMlx+wCAIBIA4NABs+QB0yMsCEsoHy//J0IAAtAHIyz/4KM8WyXAgyMsBE/QA9ADLAMmAE59EGOASK3wAOhpgYC42Eit8H0gGADpj+mf9qJofSBpn+pqahhBCDSenKgpQF1HFBuvgoDoQQhUZYBWuEAIZGWCqALnixJ9AQpltQnlj+WfgOeLZMAgfYBwGyi544L5cMiS4ADxgRLgAXGBEuAB8YEYGYHgAkExIREAA8jhXU1DAQNEEwyFAFzxYTyz/MzMzJ7VTgXwSED/LwACwyNAH6QDBBRMhQBc8WE8s/zMzMye1UAKY1cAPUMI43gED0lm+lII4pBqQggQD6vpPywY/egQGTIaBTJbvy9AL6ANQwIlRLMPAGI7qTAqQC3gSSbCHis+YwMlBEQxPIUAXPFhPLP8zMzMntVABgNQLTP1MTu/LhklMTugH6ANQwKBA0WfAGjhIBpENDyFAFzxYTyz/MzMzJ7VSSXwXiN0CayQ==";
        return ton_core_1.Cell.fromBase64(NftCollectionCodeBoc);
    }
    createDataCell() {
        const data = this.collectionData;
        const dataCell = (0, ton_core_1.beginCell)();
        dataCell.storeAddress(data.ownerAddress);
        dataCell.storeUint(data.nextItemIndex, 64);
        const contentCell = (0, ton_core_1.beginCell)();
        const collectionContent = (0, utils_1.encodeOffChainContent)(data.collectionContentUrl);
        const commonContent = (0, ton_core_1.beginCell)();
        commonContent.storeBuffer(Buffer.from(data.commonContentUrl));
        contentCell.storeRef(collectionContent);
        contentCell.storeRef(commonContent.asCell());
        dataCell.storeRef(contentCell);
        const NftItemCodeCell = ton_core_1.Cell.fromBase64("te6cckECDQEAAdAAART/APSkE/S88sgLAQIBYgMCAAmhH5/gBQICzgcEAgEgBgUAHQDyMs/WM8WAc8WzMntVIAA7O1E0NM/+kAg10nCAJp/AfpA1DAQJBAj4DBwWW1tgAgEgCQgAET6RDBwuvLhTYALXDIhxwCSXwPg0NMDAXGwkl8D4PpA+kAx+gAxcdch+gAx+gAw8AIEs44UMGwiNFIyxwXy4ZUB+kDUMBAj8APgBtMf0z+CEF/MPRRSMLqOhzIQN14yQBPgMDQ0NTWCEC/LJqISuuMCXwSED/LwgCwoAcnCCEIt3FzUFyMv/UATPFhAkgEBwgBDIywVQB88WUAX6AhXLahLLH8s/Im6zlFjPFwGRMuIByQH7AAH2UTXHBfLhkfpAIfAB+kDSADH6AIIK+vCAG6EhlFMVoKHeItcLAcMAIJIGoZE24iDC//LhkiGOPoIQBRONkchQCc8WUAvPFnEkSRRURqBwgBDIywVQB88WUAX6AhXLahLLH8s/Im6zlFjPFwGRMuIByQH7ABBHlBAqN1viDACCAo41JvABghDVMnbbEDdEAG1xcIAQyMsFUAfPFlAF+gIVy2oSyx/LPyJus5RYzxcBkTLiAckB+wCTMDI04lUC8ANqhGIu");
        dataCell.storeRef(NftItemCodeCell);
        const royaltyBase = 1000;
        const royaltyFactor = Math.floor(data.royaltyPercent * royaltyBase);
        const royaltyCell = (0, ton_core_1.beginCell)();
        royaltyCell.storeUint(royaltyFactor, 16);
        royaltyCell.storeUint(royaltyBase, 16);
        royaltyCell.storeAddress(data.royaltyAddress);
        dataCell.storeRef(royaltyCell);
        return dataCell.endCell();
    }
    get stateInit() {
        const code = this.createCodeCell();
        const data = this.createDataCell();
        return { code, data };
    }
    get address() {
        return (0, ton_core_1.contractAddress)(0, this.stateInit);
    }
    deploy(wallet) {
        return __awaiter(this, void 0, void 0, function* () {
            const seqno = yield wallet.contract.getSeqno();
            yield wallet.contract.sendTransfer({
                seqno,
                secretKey: wallet.keyPair.secretKey,
                messages: [
                    (0, ton_core_1.internal)({
                        value: "0.05",
                        to: this.address,
                        init: this.stateInit,
                    }),
                ],
                sendMode: ton_core_1.SendMode.PAY_GAS_SEPARATELY + ton_core_1.SendMode.IGNORE_ERRORS,
            });
            return seqno;
        });
    }
    createMintBody(params) {
        const body = (0, ton_core_1.beginCell)();
        body.storeUint(1, 32);
        body.storeUint(params.queryId || 0, 64);
        body.storeUint(params.itemIndex, 64);
        body.storeCoins(params.amount);
        const nftItemContent = (0, ton_core_1.beginCell)();
        nftItemContent.storeAddress(params.itemOwnerAddress);
        const uriContent = (0, ton_core_1.beginCell)();
        uriContent.storeBuffer(Buffer.from(params.commonContentUrl));
        nftItemContent.storeRef(uriContent.endCell());
        body.storeRef(nftItemContent.endCell());
        return body.endCell();
    }
    topUpBalance(wallet, nftAmount) {
        return __awaiter(this, void 0, void 0, function* () {
            const feeAmount = 0.026; // approximate value of fees for 1 transaction in our case
            const seqno = yield wallet.contract.getSeqno();
            const amount = nftAmount * feeAmount;
            yield wallet.contract.sendTransfer({
                seqno,
                secretKey: wallet.keyPair.secretKey,
                messages: [
                    (0, ton_core_1.internal)({
                        value: amount.toString(),
                        to: this.address.toString({ bounceable: false }),
                        body: new ton_core_1.Cell(),
                    }),
                ],
                sendMode: ton_core_1.SendMode.PAY_GAS_SEPARATELY + ton_core_1.SendMode.IGNORE_ERRORS,
            });
            return seqno;
        });
    }
}
exports.NftCollection = NftCollection;
//# sourceMappingURL=NftCollection.js.map