export interface EntityProps {
  id?: string;
  [key: string]: any; // Allow additional properties
}

export abstract class BaseEntity<T extends EntityProps> {
  constructor(protected readonly props: T) {
    this.validate();
  }

  get id(): string | undefined {
    return this.props.id;
  }

  // Method to assign an ID after saving to the database
  public assignId(id: string): this {
    this.props.id = id;
    return this;
  }

  protected abstract validate(): void;

  static fromPersistence(doc: any): any {
    throw new Error("fromPersistence must be implemented by child classes");
  }
}