import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendREsponse";
import { OfferedCourseServices } from "./offeredCourse.services";

const {createOfferedCourseIntoDB} = OfferedCourseServices

const createOfferedCourse = catchAsync(async (req, res) => {
    const result = await createOfferedCourseIntoDB(req.body);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Offered Course created successfully!',
      data: result,
    });
  });



  export const OfferedCourseControllers = {
    createOfferedCourse
  }