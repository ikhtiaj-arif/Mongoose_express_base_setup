// import { UserServices } from './user.service';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendREsponse';
import { AcademicDepartmentServices } from './academicDepartment.services';

const {
  createAcademicDepartmentInToDB,
  getAllAcademicDepartmentsFromDB,
  getAcademicDepartmentFromDB,
  updateAcademicDepartmentFromDB,
} = AcademicDepartmentServices;

const createAcademicDepartment = catchAsync(async (req, res, next) => {
  const result = await createAcademicDepartmentInToDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Department is created successfully!',
    data: result,
  });
});
const getAllAcademicDepartments = catchAsync(async (req, res, next) => {
  const result = await getAllAcademicDepartmentsFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrieved All Academic Departments successfully!',
    data: result,
  });
});

const getAcademicDepartment = catchAsync(async (req, res, next) => {
  const id = req.params.departmentId;
  const result = await getAcademicDepartmentFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrieved One Academic Departments successfully!',
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res, next) => {
  const id = req.params.departmentId;
  const data = req.body;

  const result = await updateAcademicDepartmentFromDB(id, data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrieved Academic Departments successfully!',
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  updateAcademicDepartment,
  getAcademicDepartment,
  getAllAcademicDepartments,
};
