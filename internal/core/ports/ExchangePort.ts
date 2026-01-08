import { OrderBook } from '../domain/entities/OrderBook';
import { PAIR } from '../domain/valueObjects/Pair';

export interface ExchangePort {
    getOrderBook(pair: PAIR): Promise<OrderBook>;
}