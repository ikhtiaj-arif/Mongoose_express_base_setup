import { TDays, TSchedule } from './offeredCourse.interface';

export const hasTimeConflict = (
  assignedSchedules: TSchedule[],
  newScheduled: TSchedule,
) => {
  // const newScheduled = { days, startTime, endTime };

  for(const schedule of assignedSchedules ){
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`);
    const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`);
    const newStartTime = new Date(`1970-01-01T${newScheduled.startTime}`);
    const newEndTime = new Date(`1970-01-01T${newScheduled.endTime}`);

    //existing  10:30-12:30
    //new       9:30-10:30
    //this condition will work only if the time is after the existing time
    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      return true;
    }
  }

  return false;
};
