import React from "react";
import { CustomTextField } from ".";
import { MenuItem } from "@mui/material";

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

export const SelectTextField = ({ value, onChange }) => {
  return (
    <CustomTextField
       select
      size="small"
      maxRows={5}
      value={"Kelly Snyder"}      
      onChange={onChange}
    >
      {names.map((name) => (
        <MenuItem key={name} value={name}>
        {name}
      </MenuItem>
      ))}
    </CustomTextField>
  );
};
