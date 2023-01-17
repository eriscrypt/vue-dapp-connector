export default class Network {
    private readonly provider;
    id: string | number;
    name: string;
    symbol: string;
    constructor(provider: any);
    private getChainById;
    private update;
    getNetwork(): {
        id: string | number;
        name: string;
        symbol: string;
    };
}
