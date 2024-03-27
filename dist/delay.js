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
exports.sleep = exports.waitSeqno = void 0;
function waitSeqno(seqno, wallet) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let attempt = 0; attempt < 10; attempt++) {
            yield sleep(2000);
            const seqnoAfter = yield wallet.contract.getSeqno();
            if (seqnoAfter == seqno + 1)
                break;
        }
    });
}
exports.waitSeqno = waitSeqno;
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.sleep = sleep;
//# sourceMappingURL=delay.js.map