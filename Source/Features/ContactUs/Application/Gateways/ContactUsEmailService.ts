import { Result } from "@/Core/Base/Result"
import { Contact } from "../../Domain/Entities/Contact"
import { EmailService } from "@/Core/Application/Gateways/EmailService"

export interface ContactUsEmailService {
    SendContact(contact: Contact): Promise<Result<void, EmailService.Error.ConnectionError>>
}
