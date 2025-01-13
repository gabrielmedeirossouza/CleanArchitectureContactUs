import { Logger } from "./Logger"
import { NodeConsoleLogger } from "./NodeConsoleLogger"

export class LoggerFactory {
    public static Create(): Logger {
        return new NodeConsoleLogger()
    }
}
