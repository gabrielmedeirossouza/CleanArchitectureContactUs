import { Controller } from "../../Presentation/Controllers/Controller"
import { Request} from "express"

export class ExpressRequest implements Controller.Request {
    public readonly headers: Record<any, any>
    public readonly body: Record<any, any>

    constructor(expressRequest: Request) {
        this.headers = expressRequest.headers
        this.body = expressRequest.body
    }
}
