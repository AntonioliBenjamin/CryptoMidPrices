import { OrderBook } from "../../../core/domain/entities/OrderBook";
import { PAIR } from "../../../core/domain/valueObjects/Pair";
import { ExchangePort } from "../../../core/ports/ExchangePort";
import { BinanceMapper, BinanceOrderBookResponse } from "./BinanceMapper";
import axios from 'axios';
import "dotenv/config";

const binanceURL = process.env.BINANCE_URL!;

export class Binance implements ExchangePort {
    async getOrderBook(pair: PAIR): Promise<OrderBook> {
        const binancePair = BinanceMapper.pairFromDomain(pair);
        const res = await axios.get(binanceURL, {
        params: {
            symbol: binancePair,
            limit: 5
            }
        });

        const binanceOrderBook: BinanceOrderBookResponse = res.data;
        return BinanceMapper.orderBooktoDomain(binanceOrderBook, pair)
    }
}