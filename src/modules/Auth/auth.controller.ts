import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendREsponse';
import { AuthServices } from './auth.services';


const { loginUserIntoDB } = AuthServices



const loginUser = catchAsync(async (req, res) => {

  const result = await loginUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Log in Successful!',
    data: result,
  });
});

export const AuthControllers = {
    loginUser
};
