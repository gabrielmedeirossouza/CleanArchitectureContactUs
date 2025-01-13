export interface Error<Code extends string> {
    readonly code: Code
    readonly message: string
}
