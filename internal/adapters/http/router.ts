import "dotenv/config";
import express from "express";
import { orderBookRouter } from "./handlers/OrderBookHandler";
const port = process.env.PORT;

export class CryptoMidPricesRouter {
    static init(): Express.Application {
        const app = express();
        
        app.use('/order-book', orderBookRouter)

        app.listen(port, () => {
            console.log(`listening on port ${port}`);
          });

          return app;
    }
}
