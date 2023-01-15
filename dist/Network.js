"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
class Network {
    constructor(provider) {
        this.provider = provider;
        this.name = "";
        this.symbol = "";
        this.id = Number(this.provider.provider.chainId);
        this.getChainById();
    }
    getChainById() {
        if (!this.id)
            return;
        if (this.id === types_1.CHAINS.ETH.id) {
            this.update(types_1.CHAINS.ETH);
        }
        if (this.id === types_1.CHAINS.BSC.id) {
            this.update(types_1.CHAINS.BSC);
        }
        if (this.id === types_1.CHAINS.RINKEBY.id) {
            this.update(types_1.CHAINS.RINKEBY);
            console.warn("RINKEBY TEST NETWORK DETECTED.");
        }
        if (this.id === types_1.CHAINS.FTM.id) {
            this.update(types_1.CHAINS.FTM);
        }
        if (this.id === types_1.CHAINS.POLYGON.id) {
            this.update(types_1.CHAINS.POLYGON);
        }
        if (this.id === types_1.CHAINS.AVALANCHE.id) {
            this.update(types_1.CHAINS.AVALANCHE);
        }
        if (this.id === types_1.CHAINS.ARBITRUM.id) {
            this.update(types_1.CHAINS.ARBITRUM);
        }
        return;
    }
    update(chain) {
        this.name = chain.name;
        this.symbol = chain.symbol;
    }
    getNetwork() {
        return {
            name: this.name,
            symbol: this.symbol,
        };
    }
}
exports.default = Network;
