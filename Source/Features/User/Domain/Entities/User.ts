import { Result } from "@/Core/Base/Result"
import { StringAssertion } from "@/Core/Domain/Assertions/StringAssertion/StringAssertion"
import { DomainRegistry } from "@/Core/Domain/DomainRegistry"

export class User {
    private _name = ""
    private _email = ""
    private _password = ""

    private constructor(
        public readonly id: string
    ) { }

    public get name(): string {
        return this._name
    }

    public get email(): string {
        return this._email
    }

    public get password(): string {
        return this._password
    }

    public static Create(id: string, name: string, email: string, password: string): Result<User, StringAssertion[]> {
        const user = new User(id)

        const setters = [
            user.SetName(name),
            user.SetEmail(email),
            user.SetPassword(password)
        ]

        if (Result.SomeFailure(setters)) return Result.FlattenFailures(setters)

        return Result.Success(user)
    }

    public SetName(name: string): Result<void, StringAssertion> {
        const assertions = [
            StringAssertion.AssertRequired("name", name),
            StringAssertion.AssertMaxLength("name", name, 250)
        ]

        if (Result.SomeFailure(assertions)) return Result.GetFirstFailure(assertions)

        this._name = name

        return Result.Success()
    }

    public SetEmail(email: string): Result<void, StringAssertion> {
        const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        const assertions = [
            StringAssertion.AssertRequired("email", email),
            StringAssertion.AssertMaxLength("email", email, 250),
            StringAssertion.AssertMatches("email", email, EMAIL_REGEX)
        ]

        if (Result.SomeFailure(assertions)) return Result.GetFirstFailure(assertions)

        this._email = email

        return Result.Success()
    }

    public SetPassword(password: string): Result<void, StringAssertion> {
        const assertion = StringAssertion.AssertLengthBetween("password", password, 6, 100)

        if (assertion.isFailure) return assertion

        this._password = DomainRegistry.encryptionService.Encrypt(password)

        return Result.Success()
    }
}
