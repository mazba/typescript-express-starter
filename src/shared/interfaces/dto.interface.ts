export interface IDto {
validate(): Promise<void>;
transform<T>(data: Record<string, any>): T;
}