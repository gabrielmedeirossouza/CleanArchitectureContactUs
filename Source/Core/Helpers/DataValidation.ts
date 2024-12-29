export class DataValidation {
    public static IsString(value: any): boolean {
        return typeof value === "string"
    }

    public static IsNumber(value: any): boolean {
        return typeof value === "number"
    }

    public static IsBoolean(value: any): boolean {
        return typeof value === "boolean"
    }

    public static IsArray(value: any): boolean {
        return Array.isArray(value)
    }

    public static IsArrayOfStrings(value: any): boolean {
        return this.IsArray(value) && value.every((item: any) => this.IsString(item))
    }

    public static IsArrayOfNumbers(value: any): boolean {
        return this.IsArray(value) && value.every((item: any) => this.IsNumber(item))
    }

    public static IsArrayOfBooleans(value: any): boolean {
        return this.IsArray(value) && value.every((item: any) => this.IsBoolean(item))
    }
}
