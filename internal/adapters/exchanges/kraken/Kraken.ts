import axios from 'axios';
import { ExchangePort } from '../../../core/ports/ExchangePort';
import { OrderBook } from '../../../core/domain/entities/OrderBook';
import { KrakenMapper, KrakenOrderBookResponse } from './KrakenMapper';
import { PAIR } from '../../../core/domain/valueObjects/Pair';
import "dotenv/config";

const krakenURL = process.env.KRAKEN_URL!;

export class Kraken implements ExchangePort {
    async getOrderBook(pair: PAIR): Promise<OrderBook> {
        const krakenPair = KrakenMapper.pairFromDomain(pair);
        const res = await axios.get(krakenURL, {
            params: {
                pair: krakenPair,
                count: 5
            }
        });
        const krakenOrderBook: KrakenOrderBookResponse = res.data;
        return KrakenMapper.orderBookToDomain(krakenOrderBook, pair)
    }
}