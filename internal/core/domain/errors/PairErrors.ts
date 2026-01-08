import { DomainError } from "./DomainErrors"

export namespace PairErrors {
    export class NotHandled extends DomainError {
        constructor() {
            super("PAIR_IS_NOT_HANDLED") 
        }
    }
}