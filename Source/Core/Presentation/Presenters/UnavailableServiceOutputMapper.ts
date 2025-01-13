import { UnavailableService } from "@/Core/Application/UnavailableService"
import { Http } from "../Http"

export class UnavailableServiceOutputMapper {
    public Map(response: Http.Response, _: UnavailableService): void {
        response.Send(
            Http.Response.Status.InternalServerError,
            "Houve um erro ao processar a solicitação. Por favor, tente novamente mais tarde."
        )
    }
}
