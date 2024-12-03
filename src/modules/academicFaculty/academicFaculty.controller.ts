// import { UserServices } from './user.service';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendREsponse';
import { AcademicFacultyServices } from './academicFaculty.services';

const {
  createAcademicFacultyInToDB,
  getAllAcademicFacultiesFromDB,
  getAcademicFacultyFromDB,
  updateAcademicFacultyFromDB,
} = AcademicFacultyServices;

const createAcademicFaculty = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const result = await createAcademicFacultyInToDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculty is created successfully!',
    data: result,
  });
});
const getAllAcademicFaculties = catchAsync(async (req, res, next) => {
  const result = await getAllAcademicFacultiesFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrieved All Academic Faculties successfully!',
    data: result,
  });
});

const getAcademicFaculty = catchAsync(async (req, res, next) => {
  const id = req.params.facultyId;
  const result = await getAcademicFacultyFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrieved One Academic Faculties successfully!',
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res, next) => {
  const id = req.params.facultyId;
  const data = req.body;

  const result = await updateAcademicFacultyFromDB(id, data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrieved Academic Faculties successfully!',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  updateAcademicFaculty,
  getAcademicFaculty,
  getAllAcademicFaculties,
};
