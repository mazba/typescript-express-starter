export interface ISaveRepository<T> {
  save(entity: T): Promise<T>;
}

export interface IFindByIdRepository<T> {
  findById(id: string): Promise<T | null>;
}

export interface IGetAllRepository<T> {
  getAll(): Promise<T[]>;
}

export interface IUpdateRepository<T> {
  update(id: string, entity: Partial<T>): Promise<T | null>;
}

export interface IDeleteRepository<T> {
  delete(id: string): Promise<boolean>;
}