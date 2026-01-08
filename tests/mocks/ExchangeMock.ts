import { OrderBook } from "../../internal/core/domain/entities/OrderBook";
import { PROVIDER } from "../../internal/core/domain/valueObjects/Provider";
import { ExchangePort } from "../../internal/core/ports/ExchangePort";

export class Exchange1Mock implements ExchangePort {
    async getOrderBook(pair: string): Promise<OrderBook> {
        return OrderBook.create({
            asks: [[1000, 10], [999, 9], [998, 8]],
            bids:  [[999, 10], [1000, 9], [1001, 8]],
            pair,
            provider: PROVIDER.BINANCE
        })
    }
}

export class Exchange2Mock implements ExchangePort {
    async getOrderBook(pair: string): Promise<OrderBook> {
        return OrderBook.create({
            asks: [[2000, 10], [1999, 9], [1998, 8]],
            bids:  [[1999, 10], [2000, 9], [2001, 8]],
            pair,
            provider: PROVIDER.HUOBI
        })
    }
}