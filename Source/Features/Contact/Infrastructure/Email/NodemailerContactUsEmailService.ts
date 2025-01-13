import { EmailService } from "@/Core/Application/EmailService"
import { Result } from "@/Core/Base/Result"
import { ContactUsEmailService } from "../../Application/Gateways/ContactUsEmailService"
import { Contact } from "../../Domain/Entities/Contact"

export class NodemailerContactUsEmailService implements ContactUsEmailService {
    public SendContact(contact: Contact): Promise<Result<void, EmailService.ConnectionException<"email_service">>> {
        const template = /* html */`
            <h1>Olá, ${contact.name}!</h1>

            <p>Agradecemos por entrar em contato conosco. Recebemos sua mensagem e entraremos em contato em breve através deste endereço de email: <strong>${contact.email}</strong>.</p>

            <section>
                <p><strong>Mensagem enviada:</strong></p>
                <blockquote style="background: #f9f9f9; padding: 10px; border-left: 3px solid #ddd;">
                    ${contact.message}
                </blockquote>
            </section>

            <p>Estamos à disposição para ajudar no que for necessário.</p>

            <hr />
            <footer style="font-size: 0.9em; color: #555;">
                <p><i>Este é um email automático, por favor, não responda a esta mensagem.</i></p>
            </footer>
        `.trim()

        // return Promise.resolve(Result.Failure(new EmailService.ConnectionException("NodemailerContactUsEmailService.SendContact")))
        return Promise.resolve(Result.Success())
    }
}
