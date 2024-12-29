import { Result } from "@/Core/Base/Result"

export class Contact {
    private constructor(
        private readonly _name: string,
        private readonly _email: string,
        private readonly _message: string
    ) { }

    public get name(): string {
        return this._name
    }

    public get message(): string {
        return this._message
    }

    public get email(): string {
        return this._email
    }

    public static Create(name: string, email: string, message: string): Contact.CreateResponse {
        const errorAccumulator: Array<Contact.Error.All> = []

        const errors = [
            this.ValidateName(name),
            this.ValidateMessage(message),
            this.ValidateEmail(email)
        ]

        for (const error of errors) {
            if (!error.ok) errorAccumulator.push(error.value)
        }

        if (errorAccumulator.length) return Result.Fail(errorAccumulator)

        const contact = new Contact(name, email, message)

        return Result.Ok(contact)
    }

    private static ValidateName(name: string): Result<void, Contact.Error.NameRequired | Contact.Error.NameTooLong> {
        if (!name) return Result.Fail(new Contact.Error.NameRequired)

        const MAX_LENGTH = 250
        if (name.length > MAX_LENGTH) return Result.Fail(new Contact.Error.NameTooLong(name, MAX_LENGTH))

        return Result.Ok()
    }

    private static ValidateEmail(email: string): Result<void, Contact.Error.InvalidEmail | Contact.Error.EmailRequired | Contact.Error.EmailTooLong> {
        if (!email) return Result.Fail(new Contact.Error.EmailRequired)

        const MAX_LENGTH = 1000
        if (email.length > MAX_LENGTH) return Result.Fail(new Contact.Error.EmailTooLong(email, MAX_LENGTH))

        const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const invalidEmail = !EMAIL_REGEX.test(email)
        if (invalidEmail) return Result.Fail(new Contact.Error.InvalidEmail(email))

        return Result.Ok()
    }

    private static ValidateMessage(message: string): Result<void, Contact.Error.MessageRequired | Contact.Error.MessageTooLong> {
        if (!message) return Result.Fail(new Contact.Error.MessageRequired)

        const MAX_LENGTH = 1000
        if (message.length > MAX_LENGTH) return Result.Fail(new Contact.Error.MessageTooLong(message, MAX_LENGTH))

        return Result.Ok()
    }
}

export namespace Contact {
    export type CreateResponse = Result<Contact, ReadonlyArray<Error.All>>

    export namespace Error {
        interface Element {
            Accept(visitor: Visitor): void
        }

        export interface Visitor {
            VisitNameRequired(element: NameRequired): void
            VisitNameTooLong(element: NameTooLong): void
            VisitMessageRequired(element: MessageRequired): void
            VisitMessageTooLong(element: MessageTooLong): void
            VisitEmailRequired(element: EmailRequired): void
            VisitInvalidEmail(element: InvalidEmail): void
            VisitEmailTooLong(element: EmailTooLong): void
        }

        export type All =
            Error.NameRequired |
            Error.NameTooLong |
            Error.MessageRequired |
            Error.MessageTooLong |
            Error.EmailRequired |
            Error.EmailTooLong |
            Error.InvalidEmail

        export class NameRequired implements Element {
            public readonly code = "NAME_REQUIRED"
            public readonly message = "Contact name is required."

            public Accept(visitor: Visitor): void {
                visitor.VisitNameRequired(this)
            }
        }

        export class NameTooLong implements Element {
            public readonly code = "NAME_TOO_LONG"
            public readonly message: string

            constructor(
                public readonly value: string,
                public readonly maxLength: number
            ) {
                this.message = `Name must be a maximum of ${this.maxLength} characters. Given value [${this.value}].`
            }

            public Accept(visitor: Visitor): void {
                visitor.VisitNameTooLong(this)
            }
        }

        export class MessageRequired implements Element {
            public readonly code = "MESSAGE_REQUIRED"
            public readonly message = "Message is required."

            public Accept(visitor: Visitor): void {
                visitor.VisitMessageRequired(this)
            }
        }

        export class MessageTooLong implements Element {
            public readonly code = "MESSAGE_TOO_LONG"
            public readonly message: string

            constructor(
                public readonly value: string,
                public readonly maxLength: number
            ) {
                this.message = `Message must be a maximum of ${this.maxLength} characters. Given value [${this.value}].`
            }

            public Accept(visitor: Visitor): void {
                visitor.VisitMessageTooLong(this)
            }
        }

        export class EmailRequired implements Element {
            public readonly code = "EMAIL_REQUIRED"
            public readonly message = "Email is required."

            public Accept(visitor: Visitor): void {
                visitor.VisitEmailRequired(this)
            }
        }

        export class InvalidEmail implements Element {
            public readonly code = "INVALID_EMAIL"
            public readonly message: string

            constructor(
                public readonly value: string
            ) {
                this.message = `Email is invalid. Given value [${this.value}].`
            }

            public Accept(visitor: Visitor): void {
                visitor.VisitInvalidEmail(this)
            }
        }

        export class EmailTooLong implements Element {
            public readonly code = "EMAIL_TOO_LONG"
            public readonly message: string

            constructor(
                public readonly value: string,
                public readonly maxLength: number
            ) {
                this.message = `Email must be a maximum of ${this.maxLength} characters. Given value [${this.value}].`
            }

            public Accept(visitor: Visitor): void {
                visitor.VisitEmailTooLong(this)
            }
        }
    }
}

