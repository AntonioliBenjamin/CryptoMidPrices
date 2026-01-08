
import { Kraken } from "../../internal/adapters/exchanges/kraken/Kraken"
import { PairErrors } from "../../internal/core/domain/errors/PairErrors"
import { PAIR } from "../../internal/core/domain/valueObjects/Pair"
import { ExchangePort } from "../../internal/core/ports/ExchangePort"

describe('Integ - Kraken', () => {
    let krakenExchange: ExchangePort

    beforeAll(() => {
        krakenExchange = new Kraken()
    })
   it('Should return an orderbook from Kraken pair BTCUSDT', async () => {
    const result = await krakenExchange.getOrderBook(PAIR.BTCUSDT)
    expect(result.props.id).toBeDefined()
    expect(result.props.pair).toEqual(PAIR.BTCUSDT)
    expect(result.props.provider).toEqual('Kraken')
    expect(result.props.asks.length).toBeGreaterThan(0)
    expect(result.props.bids.length).toBeGreaterThan(0)
   })

   it('Should trhow an error because ETHUSDT is not handled', async () => {
    const result = krakenExchange.getOrderBook("ETHUSDT" as PAIR)
    await expect(result).rejects.toThrow(PairErrors.NotHandled)
   })
})