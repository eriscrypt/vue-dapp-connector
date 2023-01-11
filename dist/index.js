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
exports.Connector = exports.EVENTS = void 0;
const vue_1 = require("vue");
const web3modal_1 = require("web3modal");
const ethers_1 = require("ethers");
const types_1 = require("./types");
const Wallet_1 = require("./Wallet");
const Network_1 = require("./Network");
var EVENTS;
(function (EVENTS) {
    EVENTS["CHAIN_CHANGED"] = "chain-changed";
    EVENTS["ACCOUNTS_CHANGED"] = "accounts-changed";
    EVENTS["DISCONNECTED"] = "disconnected";
    EVENTS["UPDATED"] = "updated";
})(EVENTS = exports.EVENTS || (exports.EVENTS = {}));
class Connector {
    constructor() {
        this.isAuthenticated = (0, vue_1.ref)(false);
        this.authenticate = () => __awaiter(this, void 0, void 0, function* () {
            if (this.modal.cachedProvider)
                return yield this.connect();
            return null;
        });
        this.connect = () => __awaiter(this, void 0, void 0, function* () {
            this.instance = yield this.modal.connect();
            this.isAuthenticated.value = true;
            yield this.init();
            this.registerEvents();
            return this.generateDetail();
        });
        this.on = (event, callback) => {
            window.addEventListener(event, (e) => {
                callback(e.detail);
            });
        };
        this.registerEvents = () => {
            this.provider.provider.on("chainChanged", () => __awaiter(this, void 0, void 0, function* () {
                yield this.update();
                return window.dispatchEvent(yield this.generateEventDetail(EVENTS.CHAIN_CHANGED));
            }));
            this.provider.provider.on("accountsChanged", (accounts) => __awaiter(this, void 0, void 0, function* () {
                if (!accounts.length) {
                    return yield this.disconnect();
                }
                else {
                    yield this.update();
                    return window.dispatchEvent(yield this.generateEventDetail(EVENTS.ACCOUNTS_CHANGED));
                }
            }));
            this.provider.provider.on("disconnect", () => __awaiter(this, void 0, void 0, function* () {
                return yield this.disconnect();
            }));
        };
        this.init = () => __awaiter(this, void 0, void 0, function* () {
            this.provider = yield this.getProvider();
            this.walletService = new Wallet_1.default(this.provider);
            this.networkService = new Network_1.default(this.provider);
            return yield this.walletService.requestBalance();
        });
        this.update = () => __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            return window.dispatchEvent(yield this.generateEventDetail(EVENTS.UPDATED));
        });
        this.getProvider = () => {
            return new ethers_1.ethers.providers.Web3Provider(this.instance);
        };
        this.generateEventDetail = (eventName, needDetail = true) => __awaiter(this, void 0, void 0, function* () {
            return new CustomEvent(eventName, {
                detail: needDetail ? this.generateDetail() : null,
            });
        });
        this.generateDetail = () => {
            return {
                wallet: this.walletService.getWallet(),
                network: this.networkService.getNetwork(),
            };
        };
        this.disconnect = () => __awaiter(this, void 0, void 0, function* () {
            this.isAuthenticated.value = false;
            this.modal.clearCachedProvider();
            return window.dispatchEvent(yield this.generateEventDetail(EVENTS.DISCONNECTED, false));
        });
        this.modal = new web3modal_1.default({
            cacheProvider: true,
            providerOptions: {
                coinbasewallet: types_1.default.coinbasewallet,
                walletconnect: types_1.default.walletconnect,
            },
        });
    }
}
exports.Connector = Connector;
