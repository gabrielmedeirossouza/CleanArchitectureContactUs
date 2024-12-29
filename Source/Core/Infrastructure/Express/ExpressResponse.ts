import { Controller } from "@/Core/Presentation/Controllers/Controller"
import { Response } from "express"

export class ExpressResponse implements Controller.Response {
    constructor(
        private readonly expressResponse: Response
    ) { }

    public Send(status: Controller.Response.Status, data: Record<any, any>): void {
        this.expressResponse
            .status(status)
            .json({
                status,
                data
            })
    }
}
