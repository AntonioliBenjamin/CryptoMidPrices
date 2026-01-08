import { v4 } from 'uuid';
import { PAIR, Pair } from '../valueObjects/Pair';
import { PROVIDER } from '../valueObjects/Provider';

export type OrderBookProperties = {
    id:  string;
    midPrice: number;
    pair: PAIR;
    provider: PROVIDER;
    asks: [number, number][];
    bids: [number, number][];
};

export class OrderBook {
    props: OrderBookProperties;

    constructor(props: OrderBookProperties) {
        this.props = props;
    }

    static create(props: {asks: [number, number][], bids: [number, number][], pair: string, provider: PROVIDER}): OrderBook {
        return new OrderBook({
            id: v4(),
            midPrice: OrderBook.computeMidPrice(props.asks, props.bids),
            pair: Pair.validate(props.pair),
            asks: props.asks,
            bids: props.bids,
            provider: props.provider,
        });
    }

    private static computeMidPrice(asks: [number, number][], bids: [number, number][]): number {
        const bestAsk = Math.min(...asks.map(ask => ask[0]));
        const bestBid = Math.max(...bids.map(bid => bid[0]));
        return (bestAsk + bestBid) / 2;
    }
}