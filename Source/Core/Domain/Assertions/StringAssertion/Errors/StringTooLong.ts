import { AssertionError } from "../../AssertionError"

export interface StringTooLong extends AssertionError<"string_too_long"> {
    readonly maxLength: number
    readonly value: string
}
