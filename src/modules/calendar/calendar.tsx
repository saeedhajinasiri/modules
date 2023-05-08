import React, {useEffect, useState} from "react";
import Days from "./sub-components/days/days";
import {IDays} from './config'
import {daysInMonth} from "./config/daysIn-month";
import {CalendarProps} from "./calendar.props";
import formatDate from './shared/formatDate'
import {Div} from '@pezeshk-book/ui-kit'
import DateObject from "react-date-object";

interface IState {
  value: any
  initialValue?: any
  cloneDays: any
  monthName: string
  month: number | string
  year: string
  days: IDays[]
}

const Calender = (selectedDate = new Date(), selectedDayCallback: CalendarProps) => {

  const date = new DateObject(selectedDate = new Date())

  const [datepicker, setDatepicker] = useState<IState>({
    value: formatDate(selectedDate, 'YYYY/MM/DD'),
    cloneDays: date,
    monthName: "",
    month: "",
    year: "",
    days: [],
  });

  useEffect(() => {
    const {monthName, month, days, year} = daysInMonth(datepicker.cloneDays);
    setDatepicker({
      ...datepicker,
      year: year,
      monthName: monthName,
      month: month,
      days: days,
      initialValue: null,
    })
  });

  const changeMonths = (amount: any) => {
    setDatepicker({
      ...datepicker,
      cloneDays: datepicker.cloneDays.add(amount, "month"),
    });
  };

  const selectDay = (e: React.SyntheticEvent<EventTarget>) => {
    const faDate = (e.target as HTMLHtmlElement).dataset.fadate;
    if (faDate) {
      selectedDayCallback(faDate)
    }
    setDatepicker({
      ...datepicker,
      value: faDate,
    });
  };

  const daysEventListeners = () => {
    return {
      onClick: selectDay,
    };
  };

  return (
    <Div dir={'rtl'} className={"items-center flex flex-col justify-center bg-white rounded py-4"}>
      <Days
        days={datepicker.days}
        monthName={datepicker.monthName}
        year={datepicker.year}
        selectedDay={datepicker.value}
        daysEventListeners={daysEventListeners}
        increaseMonth={() => changeMonths(1)}
        decreaseMonth={() => changeMonths(-1)}
        isDatePicker
      />
    </Div>
  );
}

export default Calender