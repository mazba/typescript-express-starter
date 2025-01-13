export interface ITransformer {
    transform<T>(data: Record<string, any>, targetClass: new () => T): T;
}