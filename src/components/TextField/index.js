import { IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";

export const CustomTextField = (props) => {
  const {
    type,
    width,
    readOnlyValue,
    startIcon = false,
    endIcon,
    endIconButton,
    textAlign,
    maxLength,
  } = props;
  return (
    <TextField
      size="small"
      inputProps={{
        style: { textAlign: textAlign, padding: "4px 8px" },
        maxLength: maxLength,
      }}
      style={{ width: width }}
      InputProps={{
        readOnly: readOnlyValue,
        startAdornment: startIcon && (
          <InputAdornment>{startIcon}</InputAdornment>
        ),
        endAdornment: (endIcon || endIconButton) && (
          <InputAdornment>
            <IconButton
              disableRipple
              style={{ cursor: endIconButton ? "cursor" : "auto" }}
              edge="end"
            >
              {endIcon || endIconButton}
            </IconButton>
          </InputAdornment>
        ),
      }}
      onClick={(e) => e.stopPropagation()}
      {...props}
      type={type}
    />
  );
};
