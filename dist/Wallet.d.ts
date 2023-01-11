export default class Wallet {
    private readonly provider;
    private address;
    private balance;
    constructor(provider: any);
    private getAddress;
    requestBalance(): Promise<void>;
    getWallet(): {
        address: string;
        balance: string;
    };
}
