export namespace Http {
    export interface Request {
        readonly headers: Record<any, any>,
        readonly body: Record<any, any>
    }

    export interface Response {
        Send(status: Response.Status, data: any): void
    }

    export namespace Response {
        export enum Status {
            Ok = 200,
            ResourceCreated = 201,
            BadRequest = 400,
            Unauthorized = 401,
            Forbidden = 403,
            NotFound = 404,
            InternalServerError = 500
        }
    }
}
