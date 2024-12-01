export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TAcademicSemesterNames = 'Autumn' | 'Summer' | 'Fall';

export type TAcademicSemesterCodes = '01' | '02' | '03';

export interface IAcademicSemester {
  name: 'Autumn' | 'Summer' | 'Fall';
  code: '01' | '02' | '03';
  year: Date;
  startMonth: TMonths;
  endMonth: TMonths;
}
