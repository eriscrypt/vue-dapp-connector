import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
export interface IWallet {
    address: string;
    balance: string;
}
export interface INetwork {
    id: number;
    name: string;
    symbol: string;
    valid: boolean;
}
export declare const CHAINS: {
    ETH: {
        id: number;
        name: string;
        symbol: string;
    };
    BSC: {
        id: number;
        name: string;
        symbol: string;
    };
    RINKEBY: {
        id: number;
        name: string;
        symbol: string;
    };
    FTM: {
        id: number;
        name: string;
        symbol: string;
    };
    POLYGON: {
        id: number;
        name: string;
        symbol: string;
    };
    ARBITRUM: {
        id: number;
        name: string;
        symbol: string;
    };
    AVALANCHE: {
        id: number;
        name: string;
        symbol: string;
    };
};
export interface ConnectorResponse {
    wallet: IWallet;
    network: INetwork;
}
declare const _default: {
    coinbasewallet: {
        package: typeof CoinbaseWalletSDK;
        options: {
            appName: string;
            infuraId: string;
        };
    };
    walletconnect: {
        package: any;
        options: {
            infuraId: string;
            rpc: {
                1: string;
                56: string;
                250: string;
                137: string;
                43114: string;
                42161: string;
            };
        };
    };
};
export default _default;
