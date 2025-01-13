import { Result } from "@/Core/Base/Result"
import { Http } from "../Http"

export abstract class Controller {
    public abstract Handle(request: Http.Request, response: Http.Response): void

    protected AssertString(argument: string, value: any): Result<void, Controller.ArgumentTypeException> {
        if (typeof value !== "string") {
            return Result.Failure(new Controller.ArgumentTypeException(argument, value, "string"))
        }

        return Result.Success()
    }

    protected AssertNumber(argument: string, value: any): Result<void, Controller.ArgumentTypeException> {
        if (typeof value !== "number") {
            return Result.Failure(new Controller.ArgumentTypeException(argument, value, "number"))
        }

        return Result.Success()
    }

    protected AssertBoolean(argument: string, value: any): Result<void, Controller.ArgumentTypeException> {
        if (typeof value !== "boolean") {
            return Result.Failure(new Controller.ArgumentTypeException(argument, value, "boolean"))
        }

        return Result.Success()
    }

    protected AssertArray(argument: string, value: any): Result<void, Controller.ArgumentTypeException> {
        if (!Array.isArray(value)) {
            return Result.Failure(new Controller.ArgumentTypeException(argument, value, "array"))
        }

        return Result.Success()
    }

    protected AssertArrayOfStrings(argument: string, value: any): Result<void, Controller.ArgumentTypeException> {
        if (!Array.isArray(value)) {
            return Result.Failure(new Controller.ArgumentTypeException(argument, value, "array"))
        }

        for (const item of value) {
            if (typeof item !== "string") {
                return Result.Failure(new Controller.ArgumentTypeException(argument, String(value), "array_of_strings"))
            }
        }

        return Result.Success()
    }

    protected AssertArrayOfNumbers(argument: string, value: any): Result<void, Controller.ArgumentTypeException> {
        if (!Array.isArray(value)) {
            return Result.Failure(new Controller.ArgumentTypeException(argument, value, "array"))
        }

        for (const item of value) {
            if (typeof item !== "number") {
                return Result.Failure(new Controller.ArgumentTypeException(argument, String(value), "array_of_numbers"))
            }
        }

        return Result.Success()
    }

    protected AssertArrayOfBooleans(argument: string, value: any): Result<void, Controller.ArgumentTypeException> {
        if (!Array.isArray(value)) {
            return Result.Failure(new Controller.ArgumentTypeException(argument, value, "array"))
        }

        for (const item of value) {
            if (typeof item !== "boolean") {
                return Result.Failure(new Controller.ArgumentTypeException(argument, String(value), "array_of_booleans"))
            }
        }

        return Result.Success()
    }
}

export namespace Controller {
    export class ArgumentTypeException {
        public readonly code = "argument_type_exception"
        public readonly message: string

        constructor(
            public readonly argument: string,
            public readonly value: string,
            public readonly expectedType: string
        ) {
            this.message = `Argumento [${argument}] deve ser do tipo [${expectedType}].`
        }
    }
}
