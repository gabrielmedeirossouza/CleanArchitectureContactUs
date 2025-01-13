import { Result } from "@/Core/Base/Result"
import { Contact } from "../../Domain/Entities/Contact"
import { UnavailableService } from "@/Core/Application/UnavailableService"

export interface ContactUsEmailService {
    SendContact(contact: Contact): Promise<Result<void, UnavailableService>>
}
