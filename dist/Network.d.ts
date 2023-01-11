export default class Network {
    private readonly provider;
    private readonly id;
    name: string;
    symbol: string;
    constructor(provider: any);
    private getChainById;
    private update;
    getNetwork(): {
        name: string;
        symbol: string;
    };
}
