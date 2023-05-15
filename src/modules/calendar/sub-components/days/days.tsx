import React from "react";
import {DaysProps} from './days.props'
import DaysHead from "../days-head/days-head"
import {Day} from "../day/day";
import {chunk, fa, IDays, weekDayNames} from '../../config'
import moment from "jalali-moment";
import formatDate from '../../shared/formatDate'
import {Div, Text} from '@pezeshk-book/ui-kit'

const boolDataset = (arg: boolean) => {
  if (arg) {
    return {
      "data-disable": arg,
    };
  }
  return null;
};

const tempHolidays = ['2023-05-15', '2022-09-25', '2022-09-27', '2022-10-05', '2022-12-27', '2023-02-04', '2023-02-11', '2023-02-18', '2023-03-08', '2023-03-20']

const Days = (props: DaysProps) => {
  const {
    days,
    daysEventListeners,
    monthName,
    increaseMonth,
    decreaseMonth,
    selectedDay,
    year,
  } = props

  if (!days.length) {
    return null;
  }

  const weeks = chunk(days, 7);

  return (
    <Div className={'flex-1 w-[390px] md:w-[560px] px-9 flex-col self-center relative overflow-auto mx-1 bg-white'}>
      <DaysHead
        year={year}
        monthName={monthName}
        increaseMonth={increaseMonth}
        decreaseMonth={decreaseMonth}
      />
      <Div className={'flex-col items-center flex-1 border-separate border-spacing-x-2'} data-testid="days-wrapper">
        <Div className={'items-center self-center w-full justify-between h-[29px] text-white border-b border-tertiary pb-2 mb-2 px-5 md:px-3 md:pr-6 !flex-row'}>
          {weekDayNames.map(name => (
            <Text type={"regular"} typography={"lg"} color={"black"} key={name}>{name}</Text>
          ))}
        </Div>
        {weeks.map((week, idx) => (
          <ul className={'flex m-0 px-2 md:px-0 list-none w-full last:justify-start items-end justify-between self-center '} data-testid="days" key={`rdp-weeks-${idx}`}>
            {week.map((day: IDays, id: any) => (
              <Day
                key={day.utc}
                passedDay={formatDate(Date.now(), 'YYYY/MM/DD') === day.faDate ? false : !moment(day.faDate).isAfter(formatDate(Date.now(), 'YYYY/MM/DD'))}
                holidays={tempHolidays.indexOf(day.utc) !== -1}
                data-testid={`day-${idx * 7 + id + 1}`}
                data-fadate={`${day.faDate}`}
                daysEvent={daysEventListeners}
                disabledDay={week.length === 7 && id === 6}
                selectedDay={selectedDay === day.faDate}
                {...boolDataset(day.disabled)}
              >
                {!day.disabled ? fa(day.day) : null}
              </Day>
            ))}
          </ul>
        ))}
      </Div>
    </Div>
  )
}


Days.defaultProps = {
  monthName: "",
  disableDays: [],
}

export default Days
