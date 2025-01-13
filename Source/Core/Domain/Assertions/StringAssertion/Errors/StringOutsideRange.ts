import { AssertionError } from "../../AssertionError"

export interface StringOutsideRange extends AssertionError<"string_outside_range"> {
    readonly minLength: number
    readonly maxLength: number
    readonly value: string
}
