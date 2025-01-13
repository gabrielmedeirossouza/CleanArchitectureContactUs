import { AssertionError } from "../../AssertionError"

export interface StringMismatch extends AssertionError<"string_mismatch"> {
    readonly pattern: RegExp
    readonly value: string
}
