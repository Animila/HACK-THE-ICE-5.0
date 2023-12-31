module.exports = class ApiError extends Error {
    status: number;
    errors: any;

    constructor(status: number, message: string, errors: any = []) {
        super(message);
        this.status = status
        this.errors = errors
    }

    static NotFound() {
        return new ApiError(404, 'Не найдено')
    }

    static IsNotEmpty() {
        return new ApiError(401, 'Такой объект уже есть')
    }

    static BadRequest(message: string, errors = []) {
        return new ApiError(400, message, errors)
    }
}