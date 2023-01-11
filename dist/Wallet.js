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
const ethers_1 = require("ethers");
class Wallet {
    constructor(provider) {
        this.provider = provider;
        this.address = "";
        this.balance = "0.00";
        this.getAddress = () => {
            const { provider } = this.provider;
            this.address = provider.isMetaMask
                ? provider.selectedAddress
                : provider.accounts[0];
        };
        this.getAddress();
    }
    requestBalance() {
        return __awaiter(this, void 0, void 0, function* () {
            const balanceHex = yield this.provider.getBalance(this.address);
            this.balance = ethers_1.ethers.utils.formatUnits(balanceHex.toString());
        });
    }
    getWallet() {
        return {
            address: this.address,
            balance: this.balance,
        };
    }
}
exports.default = Wallet;
