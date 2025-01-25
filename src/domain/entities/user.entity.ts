import { BaseEntity, EntityProps } from "./base.entity";
import { Getter } from "../../shared/decorators/getter.decorator";

export interface UserProps extends EntityProps {
  name: string;
  email: string;
  mobile: string;
}

export default class User extends BaseEntity<UserProps> {
  @Getter name: string;
  @Getter email: string;
  @Getter mobile: string;

  constructor(props: UserProps) {
    super(props);
  }

  // Factory method to create a User entity
  static create(props: UserProps): User {
    return new User(props);
  }

  // Validation logic
  protected validate(): void {
    if (!this.props.name || this.props.name.trim().length === 0) {
      throw new Error("Name is required");
    }
    if (!this.props.email || !this.isValidEmail(this.props.email)) {
      throw new Error("Invalid email address");
    }
    if (!this.props.mobile || !this.isValidMobile(this.props.mobile)) {
      throw new Error("Invalid mobile number");
    }
  }

  private isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  private isValidMobile(mobile: string): boolean {
    const regex = /^\d{10}$/;
    return regex.test(mobile);
  }

  static fromPersistence(userDoc: any): User {
    return User.create({
      id: userDoc.id,
      name: userDoc.name,
      email: userDoc.email,
      mobile: userDoc.mobile,
    });
  }
}