import { ethers } from "ethers";
import { ConnectorResponse } from "./types";
export declare enum EVENTS {
    CHAIN_CHANGED = "chain-changed",
    ACCOUNTS_CHANGED = "accounts-changed",
    DISCONNECTED = "disconnected",
    UPDATED = "updated"
}
export declare class Connector {
    private instance;
    private readonly modal;
    private provider;
    networkService: any;
    walletService: any;
    isAuthenticated: import("vue").Ref<boolean>;
    constructor();
    authenticate: () => Promise<ConnectorResponse>;
    connect: () => Promise<ConnectorResponse>;
    on: (event: EVENTS | string, callback: (e: ConnectorResponse) => void) => void;
    private registerEvents;
    private init;
    update: () => Promise<boolean>;
    getProvider: () => ethers.providers.Web3Provider;
    private generateEventDetail;
    private generateDetail;
    disconnect: () => Promise<boolean>;
}
