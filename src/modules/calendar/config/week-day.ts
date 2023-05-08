export const fa = (n: any) => {
  if (process.env.NODE_ENV === "test") {
    return n;
  }
  return Number(n).toLocaleString("fa", {
    useGrouping: false,
  });
};

export const weekDayNames = ["ش", "ی", "د", "س", "چ", "پ", "ج"];