import { SystemRegistry } from "@/Core/SystemFeatures/SystemRegistry"
import { Contact } from "../../Domain/Entities/Contact"
import { ContactUsEmailService } from "../Gateways/ContactUsEmailService"
import { SendContactUs } from "./SendContactUs"

export class SendContactUsImpl implements SendContactUs {
    constructor(
        private readonly contactUsEmailService: ContactUsEmailService
    ) { }

    public async Execute({ name, email, message, output }: SendContactUs.Request): Promise<void> {
        const contactResult = Contact.Create(crypto.randomUUID(), name, email, message)
        if (contactResult.isFailure) return output.AssertionOutput(contactResult.value)

        const emailServiceResult = await this.contactUsEmailService.SendContact(contactResult.value)
        if (emailServiceResult.isFailure) {
            SystemRegistry.logger.Log("SendContactUs", emailServiceResult.value.message)

            return output.UnavailableServiceOutput(emailServiceResult.value)
        }

        output.Success()
    }
}
