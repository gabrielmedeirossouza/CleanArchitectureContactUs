export namespace EmailService {
    export namespace Error {
        interface Element {
            Accept(visitor: Visitor): void
        }

        export interface Visitor {
            VisitConnectionError(element: ConnectionError): void
        }

        export class ConnectionError implements Element {
            public readonly code = "CONNECTION_ERROR"
            public readonly message = "A unexpected connection error with email service has occurred."

            public Accept(visitor: Visitor): void {
                visitor.VisitConnectionError(this)
            }
        }
    }
}
