import "dotenv/config";
import { CryptoMidPricesRouter } from "../internal/adapters/http/router";
import { DependencyContainer } from "../config/DI";

CryptoMidPricesRouter.init();
DependencyContainer.init();