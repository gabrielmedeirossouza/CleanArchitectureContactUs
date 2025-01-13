import { Controller } from "@/Core/Presentation/Controllers/Controller"
import { SendContactUs } from "../../Application/UseCases/SendContactUs"
import { SendContactUsPresenter } from "../Presenters/SendContactUsPresenter"
import { Result } from "@/Core/Base/Result"
import { Http } from "@/Core/Presentation/Http"

export class SendContactUsController extends Controller {
    constructor(
        private readonly sendContactUs: SendContactUs
    ) {
        super()
    }

    public Handle(request: Http.Request, response: Http.Response): void {
        const { name, email, message } = request.body

        const validations = [
            this.AssertString("name", name),
            this.AssertString("email", email),
            this.AssertString("message", message)
        ]

        if (Result.SomeFailure(validations)) return response.Send(Http.Response.Status.BadRequest, Result.ExtractFailureValues(validations))

        const sendContactUsPresenter = new SendContactUsPresenter(response)
        this.sendContactUs.Execute({ name, email, message, output: sendContactUsPresenter })
    }
}
