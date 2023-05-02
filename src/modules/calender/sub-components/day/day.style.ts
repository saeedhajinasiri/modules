export const DAY_CONTAINER = 'flex justify-center mx-2.5 md:mx-5 items-center my-2 text-center relative rounded-full font-family-medium text-m-lg'


export const NORMAL_DAY = (selectedDay?: boolean) => {
  if (selectedDay) {
    return 'text-white'
  }

  return 'text-black hover:text-black'
}