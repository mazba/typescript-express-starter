export interface IValidator {
validate(target: any): Promise<void>;
}