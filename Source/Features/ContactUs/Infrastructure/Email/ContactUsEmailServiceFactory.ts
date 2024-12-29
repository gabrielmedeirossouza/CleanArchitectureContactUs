import { ContactUsEmailService } from "../../Application/Gateways/ContactUsEmailService"
import { NodemailerContactUsEmailService } from "./NodemailerContactUsEmailService"

export class ContactUsEmailServiceFactory {
    public static Create(): ContactUsEmailService {
        return new NodemailerContactUsEmailService
    }
}
