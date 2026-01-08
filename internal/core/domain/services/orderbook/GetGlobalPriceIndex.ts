import { ExchangePort } from '../../../ports/ExchangePort';
import { OrderBook } from '../../entities/OrderBook';
import { PAIR, Pair } from '../../valueObjects/Pair';

export type GetGlobalPriceIndexResponse = {
    averageMidPrice: number;
    midPrices: { broker: string, midPrice: number }[];
};

export class GetGlobalPriceIndex {
    constructor(
        private readonly exchanges: ExchangePort[]
    ) {}

    async execute(pair: PAIR): Promise<GetGlobalPriceIndexResponse> {
        const orderBooks: OrderBook[] = await Promise.all(
            this.exchanges.map(async broker => {
                const orderBook = await broker.getOrderBook(pair);
                return orderBook;
            })
        );

        const midPrices = orderBooks.map(orderBook => ({
            broker: orderBook.props.provider,
            midPrice: orderBook.props.midPrice
        }));

        const averageMidPrice = midPrices.reduce((acc, { midPrice }) => acc + midPrice, 0) / midPrices.length;

        return { averageMidPrice, midPrices };
    }
}