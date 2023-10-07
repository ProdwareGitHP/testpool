import React from "react";
import { CustomTextField } from ".";

export const TextAreaField = ({ value, onChange }) => {
  return (
    <CustomTextField
      multiline
      maxRows={5}
      width={280}
      value={value}
      InputProps={{
        style: {
          padding: "4px 6px",
        },
      }}
      onChange={onChange}
    />
  );
};
