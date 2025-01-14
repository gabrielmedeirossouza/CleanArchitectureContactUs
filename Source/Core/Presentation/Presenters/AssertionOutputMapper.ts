import { StringAssertion } from "@/Core/Domain/Assertions/StringAssertion/StringAssertion"
import { Http } from "../Http"

export class AssertionOutputMapper {
    public Map(response: Http.Response, assertions: StringAssertion[]): void {
        const errors = []

        for (const assertion of assertions) {
            if (assertion.code === "string_required") {
                errors.push({
                    code: "string_required",
                    argument: assertion.argument,
                    message: `O argumento [${assertion.argument}] é obrigatório.`
                })
            }

            if (assertion.code === "string_too_short") {
                errors.push({
                    code: "string_too_short",
                    argument: assertion.argument,
                    message: `O argumento [${assertion.argument}] deve conter no mínimo ${assertion.minLength} caracteres.`
                })
            }

            if (assertion.code === "string_too_long") {
                errors.push({
                    code: "string_too_long",
                    argument: assertion.argument,
                    message: `O argumento [${assertion.argument}] deve conter no máximo ${assertion.maxLength} caracteres.`
                })
            }

            if (assertion.code === "string_outside_range") {
                errors.push({
                    code: "string_outside_range",
                    argument: assertion.argument,
                    message: `O argumento [${assertion.argument}] deve conter entre ${assertion.minLength} e ${assertion.maxLength} caracteres.`
                })
            }

            if (assertion.code === "string_mismatch") {
                errors.push({
                    code: "string_mismatch",
                    argument: assertion.argument,
                    message: `O argumento [${assertion.argument}] não corresponde ao padrão [${assertion.pattern}].`
                })
            }
        }

        response.Send(Http.Response.Status.BadRequest, errors)
    }
}
