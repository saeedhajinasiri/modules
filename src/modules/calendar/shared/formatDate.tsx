import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";

export default function formatDate(data: Date | number | string, format: 'YYYY/MM/DD') {
  if (data) {
    const date = new DateObject(data)
    date.calendar = persian
    return date.format(format);
  }
  return null;
}