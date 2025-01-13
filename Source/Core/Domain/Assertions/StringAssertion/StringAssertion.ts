import { Result } from "@/Core/Base/Result"
import { StringMismatch } from "./Errors/StringMismatch"
import { StringOutsideRange } from "./Errors/StringOutsideRange"
import { StringRequired } from "./Errors/StringRequired"
import { StringTooLong } from "./Errors/StringTooLong"
import { StringTooShort } from "./Errors/StringTooShort"

export type StringAssertion = StringRequired | StringTooShort | StringTooLong | StringOutsideRange | StringMismatch

export const StringAssertion = class {
    public static AssertRequired(argument: string, value: string): Result<void, StringRequired> {
        if (value === "") {
            return Result.Failure({
                code: "string_required",
                argument,
                message: `Argument [${argument}] is required.`
            } as const)
        }

        return Result.Success()
    }

    public static AssertLengthBetween(argument: string, value: string, minLength: number, maxLength: number): Result<void, StringOutsideRange> {
        if (value.length < minLength || value.length > maxLength) {
            return Result.Failure({
                code: "string_outside_range",
                argument,
                value,
                minLength,
                maxLength,
                message: `Argument [${argument}] must be between ${minLength} and ${maxLength} characters.`
            } as const)
        }

        return Result.Success()
    }

    public static AssertMinLength(argument: string, value: string, minLength: number): Result<void, StringTooShort> {
        if (value.length < minLength) {
            return Result.Failure({
                code: "string_too_short",
                argument,
                value,
                minLength,
                message: `Argument [${argument}] must be at least ${minLength} characters.`
            } as const)
        }

        return Result.Success()
    }

    public static AssertMaxLength(argument: string, value: string, maxLength: number): Result<void, StringTooLong> {
        if (value.length > maxLength) {
            return Result.Failure({
                code: "string_too_long",
                argument,
                value,
                maxLength,
                message: `Argument [${argument}] must be at most ${maxLength} characters.`
            } as const)
        }

        return Result.Success()
    }

    public static AssertMatches(argument: string, value: string, pattern: RegExp): Result<void, StringMismatch> {
        if (!pattern.test(value)) {
            return Result.Failure({
                code: "string_mismatch",
                argument,
                value,
                pattern,
                message: `Argument [${argument}] does not match the pattern.`
            } as const)
        }

        return Result.Success()
    }
}
