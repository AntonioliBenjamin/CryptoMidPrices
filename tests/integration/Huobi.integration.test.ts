import { Huobi } from "../../internal/adapters/exchanges/huobi/Huobi"
import { PairErrors } from "../../internal/core/domain/errors/PairErrors"
import { PAIR } from "../../internal/core/domain/valueObjects/Pair"
import { ExchangePort } from "../../internal/core/ports/ExchangePort"
import WebSocket from 'ws';

describe('Integ - Huobi', () => {
    let huobiExchange: ExchangePort

    beforeAll(() => {
        huobiExchange = new Huobi()
    })
   it('Should return an orderbook from Huobi pair BTCUSDT', async () => {
    const result = await huobiExchange.getOrderBook(PAIR.BTCUSDT)
    expect(result.props.id).toBeDefined()
    expect(result.props.pair).toEqual(PAIR.BTCUSDT)
    expect(result.props.provider).toEqual('Huobi')
    expect(result.props.asks.length).toBeGreaterThan(0)
    expect(result.props.bids.length).toBeGreaterThan(0)
   })

   it('Should throw an error because ETHUSDT is not handled', async () => {
    const result = huobiExchange.getOrderBook("ETHUSDT" as PAIR)
    await expect(result).rejects.toThrow(PairErrors.NotHandled)
   })
})