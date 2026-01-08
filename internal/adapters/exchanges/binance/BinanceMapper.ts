import { OrderBook } from "../../../core/domain/entities/OrderBook";
import { PairErrors } from "../../../core/domain/errors/PairErrors";
import { PAIR } from "../../../core/domain/valueObjects/Pair";
import { PROVIDER } from "../../../core/domain/valueObjects/Provider";

export type BinanceOrderBookResponse = {
    lastUpdateId: number;
    bids: [string, string][];
    asks: [string, string][];
};

export enum BINANCE_PAIR {
    BTCUSDT = "BTCUSDT"
}

export class BinanceMapper {
    static orderBooktoDomain(binanceOrderBook: BinanceOrderBookResponse, pair: PAIR): OrderBook {
        const asks: [number, number][] = binanceOrderBook.asks.map(ask => [parseFloat(ask[0]), parseFloat(ask[1])]);
        const bids: [number, number][] = binanceOrderBook.bids.map(bid => [parseFloat(bid[0]), parseFloat(bid[1])]);

        return OrderBook.create({
            asks,
            bids,
            pair,
            provider: PROVIDER.BINANCE
        });
    }

    static pairFromDomain(pair: PAIR): BINANCE_PAIR {
        if (pair !== PAIR.BTCUSDT) {
            throw new PairErrors.NotHandled();
        }
        return BINANCE_PAIR.BTCUSDT;
    }
}