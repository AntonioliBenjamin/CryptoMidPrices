import { PairErrors } from "../../internal/core/domain/errors/PairErrors";
import { GetGlobalPriceIndex } from "../../internal/core/domain/services/orderbook/GetGlobalPriceIndex";
import { PAIR } from "../../internal/core/domain/valueObjects/Pair";
import { PROVIDER } from "../../internal/core/domain/valueObjects/Provider";
import { Exchange1Mock, Exchange2Mock } from "../mocks/ExchangeMock";

describe("unit - GetGlobalPriceIndex", () => {
    let getGlobalPriceIndex: GetGlobalPriceIndex;

    beforeAll(() => {
        const broker1 = new Exchange1Mock();
        const broker2 = new Exchange2Mock();
        getGlobalPriceIndex = new GetGlobalPriceIndex([broker1, broker2]);
    });

    it('Should return the global price index', async () => {
        const pair = "BTCUSDT";

        const expectedExchange1MidPrice = 999.5;
        const expectedExchange2MidPrice = 1999.5;
        const expectedAverageMidPrice = (expectedExchange1MidPrice + expectedExchange2MidPrice) / 2;

        const result = await getGlobalPriceIndex.execute(PAIR.BTCUSDT);

        expect(result.averageMidPrice).toEqual(expectedAverageMidPrice);
        expect(result.midPrices[0].midPrice).toEqual(expectedExchange1MidPrice);
        expect(result.midPrices[1].midPrice).toEqual(expectedExchange2MidPrice);

        expect(result.midPrices[0].broker).toEqual(PROVIDER.BINANCE);
        expect(result.midPrices[1].broker).toEqual(PROVIDER.HUOBI);
    });

    it('Should throw error because pair ethusdt is not handled', async () => {
        const result = getGlobalPriceIndex.execute("ETHUSDT" as PAIR);
        await expect(result).rejects.toThrow(PairErrors.NotHandled);
    })
})