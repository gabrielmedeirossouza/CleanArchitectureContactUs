import { Http } from "@/Core/Presentation/Http"
import { Request } from "express"

export class ExpressRequest implements Http.Request {
    public readonly headers: Record<any, any>
    public readonly body: Record<any, any>

    constructor(expressRequest: Request) {
        this.headers = expressRequest.headers
        this.body = expressRequest.body
    }
}
