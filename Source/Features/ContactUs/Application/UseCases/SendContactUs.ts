import { Contact } from "../../Domain/Entities/Contact"
import { Result } from "@/Core/Base/Result"
import { EmailService } from "@/Core/Application/Gateways/EmailService"
import { ContactUsEmailService } from "../Gateways/ContactUsEmailService"
import { Logger } from "@/Core/Features/Logger/Logger"

export class SendContactUs {
    constructor(
        private readonly contactUsEmailService: ContactUsEmailService,
        private readonly logger: Logger
    ) { }

    public async Execute(request: SendContactUs.Request): Promise<SendContactUs.Response> {
        const contactResult = Contact.Create(request.name, request.email, request.message)
        if (!contactResult.ok) return contactResult


        const contact = contactResult.value

        const emailServiceResult = await this.contactUsEmailService.SendContact(contact)
        if (!emailServiceResult.ok) {
            this.logger.Log(emailServiceResult.value.message)

            return Result.Fail([emailServiceResult.value])
        }

        return Result.Ok()
    }
}

export namespace SendContactUs {
    export type Request = {
        name: string,
        email: string,
        message: string
    }

    export type Response = Result<
        void,
        ReadonlyArray<
            Contact.Error.NameRequired |
            Contact.Error.NameTooLong |
            Contact.Error.MessageRequired |
            Contact.Error.MessageTooLong |
            Contact.Error.EmailRequired |
            Contact.Error.EmailTooLong |
            Contact.Error.InvalidEmail |
            EmailService.Error.ConnectionError
        >
    >
}

