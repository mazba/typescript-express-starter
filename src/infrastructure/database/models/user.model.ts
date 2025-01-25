import bcrypt from 'bcrypt';
import { Schema, model, Document } from 'mongoose';
export interface IUser {
  name: string;
  email: string;
  mobile: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface UserDocument extends IUser,Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    mobile: {
      type: String,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        return ret;
      }
    }
  }
);

// Password hash middleware
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Password comparison method
UserSchema.methods.comparePassword = async function(
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};
// This transform function is modifies the object by adding an "id" field that is a copy of the _id field, and removing the _id and __v fields.
UserSchema.set('toObject', {
  transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
  }
});
// This transform function is modifies the object by adding an "id" field that is a copy of the _id field, and removing the _id and __v fields.
UserSchema.set('toJSON', {
  transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
  }
});
export const UserModel = model<UserDocument>('User', UserSchema);