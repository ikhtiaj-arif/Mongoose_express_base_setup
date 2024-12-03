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

export type TAcaSemNameMap = {
  [key: string]: string;
};

export interface IAcademicSemester {
  name: 'Autumn' | 'Summer' | 'Fall';
  code: '01' | '02' | '03';
  year: String;
  startMonth: TMonths;
  endMonth: TMonths;
}
