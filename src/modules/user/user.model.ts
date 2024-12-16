import { model, Schema } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import config from '../../app/config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

//!document middleware
//pre save hook/middleware: will work on create() save()
userSchema.pre('save', async function (next) {
  //hashing password and then save to db
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

//post save hook/middleware
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.doesUserExistsByCustomID = async function (id: string) {

  return await User.findOne({ id });

};

userSchema.statics.isPasswordMatching = async function(plainPassword, hashedPassword) {
   return await bcrypt.compare(plainPassword, hashedPassword)
}

export const User = model<IUser, UserModel>('User', userSchema);
