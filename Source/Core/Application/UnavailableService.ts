import { Error } from "./Error"

export interface UnavailableService extends Error<"unavailable_service"> {
    readonly service: string
}
