import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";

export interface IDays {
  day: number;
  utc: string;
  faDate: string;
  disabled: boolean;
}

export interface IDaysInMonth {
  days: IDays[];
  monthName: string;
  month: number;
  today?: string;
  year: string
}

export const daysInMonth = (date: any): IDaysInMonth => {
  date.calendar = persian
  date.locale = persian_fa
  const monthName = date.month.name
  const {month, year} = date

  const firstDayWeekDay = new DateObject({date: `${year} ${month} 1`, calendar: persian}).weekDay.number;

  // Calculate the number of empty cells needed before the first day of the month
  const emptyCellsCount = (firstDayWeekDay + 6) % 7;

  const lastDayOfPreviousMonth = new DateObject({date: `${year} ${month - 1} 31`, calendar: persian});

  // Calculate the empty days from the previous month
  const emptyDays = [...Array(emptyCellsCount)].map((_, i) => lastDayOfPreviousMonth.month.length - emptyCellsCount + i + 1);

  // Create an array of day objects for the current month
  const currentMonthDays = Array.from({length: date.month.length}, (_, i) => {
    const dayNumber = i + 1;
    const utc = new DateObject({date: `${year} ${month} ${dayNumber}`}).format("YYYY-MM-DD");
    const faDate = new DateObject({date: `${year} ${month} ${dayNumber}`}).format();
    return {day: dayNumber, utc, faDate, disabled: false};
  });

  const allDays = [...emptyDays.map((day) => ({
    day,
    utc: new DateObject({date: (`${year} ${month} ${day}`), calendar: persian}).format("YYYY-MM-DD"),
    faDate: new DateObject({date: (`${year} ${month} ${day}`), calendar: persian}).format(),
    disabled: true
  })), ...currentMonthDays];

  return {monthName, month, days: allDays, year};
};