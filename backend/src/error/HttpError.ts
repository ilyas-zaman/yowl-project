import { ErrorMessage, HttpStatusCode } from "../tools";

class HttpError extends Error {

    public code;
    public errors: Record<string, unknown> = {};

    constructor(code: HttpStatusCode, errors?: Record<string, ErrorMessage[]>) {
        super();
        this.code = code;
        if(errors) this.errors = errors;
    }
}

export default HttpError;