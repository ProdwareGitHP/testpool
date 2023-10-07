import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Box, Popover } from "@mui/material";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { dateConverter } from "../../utils/commonService";
import { EvoButton } from "../EvoButton";

export default function EvoDatePicker({
  onChange,
  onSelect = onChange,
  selected,
  minDate,
  maxDate,
  styles,
  filterMethod,
}) {
  // debugger;
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <>
      <EvoButton
        variant="outlined"
        color="default"
        btnText={dateConverter(selected)}
        endIcon={<CalendarMonthIcon />}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        styles={styles}
      />

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Box
          sx={{
            ".react-datepicker": {
              border: "none",
            },
          }}
        >
          <DatePicker
            selected={selected}
            // onChange={(e) => onSelect(e)}
            onChange={(date) => {
              setAnchorEl(null);
              onSelect(date);
            }}
            minDate={minDate}
            maxDate={maxDate}
            dateFormat="dd-MMM-yyyy"
            inline
            filterDate={filterMethod}
          />
        </Box>
      </Popover>
    </>
  );
}
EvoDatePicker.defaultProps = {
  filterMethod: () => {
    return true;
  },
};
