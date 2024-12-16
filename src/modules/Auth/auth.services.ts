import config from '../../app/config';
import AppError from '../../app/errors/AppError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';

const loginUserIntoDB = async (payload: ILoginUser) => {
  // check if the user exists
  const existingUserData = await User.doesUserExistsByCustomID(payload?.id);
  if (!existingUserData) {
    throw new AppError(404, 'User not found!');
  }

  //check the user is deleted or not
  const isUserDeleted = existingUserData?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(403, 'The user is deleted!');
  }

  //check the user is blocked or not
  const userStatus = existingUserData?.status;
  if (userStatus === 'blocked') {
    throw new AppError(403, 'The user is blocked!');
  }

  //checking if the password is correct
  const passwordMatching = await User.isPasswordMatching(
    payload?.password,
    existingUserData?.password,
  );
  if (!passwordMatching) {
    throw new AppError(403, 'Password does not match!');
  }
  //create token and send to the client
  const jwtPayload = {
    userId: existingUserData?.id,
    role: existingUserData?.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
    needsPasswordChange: existingUserData?.needsPasswordChange,
  };
};

export const AuthServices = {
  loginUserIntoDB,
};
