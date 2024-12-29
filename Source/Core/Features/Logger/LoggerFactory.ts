import { Logger } from "./Logger"
import { NodeConsoleLogger } from "./NodeConsoleLogger"

export class LoggerFactory {
    public static Create(namespace: string): Logger {
        return new NodeConsoleLogger(namespace)
    }
}
