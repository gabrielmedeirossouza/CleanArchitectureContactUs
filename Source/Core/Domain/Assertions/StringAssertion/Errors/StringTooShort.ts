import { AssertionError } from "../../AssertionError"

export interface StringTooShort extends AssertionError<"string_too_short"> {
    readonly minLength: number
    readonly value: string
}
