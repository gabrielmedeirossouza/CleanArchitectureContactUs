type Success<T> = {
    isSuccess: true
    isFailure: false
    readonly value: T
};

type Failure<K> = {
    isSuccess: false
    isFailure: true
    readonly value: K
};

export type Result<T, K> = Success<T> | Failure<K>;

export const Result = class {
    public static Success(value: void): Success<void>
    public static Success<T>(value: T): Success<T>
    public static Success<T>(value: T): Success<T> {
        return {
            isSuccess: true,
            isFailure: false,
            value
        }
    }

    public static Failure<K>(value: K): Failure<K> {
        return {
            isSuccess: false,
            isFailure: true,
            value
        }
    }

    public static SomeSuccess<T extends Result<any, any>>(results: T[]): results is [Extract<T, Success<any>>, ...T[]] {
        return results.some(result => result.isSuccess)
    }

    public static IsEverySuccess<T extends Result<any, any>>(results: T[]): results is Extract<T, Success<any>>[] {
        return results.every(result => result.isSuccess)
    }

    public static GetFirstSuccess<T extends [Success<any>, ...Result<any, any>[]]>(results: T): Success<any> {
        return results.find(result => result.isSuccess)!
    }

    public static ExtractSuccessValues<T extends Result<any, any>>(results: T[]): Success<any>[] {
        return results.filter(result => result.isSuccess).map(result => result.value)
    }

    public static FlattenSuccess<T extends Result<any, any>>(results: T[]): Success<Extract<T, Success<any>>["value"][]> {
        return Result.Success(Result.ExtractSuccessValues(results))
    }

    public static SomeFailure<T extends Result<any, any>>(results: T[]): results is [Extract<T, Failure<any>>, ...T[]] {
        return results.some(result => result.isFailure)
    }

    public static IsEveryFailure<T extends Result<any, any>>(results: T[]): results is Extract<T, Failure<any>>[] {
        return results.every(result => result.isFailure)
    }

    public static GetFirstFailure<T extends [Failure<any>, ...Result<any, any>[]]>(results: T): Failure<any> {
        return results.find(result => result.isFailure)!
    }

    public static ExtractFailureValues<T extends Result<any, any>>(results: T[]): Failure<any>[] {
        return results.filter(result => result.isFailure).map(result => result.value)
    }

    public static FlattenFailures<T extends Result<any, any>>(results: T[]): Failure<Extract<T, Failure<any>>["value"][]> {
        return Result.Failure(Result.ExtractFailureValues(results))
    }
}

export namespace Result {
    export type PickSuccess<T extends Result<any, any>> = Extract<T, Success<any>>["value"]

    export type PickFailures<T extends Result<any, any>> = Extract<T, Failure<any>>["value"]
}
