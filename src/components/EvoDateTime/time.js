import React from "react";

import { _formatTime } from "../../pages/contants";
import { timeConverter } from "../../utils/commonService";
import { CustomTextField } from "../TextField";

import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

export default function EvoTimePicker({ value, onChange }) {
  return (
    <CustomTextField
      type="text"
      width={120}
      value={timeConverter(value)}
      endIcon={<AccessTimeFilledIcon style={{ fontSize: "14px" }} />}
      onChange={(e) => onChange(e.target.value)}
      onBlur={(e) => onChange(_formatTime(e.target.value).formattedValue)}
    />
  );
}
