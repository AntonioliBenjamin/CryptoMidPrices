import { Binance } from "../../internal/adapters/exchanges/binance/Binance"
import { PairErrors } from "../../internal/core/domain/errors/PairErrors"
import { PAIR } from "../../internal/core/domain/valueObjects/Pair"
import { ExchangePort } from "../../internal/core/ports/ExchangePort"

describe('Integ - Binance', () => {
    let binanceExchange: ExchangePort

    beforeAll(() => {
        binanceExchange = new Binance()
    })
   it('Should return an orderbook from Binance pair BTCUSDT', async () => {
    const result = await binanceExchange.getOrderBook(PAIR.BTCUSDT)
    expect(result.props.id).toBeDefined()
    expect(result.props.pair).toEqual(PAIR.BTCUSDT)
    expect(result.props.provider).toEqual('Binance')
    expect(result.props.asks.length).toBeGreaterThan(0)
    expect(result.props.bids.length).toBeGreaterThan(0)
   })

   it('Should throw an error because ETHUSDT is not handled', async () => {
    const result = binanceExchange.getOrderBook("ETHUSDT" as PAIR)
    await expect(result).rejects.toThrow(PairErrors.NotHandled)
   })
})