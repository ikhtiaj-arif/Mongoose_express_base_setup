import { TAcademicSemesterCodes, TAcademicSemesterNames, TAcaSemNameMap, TMonths } from "./accademicSemester.interface";

export const Months: TMonths[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  
  export const AcademicSemesterNames: TAcademicSemesterNames[] = [
    'Autumn',
    'Summer',
    'Fall',
  ];
  
  export const AcademicSemesterCodes: TAcademicSemesterCodes[] = [
    '01',
    '02',
    '03',
  ];

  
 //semester name --> code are similar or not? Autumn will be 01, summer will be 02, fall will be 03
  export const academicSemesterNameMapper: TAcaSemNameMap = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  };