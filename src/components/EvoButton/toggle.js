import { ToggleButtonGroup } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import React from "react";

const EvoToggleButton = ({
  status,
  handlechange,
  list,
  counts,
  handleCounts,
  resetCounts,
}) => {
  const isCountVisible = Boolean(handleCounts);
  return (
    <>
      <ToggleButtonGroup
        color="primary"
        value={status}
        exclusive
        onChange={(e, newval) => {
          handlechange(newval);
          if (isCountVisible) {
            resetCounts();
          }
        }}
        size="small"
      >
        {list.map((item, index) => {
          const value = item["value"];
          return (
            <ToggleButton
              sx={{
                fontSize: "14px",
                padding: "5px 12px",
                textTransform: "none",
                borderRadius: 2,
              }}
              key={item.value}
              value={item.value}
            >
              {item.label}
              {/* {isCountVisible &&
                `(${index >= 0 && list[index]?.value === status ? counts : 0})`} */}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </>
  );
};

export default EvoToggleButton;
