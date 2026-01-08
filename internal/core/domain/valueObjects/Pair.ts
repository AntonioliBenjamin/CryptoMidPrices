import { PairErrors } from "../errors/PairErrors";

export enum PAIR {
    BTCUSDT = "btcusdt"
}

export class Pair {
    static validate(pair: string): PAIR {
        if (pair.toLowerCase() !== PAIR.BTCUSDT) {
            throw new PairErrors.NotHandled()
        }
        return PAIR.BTCUSDT
    }
}
