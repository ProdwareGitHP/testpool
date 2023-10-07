import React from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { EvoButton } from ".";

const FilterButton = ({ name, onClick, color }) => {
  return (
    <EvoButton
      btnText={name}
      startIcon={<FilterAltIcon style={{fontSize:"13px"}}/>}
      onClick={onClick}      
      style={{fontSize: "9px"}}      
      sx={color ? { backgroundColor: color } : { backgroundColor: "" }}
    />
  );
};

export default FilterButton;
