export interface Logger {
    readonly namespace: string;
    Log(message: string): void;
}

export namespace Logger {
    export enum Severity {
        Normal = "Normal",
        Unexpected = "Unexpected",
        Error = "Error",
    }
}
