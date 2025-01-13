import { Result } from "@/Core/Base/Result"
import { StringAssertion } from "@/Core/Domain/Assertions/StringAssertion/StringAssertion"

export class Contact {
    private _name = ""
    private _email = ""
    private _message = ""

    private constructor(
        public readonly id: string
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

    public static Create(id: string, name: string, email: string, message: string): Result<Contact, StringAssertion[]> {
        const contact = new Contact(id)

        const assertions = [
            contact.SetName(name),
            contact.SetEmail(email),
            contact.SetMessage(message)
        ]

        if (Result.SomeFailure(assertions)) return Result.FlattenFailures(assertions)

        return Result.Success(contact)
    }

    public SetName(name: string): Result<void, StringAssertion> {
        const assertions = [
            StringAssertion.AssertRequired("name", name),
            StringAssertion.AssertMaxLength("name", name, 200)
        ]

        if (Result.SomeFailure(assertions)) return Result.GetFirstFailure(assertions)

        this._name = name

        return Result.Success()
    }

    public SetEmail(email: string): Result<void, StringAssertion> {
        const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        const assertions = [
            StringAssertion.AssertRequired("email", email),
            StringAssertion.AssertMaxLength("email", email, 500),
            StringAssertion.AssertMatches("email", email, EMAIL_REGEX)
        ]

        if (Result.SomeFailure(assertions)) return Result.GetFirstFailure(assertions)

        this._email = email

        return Result.Success()
    }

    public SetMessage(message: string): Result<void, StringAssertion> {
        const assertions = [
            StringAssertion.AssertRequired("message", message),
            StringAssertion.AssertLengthBetween("message", message, 25, 500)
        ]

        if (Result.SomeFailure(assertions)) return Result.GetFirstFailure(assertions)

        this._message = message

        return Result.Success()
    }
}
