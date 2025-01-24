export class BadRequestException extends Error {
    public readonly statusCode = 400;

    constructor(public readonly errors: Record<string, string[]>) {
        super('Validation failed');
        this.name = 'BadRequestException';
    }
}