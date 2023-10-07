import moment from "moment";
import { dateConverter } from "../../../utils/commonService";

export function createParams_DOFF(requestData) {
  if (!requestData.effectiveDate) {
    throw "Effective date is required!";
  }

  if (
    moment(requestData.effectiveDate + " " + requestData.timeStart) <= moment()
  ) {
    throw "Past dated Change Day Off not allowed";
  }

  if (!requestData.timeStart) {
    throw "Time start is required!";
  }

  if (!requestData.timeEnd) {
    throw "Time end is required!";
  }

  if (
    moment(requestData?.effectiveDate + " " + requestData.timeEnd) <=
    moment(requestData.effectiveDate + " " + requestData.timeStart)
  ) {
    throw "End time should be later than start time";
  }

  return {
    effectiveDate: dateConverter(requestData.effectiveDate),
    timeStart: requestData.timeStart,
    timeEnd: requestData.timeEnd,
    comments: requestData.comments,
  };
}

export function createParams_OFFC(requestData) {
  if (!requestData?.dateStart) {
    throw "Start date is required!";
  }
  if (!requestData?.dateEnd) {
    throw "End date is required";
  }

  if (!requestData?.timeStart) {
    throw "Start time is required!";
  }

  if (requestData?.timeEnd == "") {
    throw "End time is required!";
  }

  if (
    moment(requestData?.dateEnd + " " + requestData.timeEnd) <=
    moment(requestData.dateStart + " " + requestData.timeStart)
  ) {
    throw "End date/time should be later than start date/time";
  }

  return {
    dateStart: dateConverter(requestData?.dateStart),
    dateEnd: dateConverter(requestData?.dateStart),
    timeStart: requestData?.timeStart,
    timeEnd: requestData?.timeEnd,
    comments: requestData?.comments,
    requestReasonId: requestData.requestReasonId,
    specificDays: requestData.specificDays,
    mon: requestData.mon,
    tue: requestData.tue,
    wed: requestData.wed,
    thu: requestData.thu,
    fri: requestData.fri,
    sat: requestData.sat,
    sun: requestData.sun,
  };
}

export function createParams_PER(requestData) {
  if (!requestData?.dateStart) {
    throw "Start date is required!";
  }
  if (!requestData?.dateEnd) {
    throw "End date is required";
  }

  if (!requestData?.timeStart) {
    throw "Start time is required!";
  }

  if (requestData?.timeEnd == "") {
    throw "End time is required!";
  }

  if (
    moment(requestData?.dateEnd + " " + requestData.timeEnd) <=
    moment(requestData.dateStart + " " + requestData.timeStart)
  ) {
    throw "End date/time should be later than start date/time";
  }

  return {
    dateStart: dateConverter(requestData?.dateStart),
    dateEnd: dateConverter(requestData?.dateStart),
    timeStart: requestData?.timeStart,
    timeEnd: requestData?.timeEnd,
    comments: requestData?.comments,
    specificDays: requestData.specificDays,
    mon: requestData.mon,
    tue: requestData.tue,
    wed: requestData.wed,
    thu: requestData.thu,
    fri: requestData.fri,
    sat: requestData.sat,
    sun: requestData.sun,
  };
}

export function createParams_PUNCH(requestData) {
  if (!requestData.effectiveDate) {
    throw "Effective date is required!";
  }

  if (
    moment(requestData.effectiveDate + " " + requestData.timeStart) >= moment()
  ) {
    throw "Punch request can not be raised for future dates";
  }

  if (!requestData.timeStart) {
    throw "Time start is required!";
  }

  if (!requestData.timeEnd) {
    throw "Time end is required!";
  }

  if (
    moment(requestData?.effectiveDate + " " + requestData.timeEnd) <=
    moment(requestData.effectiveDate + " " + requestData.timeStart)
  ) {
    throw "End time should be later than start time";
  }

  return {
    effectiveDate: dateConverter(requestData.effectiveDate),
    timeStart: requestData.timeStart,
    timeEnd: requestData.timeEnd,
    comments: requestData.comments,
    requestReasonId: requestData.requestReasonId,
  };
}

export function createParams_SH_CHG(requestData) {
  function isDateInPast(dateString) {
    const passedDate = moment(dateString, 'ddd MMM DD YYYY HH:mm:ss ZZ');
    const currentDateTime = moment();
    if (passedDate.isBefore(currentDateTime, 'day')) {
      return true;
    } else {
      return false;
    }
  }
  if (!requestData.effectiveDate) {
    throw "Effective date is required!";
  }
  if (
    isDateInPast(requestData.effectiveDate)
  ) {
    throw "Past dated Shift Time Change not allowed";
  }

  if (!requestData.timeStart || !requestData.timeEnd) {
    throw "Time card is not available for " + requestData.effectiveDate;
  }

  if (!requestData.newTimeStart) {
    throw "New Time start is required!";
  }

  if (!requestData.newTimeEnd) {
    throw "New Time end is required!";
  }

  if (
    moment(requestData?.effectiveDate + " " + requestData.newTimeEnd) <=
    moment(requestData.effectiveDate + " " + requestData.newTimeStart)
  ) {
    throw "New End time should be later than new start time";
  }

  return {
    effectiveDate: dateConverter(requestData.effectiveDate),
    timeStart: requestData.timeStart,
    timeEnd: requestData.timeEnd,
    newTimeStart: requestData.startNewTime,
    newTimeEnd: requestData.endNewTime,
    comments: requestData.comments,
  };
}

export function createParams_SW_SH(requestData) {
  if (!requestData.effectiveDate) {
    throw "Effective date is required!";
  }

  if (!requestData.spersonRosterId || !requestData.dpersonRosterId) {
    throw "Source Roster and Destination Roster Are Required.";
  }

  return {
    effectiveDate: dateConverter(requestData.effectiveDate),
    spersonRosterId: requestData?.spersonRosterId,
    dpersonRosterId: requestData?.dpersonRosterId,
  };
}
