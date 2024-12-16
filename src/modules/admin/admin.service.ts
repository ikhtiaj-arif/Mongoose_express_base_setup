import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';

const getAllAdminsFromDB = async () => {
  const result = await Admin.find();
  return result;
};
const getOneAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id);
  return result;
};
const updateOneAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingAdminData } = payload;
  const modifiedUpdatedAdminData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedAdminData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findByIdAndUpdate(id, modifiedUpdatedAdminData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const AdminServices = {
  getAllAdminsFromDB,
  getOneAdminFromDB,
  updateOneAdminIntoDB,
};
