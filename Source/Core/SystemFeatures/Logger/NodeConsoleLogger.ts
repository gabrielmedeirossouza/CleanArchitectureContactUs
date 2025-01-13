import { Logger } from "./Logger"

export class NodeConsoleLogger implements Logger {
    public Log(namespace: string, message: string): void {
        console.log(`${namespace}: ${message}`)
    }
}
