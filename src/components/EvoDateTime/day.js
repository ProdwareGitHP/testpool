//import React from "react";

//export default function EvoDayPicker({ value, onChange }) {
// return <></>}

// EvoDayPicker.js (Same as before)
import { Grid } from "@mui/material";
import React from "react";
import CustomCheckBox from "../CustomCheckBox";
const days = [
  { label: "Sun" },

  { label: "Mon" },
  { label: "Tue" },
  { label: "Wed" },
  { label: "Thu" },
  { label: "Fri" },
  { label: "Sat" },
];

const EvoDayPicker = (props) => {
  const { selectedDays, onChange, containerStyles, styles, disabled } = props;
  return (
    <Grid
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 50,
        marginBottom: 15,
        marginTop: 10,
        ...containerStyles,
      }}
    >
      <Grid
        style={{ display: "flex", marginLeft: 10, ...styles }}
        item
        xs="12"
        justifyContent="space-around"
      >
        {days.map((day) => {
          return (
            <CustomCheckBox
              key={day.label}
              check={selectedDays[day.label.toLowerCase()]} // Use 'value' prop to access selected days
              style={{ padding: 0, fontSize: 12 }}
              onChangeCheck={
                (e) =>
                  onChange({ ...selectedDays, [day.label.toLowerCase()]: e }) // Use 'onChange' prop to update selected days
              }
              label={day.label}
              disabled={disabled}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

export default EvoDayPicker;
