import React from "react";
import {DayProps} from "./day.props";
import {DAY_CONTAINER, NORMAL_DAY} from "./day.style";
import classNames from '../../../../utils/class-names'
import {Button} from '@pezeshk-book/ui-kit'

export const Day = (props: DayProps) => {
  const {daysEvent, children, disabledDay, holidays, passedDay, selectedDay} = props;

  if (!children) {
    return <Button variant={'outlined'} size={'tiny'} shape={'square'} className={classNames(
      DAY_CONTAINER,
      'cursor-default'
    )} {...props} />
  }
  if (passedDay) {
    return <Button size={'tiny'} variant={'outlined'} color={'success'} shape={'square'} className={classNames(
      DAY_CONTAINER,
      'hover:text-secondary-dark cursor-default'
    )} {...props} />
  }
  if (disabledDay || holidays) {
    return <Button size={'tiny'} color={'danger'} shape={'square'} className={classNames(
      DAY_CONTAINER,
      'cursor-default'
    )} {...props} />;
  }
  if (selectedDay) {
    return <Button size={'tiny'} variant={'outlined'} color={'primary'} shape={'square'} className={classNames(
      DAY_CONTAINER,
      'cursor-default'
    )} {...props} />;
  }
  return <Button variant={'text'} size={'tiny'} shape={'square'} color={'purple'} className={classNames(
    DAY_CONTAINER,
    NORMAL_DAY(selectedDay)
    // @ts-ignore
  )} {...props} {...daysEvent ? daysEvent() : null} />
};