import { Http } from "@/Core/Presentation/Http"
import { Response } from "express"

export class ExpressResponse implements Http.Response {
    constructor(
        private readonly expressResponse: Response
    ) { }

    public Send(status: Http.Response.Status, data: any): void {
        this.expressResponse
            .status(status)
            .json({
                ok: String(status).startsWith("2"),
                data
            })
    }
}
