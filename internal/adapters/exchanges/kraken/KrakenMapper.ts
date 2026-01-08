import { OrderBook } from "../../../core/domain/entities/OrderBook";
import { PairErrors } from "../../../core/domain/errors/PairErrors";
import { PAIR } from "../../../core/domain/valueObjects/Pair";
import { PROVIDER } from "../../../core/domain/valueObjects/Provider";

export type KrakenOrderBookResponse = {
    error: any[];
    result: {
        [pair: string]: {
            asks: [string, string, number][];
            bids: [string, string, number][];
        };
    };
};

export enum KRAKEN_PAIR {
    BTCUSDT = "XBTUSDT"
}

export class KrakenMapper {
    static orderBookToDomain(krakenOrderBook: KrakenOrderBookResponse, pair: PAIR): OrderBook {
        const krakenPair = Object.keys(krakenOrderBook.result)[0];
        const asks: [number, number][] = krakenOrderBook.result[krakenPair].asks.map(ask => [parseFloat(ask[0]), parseFloat(ask[1])]);
        const bids: [number, number][] = krakenOrderBook.result[krakenPair].bids.map(bid => [parseFloat(bid[0]), parseFloat(bid[1])]);

        return OrderBook.create({
            asks,
            bids,
            pair,
            provider: PROVIDER.KRAKEN
        });
    };

    static pairFromDomain(pair: PAIR): KRAKEN_PAIR {
        if (pair !== PAIR.BTCUSDT) {
            throw new PairErrors.NotHandled();
        }
        return KRAKEN_PAIR.BTCUSDT;
    }

};