import moment from "moment";

var mnths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const dateConverter = (str) => {
  if (!str) return "";
  if (typeof str === "string") {
    if (str.trim() === "") return "";
  }
  return moment(str).format("DD-MMM-YYYY");
};

export const dateDayConverter = (str) => {
  if (!str) return "";
  if (typeof str === "string") {
    if (str.trim() === "") return "";
  }
  return moment(str).format("DD-MMM-YYYY (ddd)");
};

export const datetimeConverter = (str) => {
  if (!str) return "";
  if (typeof str === "string") {
    if (str.trim() === "") return "";
  }
  return moment(str).format("DD-MMM-YYYY hh:mm A");
};

export const timeConverter = (str) => {
  if (!str || str.trim() === "") return "";
  return str.split("-").length > 1 ? moment(str).format("hh:mm A") : str;
};

const formattedTime = (value) => {
  if (value.includes(" AM")) {
    return value.replace(" AM", "a");
  }
  if (value.includes(" PM")) {
    return value.replace(" PM", "p");
  }
};

export const timerangeConverter = (obj) => {
  return obj.startTime && obj.endTime
    ? `${formattedTime(timeConverter(obj.startTime))}-${formattedTime(
        timeConverter(obj.endTime)
      )}`
    : parseFloatValue(obj.hours);
};

export const getCurrentTime = () => {
  return moment().format("hh:mm:ss A");
};

export const isMatched = (value, searchValue) => {
  //  if it is true that means its a string otherwise number
  return isNaN(searchValue)
    ? value.trim().toLowerCase().includes(searchValue.toLowerCase())
    : value.toString().includes(searchValue.toString());
};

export const filterArr = (filterData, keysArr) => {
  keysArr.map((searchFields) => {
    if (searchFields.value !== "") {
      filterData = filterData.filter((item) =>
        isMatched(
          "key" in searchFields
            ? item[searchFields.key]
            : searchFields.method(item),
          searchFields.value
        )
      );
    }
  });
  return filterData;
};

export const PAYCODES = {
  totalPerson: { color: "#3CAF85" },
  schHrs: { color: "#47BDEF" },
  wrkHrs: { color: "#4a85c5" },
  regularHrs: { color: "#F4AA46" },
  compOffOvertime: { color: "#ee66ab" },
  lapsHours: { color: "#ee66ab" },
  overtime125: { color: "#ee66ab" },
  overtime150: { color: "#ee66ab" },
  projectHrs: { color: "#ee66ab" },
  proximateOnCall: { color: "#ee66ab" },
  publicHolidayRestDay: { color: "#ee66ab" },
  reCall125: { color: "#ee66ab" },
  reCall150: { color: "#ee66ab" },
  restDayOt125: { color: "#ee66ab" },
  restDayOt150: { color: "#ee66ab" },
  specialtyOvertime125: { color: "#ee66ab" },
  toil: { color: "#ee66ab" },
  telephoneOnCall: { color: "#ee66ab" },
  paidLeaveHrs: { color: "#af3c66" },
  unpaidLeaveHrs: { color: "#ed6647" },
  missingHrs: { color: "#ee66ab" },
  departEarlyHrs: { color: "#ee66ab" },
  arriveLateHrs: { color: "#ee66ab" },
  remoteOnCall: { color: "#ee66ab" },
  totalViolations: { color: "#ee66ab" },
  holidayHours: { color: "#ee66ab" },
};

export const sortPaycodes = (arr) => {
  var paycodesList = {};
  Object.keys(PAYCODES).map((key, index) => {
    paycodesList[key] = { ...PAYCODES[key], order: index + 1 };
  });
  arr = arr.map((item) => {
    return {
      ...item,
      color: paycodesList[item.mappingKey]?.color,
      order: paycodesList[item.mappingKey]?.order,
    };
  });
  arr.sort((a, b) => (a.order < b.order ? -1 : 1));
  arr = arr.map((item) => {
    delete item.order;
    return { ...item };
  });
  return arr;
};

export const updatePreviousURL = (dispatch, updateState) => {
  const key = "previous_url";
  var currentPath = window.location.origin + window.location.pathname;
  dispatch(updateState({ [key]: currentPath }));
};

export const isPreviousURLMatched = (commonReducer) => {
  const key = "previous_url";
  var currentPath = window.location.origin + window.location.pathname;
  return key in commonReducer ? commonReducer[key] === currentPath : false;
};

export const resetDate = (dispatch, updateState) => {
  dispatch(updateState({ oriDate: new Date().toString() }));
};

export const getRangeDate = (month) => {
  return {
    startDate: dateConverter(month?.startDate),
    endDate: dateConverter(month?.endDate),
  };
};

export const parseFloatValue = (value, decimalDigit) => {
  var hrs = value ? parseFloat(value).toFixed(decimalDigit || 2) : 0;
  return hrs;
};

export const parseValue = (value, type) => {
  switch (type) {
    case "number":
      return parseInt(value);
    case "float":
      return parseFloatValue(value);
    case "date":
      return dateConverter(value);
    case "time":
      return timeConverter(value);
    case "timerange":
      return timerangeConverter(value);
    case "dateDay":
      return dateDayConverter(value);
    default:
      return value;
  }
};

export const checkValidations = ({ validations, setSnakeBarProps }) => {
  if (validations) {
    for (var i = 0; i < validations.length; i++) {
      const { isMatch, msz, type } = validations[i];
      if (setSnakeBarProps) {
        if (isMatch) {
          const obj = { msz: msz, type: type };
          setSnakeBarProps(obj);
          return false;
        } else {
          setSnakeBarProps({});
        }
      }
    }
    return true;
  } else {
    return false;
  }
};

export const useGetOperations = ({ params, key }) => {
  var isCreateOperation = false,
    isUpdateOperation = false;

  if (params) {
    if (key in params) {
      return {
        isCreateOperation: false,
        isUpdateOperation: true,
        key,
        value: params[key],
      };
    } else {
      return {
        isCreateOperation: true,
        isUpdateOperation: false,
        key,
        value: "",
      };
    }
  } else {
    return { isCreateOperation, isUpdateOperation, key, value: "" };
  }
};

export const getSelectIndex = (arr, key, value) => {
  if (value && arr) {
    var index = arr?.findIndex((item) => key in item && item[key] === value);
    return index;
  } else {
    return -1;
  }
};

export const timeConverter12Hr = (time) => {
  return moment(time, ['HH:mm']).format('hh:mm A');
};