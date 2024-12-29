import { Logger } from "./Logger"

export class NodeConsoleLogger implements Logger {
    constructor(
        public readonly namespace: string
    ) { }

    public Log(message: string): void {
        console.log(`${this.namespace}: ${message}`)
    }
}
