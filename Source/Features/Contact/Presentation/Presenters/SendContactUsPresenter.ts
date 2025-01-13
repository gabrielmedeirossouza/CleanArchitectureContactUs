import { SendContactUs } from "../../Application/UseCases/SendContactUs"
import { StringAssertion } from "@/Core/Domain/Assertions/StringAssertion/StringAssertion"
import { UnavailableService } from "@/Core/Application/UnavailableService"
import { PresentationRegistry } from "@/Core/Presentation/Presenters/PresentationRegistry"
import { Http } from "@/Core/Presentation/Http"

export class SendContactUsPresenter implements SendContactUs.Output {
    constructor(
        public response: Http.Response
    ) { }

    public Success(): void {
        this.response.Send(Http.Response.Status.Ok, "Contato enviado com sucesso!")
    }

    public AssertionOutput(assertions: StringAssertion[]): void {
        PresentationRegistry.assertionOutputMapper.Map(this.response, assertions)
    }

    public UnavailableServiceOutput(unavailableService: UnavailableService): void {
        PresentationRegistry.unavailableServiceOutputMapper.Map(this.response, unavailableService)
    }
}
