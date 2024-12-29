import { DataValidation } from "@/Core/Helpers/DataValidation"
import { Controller } from "@/Core/Presentation/Controllers/Controller"
import { SendContactUs } from "../../Application/UseCases/SendContactUs"
import { SendContactUsPresenter } from "../Presenters/SendContactUsPresenter"

export class SendContactUsController implements Controller {
    constructor(
        private readonly sendContactUs: SendContactUs,
        private readonly sendContactUsPresenter: SendContactUsPresenter
    ) { }

    public async Handle(request: Controller.Request, response: Controller.Response): Promise<void> {
        const { name, email, message } = request.body

        const dataValidationAccumulator: Array<
            SendContactUsController.Error.InvalidName |
            SendContactUsController.Error.InvalidEmail |
            SendContactUsController.Error.InvalidMessage
        > = []

        if (!DataValidation.IsString(name))
            dataValidationAccumulator.push(new SendContactUsController.Error.InvalidName)

        if (!DataValidation.IsString(email))
            dataValidationAccumulator.push(new SendContactUsController.Error.InvalidEmail)

        if (!DataValidation.IsString(message))
            dataValidationAccumulator.push(new SendContactUsController.Error.InvalidMessage)

        if (dataValidationAccumulator.length) {
            return response.Send(Controller.Response.Status.BadRequest, dataValidationAccumulator)
        }


        const useCaseResponse = await this.sendContactUs.Execute({ name, email, message })
        const viewModel = this.sendContactUsPresenter.Present(useCaseResponse)

        if (viewModel.ok) {
            return response.Send(Controller.Response.Status.Ok, viewModel.value)
        }

        let statusCode: Controller.Response.Status = Controller.Response.Status.BadRequest
        for (const error of viewModel.value) {
            if (error.code === "INTERNAL_SERVER_ERROR") statusCode = Controller.Response.Status.InternalServerError
        }

        response.Send(statusCode, viewModel.value)
    }
}

export namespace SendContactUsController {
    export namespace Error {
        export class InvalidName {
            public readonly code = "INVALID_NAME_REQUEST"
            public readonly message = "body.name must be a string."
        }

        export class InvalidEmail {
            public readonly code = "INVALID_EMAIL_REQUEST"
            public readonly message = "body.email must be a string."
        }

        export class InvalidMessage {
            public readonly code = "INVALID_MESSAGE_REQUEST"
            public readonly message = "body.message must be a string."
        }
    }
}
