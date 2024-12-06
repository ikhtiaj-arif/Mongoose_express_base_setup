// import { UserServices } from './user.service';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendREsponse';
import { AcademicSemesterServices } from './acdemicSemester.services';

const {
  createAcademicSemesterInToDB,
  getAllAcademicSemestersFromDB,
  getAcademicSemesterFromDB,
  updateAcademicSemesterFromDB,
} = AcademicSemesterServices;

const createAcademicSemester = catchAsync(async (req, res, next) => {
  const result = await createAcademicSemesterInToDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic semester is created successfully!',
    data: result,
  });
});
const getAllAcademicSemesters = catchAsync(async (req, res, next) => {
  const result = await getAllAcademicSemestersFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrieved Academic semesters successfully!',
    data: result,
  });
});
const getAcademicSemester = catchAsync(async (req, res, next) => {
  const id = req.params.semesterId;
  const result = await getAcademicSemesterFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrieved Academic semesters successfully!',
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res, next) => {
  const id = req.params.semesterId;
  const data = req.body;

  const result = await updateAcademicSemesterFromDB(id, data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrieved Academic semesters successfully!',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getAcademicSemester,
  updateAcademicSemester
};
