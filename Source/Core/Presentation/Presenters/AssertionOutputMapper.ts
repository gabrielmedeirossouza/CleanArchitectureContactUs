import { StringAssertion } from "@/Core/Domain/Assertions/StringAssertion/StringAssertion"
import { Http } from "../Http"

export class AssertionOutputMapper {
    public Map(response: Http.Response, assertions: StringAssertion[]): void {
        const errors = []

        for (const assertion of assertions) {
            if (assertion.code === "string_required") {
                errors.push(`O argumento ${assertion.argument} é obrigatório.`)
            }

            if (assertion.code === "string_too_short") {
                errors.push(`O argumento ${assertion.argument} deve conter no mínimo ${assertion.minLength} caracteres.`)
            }

            if (assertion.code === "string_too_long") {
                errors.push(`O argumento ${assertion.argument} deve conter no máximo ${assertion.maxLength} caracteres.`)
            }

            if (assertion.code === "string_outside_range") {
                errors.push(`O argumento ${assertion.argument} deve conter entre ${assertion.minLength} e ${assertion.maxLength} caracteres.`)
            }

            if (assertion.code === "string_mismatch") {
                errors.push(`O argumento ${assertion.argument} é inválido.`)
            }
        }

        response.Send(Http.Response.Status.BadRequest, errors)
    }
}
