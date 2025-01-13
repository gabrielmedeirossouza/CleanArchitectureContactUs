export interface AssertionError<Code extends string> {
    readonly code: Code
    readonly argument: string
    readonly message: string
}
