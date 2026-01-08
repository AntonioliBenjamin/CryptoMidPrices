import { OrderBook } from "../../../core/domain/entities/OrderBook";
import { PairErrors } from "../../../core/domain/errors/PairErrors";
import { PAIR } from "../../../core/domain/valueObjects/Pair";
import { PROVIDER } from "../../../core/domain/valueObjects/Provider";

export type HuobiOrderBookResponse = {
    ch: string;
    ts: number;
    tick: {
        bids: [number, number][];
        asks: [number, number][];
    };
};

export enum HUOBI_PAIR {
    BTCUSDT = "btcusdt"
}

export class HuobiMapper {
    static orderBookToDomain(huobiOrderBook: HuobiOrderBookResponse, pair: PAIR): OrderBook {
        const asks: [number, number][] = huobiOrderBook.tick.asks;
        const bids: [number, number][] = huobiOrderBook.tick.bids;

        return OrderBook.create({
            asks,
            bids,
            pair,
            provider: PROVIDER.HUOBI
        });
    };

    static pairFromDomain(pair: PAIR): HUOBI_PAIR {
        if (pair !== PAIR.BTCUSDT) {
            throw new PairErrors.NotHandled();
        }
        return HUOBI_PAIR.BTCUSDT;
    }
}
