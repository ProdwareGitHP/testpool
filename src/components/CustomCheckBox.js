import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
} from "@mui/material";

const useStyles = makeStyles(() => ({
  default_check: {},
  smGreyCheck: {
    fontSize: "small",
    color: "gray",
  },
}));

function CustomCheckBox({
  label,
  onChangeCheckboxhandle,
  classname,
  onChangeCheck,
  required,
  disabled,
  errorMsz,
  error,
  currentIndex,
  check,
}) {
  //console.log('isC', isChecked)
  const [checked, setChecked] = React.useState(
    check !== undefined ? check : false
  );
  const classes = useStyles();
  const checkClassName = () => {
    switch (classname) {
      case "smGrey":
        return classes.smGreyCheck;
      default:
        return classes.default_check;
    }
  };

  useEffect(() => {
    if (check !== undefined) setChecked(check);
  }, [check]);

  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
    onChangeCheck(event.target.checked, currentIndex);
  };

  return (
    <FormGroup>
      <FormControlLabel
        className={checkClassName}
        style={{ marginRight: 5, fontFamily: "Inter", fontSize: "14px" }}
        control={
          <Checkbox
            size="small"
            color="primary"
            style={{ width: "28px", marginLeft: 15 }}
            checked={checked}
            disabled={disabled}
            onChange={handleCheckChange}
          />
        }
        label={<Typography style={{ fontSize: 14 }}>{label}</Typography>}
        onChange={onChangeCheckboxhandle}
      />
      {required && error && (
        <Typography
          variant="body1"
          className="errorDom"
          component="span"
          style={{ color: "rgb(211, 47, 47)", fontSize: 12 }}
        >
          <Box>{errorMsz}</Box>
        </Typography>
      )}
    </FormGroup>
  );
}

export default CustomCheckBox;
