import { EmailServicePresenter } from "@/Core/Presentation/Presenters/EmailServicePresenter"
import { Result } from "@/Core/Base/Result"
import { SendContactUs } from "../../Application/UseCases/SendContactUs"
import { Contact } from "../../Domain/Entities/Contact"
import { EmailService } from "@/Core/Application/Gateways/EmailService"

export class SendContactUsPresenter {
    public Present(response: SendContactUs.Response): SendContactUsPresenter.Response {
        if (response.ok) return Result.Ok(new SendContactUsPresenter.ViewModel.Success)

        const errorVisitor = new SendContactUsPresenter.ErrorVisitor

        for (const element of response.value) {
            element.Accept(errorVisitor)
        }

        return Result.Fail(errorVisitor.accumulator)
    }
}

export namespace SendContactUsPresenter {
    export class ErrorVisitor implements Contact.Error.Visitor, EmailService.Error.Visitor {
        public readonly accumulator: Array<ViewModel.Error> = []

        public VisitNameRequired(): void {
            this.accumulator.push(new ViewModel.NameRequired)
        }

        public VisitNameTooLong(element: Contact.Error.NameTooLong): void {
            this.accumulator.push(new ViewModel.NameTooLong(element.value, element.maxLength))
        }

        public VisitMessageRequired(): void {
            this.accumulator.push(new ViewModel.MessageRequired)
        }

        public VisitMessageTooLong(element: Contact.Error.MessageTooLong): void {
            this.accumulator.push(new ViewModel.MessageTooLong(element.value, element.maxLength))
        }

        public VisitEmailRequired(): void {
            this.accumulator.push(new ViewModel.EmailRequired)
        }

        public VisitEmailTooLong(element: Contact.Error.EmailTooLong): void {
            this.accumulator.push(new ViewModel.EmailTooLong(element.value, element.maxLength))
        }

        public VisitInvalidEmail(element: Contact.Error.InvalidEmail): void {
            this.accumulator.push(new ViewModel.InvalidEmail(element.value))
        }

        public VisitConnectionError(): void {
            this.accumulator.push(new EmailServicePresenter.ViewModel.ConnectionError)
        }
    }

    export type Response = Result<ViewModel.Success, ReadonlyArray<ViewModel.Error>>

    export namespace ViewModel {
        export type Error =
            ViewModel.NameRequired |
            ViewModel.NameTooLong |
            ViewModel.MessageRequired |
            ViewModel.MessageTooLong |
            ViewModel.EmailRequired |
            ViewModel.EmailTooLong |
            ViewModel.InvalidEmail |
            EmailServicePresenter.ViewModel.ConnectionError

        export class Success {
            public readonly code = "SUCCESS"
            public readonly message = "Contato recebido. Por favor, verifique sua caixa de email."
        }

        export class NameRequired {
            public readonly code = "NAME_REQUIRED"
            public readonly message = "O nome é obrigatório."
        }

        export class NameTooLong {
            public readonly code = "NAME_TOO_LONG"
            public readonly message: string

            constructor(
                public readonly value: string,
                public readonly maxLength: number
            ) {
                this.message = `O nome deve conter no máximo ${this.maxLength} caracteres.`
            }
        }

        export class MessageRequired {
            public readonly code = "MESSAGE_REQUIRED"
            public readonly message = "A mensagem é obrigatória."
        }

        export class MessageTooLong {
            public readonly code = "MESSAGE_TOO_LONG"
            public readonly message: string

            constructor(
                public readonly value: string,
                public readonly maxLength: number
            ) {
                this.message = `A mensagem deve conter no máximo ${this.maxLength} caracteres.`
            }
        }

        export class EmailRequired {
            public readonly code = "EMAIL_REQUIRED"
            public readonly message = "O email é obrigatório."
        }

        export class EmailTooLong {
            public readonly code = "EMAIL_TOO_LONG"
            public readonly message: string

            constructor(
                public readonly value: string,
                public readonly maxLength: number
            ) {
                this.message = `O email deve conter no máximo ${this.maxLength} caracteres.`
            }
        }

        export class InvalidEmail {
            public readonly code = "INVALID_EMAIL"
            public readonly message = "Formato de email inválido."

            constructor(
                public readonly value: string
            ) { }
        }
    }
}
