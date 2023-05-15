export const DAY_CONTAINER = 'flex justify-center mx-2.5 md:mx-5 !text-primary-700 items-center my-2 text-center relative rounded-full font-family-medium'

export const NORMAL_DAY = (selectedDay?: boolean) => {
  if (selectedDay) {
    return 'text-white'
  }
  return '!text-primary-400'
}