import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendREsponse';
import { FacultyServices } from './faculty.service';

const { getAllFacultyFromDB, getOneFacultyFromDB, updateFacultyIntoDB } =
  FacultyServices;

const getAllFaculty = catchAsync(async (req, res) => {
  const result = await getAllFacultyFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrieved all Faculties!',
    data: result,
  });
});

const getOneFaculty = catchAsync(async (req, res) => {
  const facultyID = req.params.id;
  const result = await getOneFacultyFromDB(facultyID);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrieved the Faculty!',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const facultyID = req.params.id;
  const payload = req.body.faculty;
  const result = await updateFacultyIntoDB(facultyID, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully updated Faculty!',
    data: result,
  });
});

export const FacultyController = {
  getAllFaculty,
  getOneFaculty,
  updateFaculty,
};
