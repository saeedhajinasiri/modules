import React from 'react';
import CustomCalendar from '../../modules/calendar'
import {CalendarProps} from "../../modules/calendar/calendar.props";

/**
 * Primary UI component for user interaction
 */
export const Calendar = ({...props}: CalendarProps) => {
  return (
    <CustomCalendar {...props}/>
  );
};