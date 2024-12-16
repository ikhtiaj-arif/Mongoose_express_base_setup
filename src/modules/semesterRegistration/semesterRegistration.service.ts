import QueryBuilder from '../../app/builder/QueryBuilder';
import AppError from '../../app/errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { SemesterRegStatus } from './semesterRegistration.constants';
import { ISemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
  payload: ISemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  //check if theres any registered semester that is already 'UPCOMING' | 'ONGOING'
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        {
          status: SemesterRegStatus.UPCOMING,
        },
        {
          status: SemesterRegStatus.ONGOING,
        },
      ],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      400,
      `There is already an ${isThereAnyUpcomingOrOngoingSemester?.status} registered semester!`,
    );
  }

  //check if the semester exists or not
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExists) {
    throw new AppError(400, 'Academic semester not found!');
  }

  //check if the semester is already registered
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(400, 'Semester already registered!');
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getOneSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<ISemesterRegistration>,
) => {
  //!check if the requested registered semester does exist?
  const doesRegisterSemesterExists = await SemesterRegistration.findById(id);

  if (!doesRegisterSemesterExists) {
    throw new AppError(400, 'Semester not found!');
  }

  //! check if the requested semester registration has ended, we will not update anything
  const currentSemesterStatus = doesRegisterSemesterExists?.status;
  const requestedStatus = payload?.status;

  if (currentSemesterStatus === SemesterRegStatus.ENDED) {
    throw new AppError(
      400,
      `This semester has already ${currentSemesterStatus}!`,
    );
  }

  //! UPCOMING --> ONGOING --> ENDED
  if (
    currentSemesterStatus === SemesterRegStatus.UPCOMING &&
    requestedStatus === SemesterRegStatus.ENDED
  ) {
    throw new AppError(
      400,
      `You can't directly change status from ${currentSemesterStatus} to ${requestedStatus}!`,
    );
  }

  if (
    currentSemesterStatus === SemesterRegStatus.ONGOING &&
    requestedStatus === SemesterRegStatus.UPCOMING
  ) {
    throw new AppError(
      400,
      `You can't directly change status from ${currentSemesterStatus} to ${requestedStatus}!`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getOneSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
