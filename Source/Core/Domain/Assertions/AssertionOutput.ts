import { StringAssertion } from "./StringAssertion/StringAssertion"

export interface AssertionOutput {
    AssertionOutput(assertions: StringAssertion[]): void
}
