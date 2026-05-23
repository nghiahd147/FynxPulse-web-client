import moment from "moment";

export const convertYearMonthDay = (date: string) => {
  return moment(date).utc().format("YYYY-MM-DD");
};
