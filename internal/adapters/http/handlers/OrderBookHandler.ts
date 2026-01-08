import * as express from "express";
import { PairErrors } from "../../../core/domain/errors/PairErrors";
import { DependencyContainer } from "../../../../config/DI";
import { GetGlobalPriceIndex } from "../../../core/domain/services/orderbook/GetGlobalPriceIndex";
import { Pair } from "../../../core/domain/valueObjects/Pair";

export const orderBookRouter = express.Router();

orderBookRouter.get("/:pair", async (req, res) => {
  try {
    const getGlobalPriceIndexService = DependencyContainer.resolve<GetGlobalPriceIndex>('GetGlobalPriceIndexService');
    const response = await getGlobalPriceIndexService.execute(Pair.validate(req.params.pair));
    return res.send(response);
  } catch (error) {
    if (error instanceof PairErrors.NotHandled) {
      return res.status(400).send({ error: error.message });
    }
    return res.status(500).send({error});
  }
});
