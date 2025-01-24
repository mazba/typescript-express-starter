export interface IDto {
validate(): Promise<void>;
transform<T>(data: Record<string, any>): T;
}
//TODO: ---- IBaseDto > ?
export interface IBaseDto {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }