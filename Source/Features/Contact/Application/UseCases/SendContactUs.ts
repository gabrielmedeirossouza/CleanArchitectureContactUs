import { UnavailableServiceOutput } from "@/Core/Application/UnavailableServiceOutput"
import { AssertionOutput } from "@/Core/Domain/Assertions/AssertionOutput"

export interface SendContactUs {
    Execute(request: SendContactUs.Request): Promise<void>
}

export namespace SendContactUs {
    export interface Request {
        output: Output
        name: string
        email: string
        message: string
    }

    export interface Output extends AssertionOutput, UnavailableServiceOutput {
        Success(): void
    }
}
