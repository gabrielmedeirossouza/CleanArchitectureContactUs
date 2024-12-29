export namespace EmailServicePresenter {
    export namespace ViewModel {
        export class ConnectionError {
            public readonly code = "INTERNAL_SERVER_ERROR"
            public readonly message = "Houve um problema em nosso sistema. Por favor, tente novamente mais tarde."
        }
    }
}
