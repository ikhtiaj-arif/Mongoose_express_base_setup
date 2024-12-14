import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendREsponse';
import { AdminServices } from './admin.service';

const { getAllAdminsFromDB, getOneAdminFromDB,updateOneAdminIntoDB } = AdminServices;

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await getAllAdminsFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrieved all Admins!',
    data: result,
  });
});

const getOneAdmin = catchAsync(async (req, res) => {
  const adminID = req.params.id;
  const result = await getOneAdminFromDB(adminID);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrieved  Admin!',
    data: result,
  });
});
const updateOneAdmin = catchAsync(async (req, res) => {
  const adminID = req.params.id;
  const payload = req.body.admin
  const result = await updateOneAdminIntoDB(adminID,payload);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully updated Admin!',
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmins,
  getOneAdmin,
  updateOneAdmin,
};
