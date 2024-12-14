import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendREsponse';
import { SemesterRegistration } from './semesterRegistration.model';
import { SemesterRegistrationServices } from './semesterRegistration.service';

const {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getOneSemesterRegistrationFromDB,updateSemesterRegistrationIntoDB
} = SemesterRegistrationServices;

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result = await createSemesterRegistrationIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Semester Registration is created successfully!',
    data: result,
  });
});
const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result = await getAllSemesterRegistrationFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Semester Registration retrieved successfully!',
    data: result,
  });
});
const getOneSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getOneSemesterRegistrationFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Semester Registration retrieved successfully!',
    data: result,
  });
});
const updateSemesterRegistration = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await updateSemesterRegistrationIntoDB(id, req.body);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Semester Registration retrieved successfully!',
      data: result,
    });
});

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getOneSemesterRegistration,
  updateSemesterRegistration,
};
