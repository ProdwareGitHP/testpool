import moment from "moment";
import React, { useEffect } from "react";
import { _formatTimeHour } from "../../pages/contants";
import { timerangeConverter } from "../../utils/commonService";
import { CustomTextField } from "../TextField";

import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

export default function EvoTimeRangePicker({ value, onChange }) {
  const [text, setText] = React.useState(timerangeConverter(value));

  useEffect(() => {
    setText(timerangeConverter(value));
  }, [value]);

  const timeDiff = (value) => {
    var startTime = moment(value.split("-")[0], "HH:mm a");
    var endTime = moment(value.split("-")[1], "HH:mm a");
    var duration = moment.duration(endTime.diff(startTime));
    var hours = duration.asHours();
    var minutes = duration.asMinutes() - hours * 60;
    return parseFloat(hours + "." + minutes).toFixed(2);
  };

  const transformTime = (str) => {
    return moment(str, "LT").format("hh:mm A");
  };

  const onBlur = (value) =>
    onChange({
      hours: _formatTimeHour(value).formattedValue.includes("-")
        ? timeDiff(_formatTimeHour(value).formattedValue)
        : _formatTimeHour(value).formattedValue,

      startTime: _formatTimeHour(value).formattedValue.includes("-")
        ? transformTime(_formatTimeHour(value).formattedValue.split("-")[0])
        : "",

      endTime: _formatTimeHour(value).formattedValue.includes("-")
        ? transformTime(_formatTimeHour(value).formattedValue.split("-")[1])
        : "",
    });

  return (
    <CustomTextField
      type="text"
      width={140}
      value={text}
      endIcon={<AccessTimeFilledIcon style={{ fontSize: "14px" }} />}
      onChange={(e) => setText(e.target.value)}
      onBlur={(e) => onBlur(e.target.value)}
    />
  );
}
