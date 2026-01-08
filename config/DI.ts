import { Binance } from "../internal/adapters/exchanges/binance/Binance";
import { Huobi } from "../internal/adapters/exchanges/huobi/Huobi";
import { Kraken } from "../internal/adapters/exchanges/kraken/Kraken";
import { GetGlobalPriceIndex } from "../internal/core/domain/services/orderbook/GetGlobalPriceIndex";

export class DependencyContainer {
    private static instances = new Map<string, any>();

    static register<T>(key: string, instance: T): void {
        this.instances.set(key, instance);
    }

    static resolve<T>(key: string): T {
        const instance = this.instances.get(key);
        if (!instance) {
            throw new Error(`No instance found for key: ${key}`);
        }
        return instance;
    }

    static init(): void {
        const binanceExchange = new Binance();
        const krakenExchange = new Kraken();
        const huobiExchange = new Huobi();
        const getGlobalPriceIndexService = new GetGlobalPriceIndex([huobiExchange, binanceExchange, krakenExchange]);

        DependencyContainer.register('GetGlobalPriceIndexService', getGlobalPriceIndexService);
    }
}