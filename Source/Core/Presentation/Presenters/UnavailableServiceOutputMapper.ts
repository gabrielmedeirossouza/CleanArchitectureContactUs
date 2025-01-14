import { UnavailableService } from "@/Core/Application/UnavailableService"
import { Http } from "../Http"

export class UnavailableServiceOutputMapper {
    public Map(response: Http.Response, _: UnavailableService): void {
        response.Send(
            Http.Response.Status.InternalServerError,
            {
                code: "internal_server_error",
                message: "O serviço está indisponível no momento. Por favor, tente novamente mais tarde."
            }
        )
    }
}
