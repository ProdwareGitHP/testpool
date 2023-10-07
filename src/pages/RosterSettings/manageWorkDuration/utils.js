import moment from "moment";

export const getTimeFormat = (time) => {
  if (time) {
    return moment(time).format("LT");
  }
  return "";
};
