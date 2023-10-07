import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import React from "react";
import { EvoButton } from "./EvoButton";

export const FilterToggleButton = ({ title, isClear, onClick, style }) => {
 
  return (
    // <Box ml={1} onClick={onClick}>
    //   <Typography variant="h7" className={style || classes.buttonStyle}>
    //     {!isClear ? (
    //       <FilterAltIcon className={classes.FilterAltIcon} />
    //     ) : (
    //       <FilterAltOffIcon className={classes.FilterAltIcon} />
    //     )}
    //     {title || "Clear Filter"}
    //   </Typography>
    // </Box>
    <EvoButton
      btnText={title || "Clear Filter"}
      variant={title ? "contained" : "outlined"}
      onClick={onClick}
      // className={style || classes.buttonStyle}
      startIcon={!isClear ? <FilterAltIcon /> : <FilterAltOffIcon />}
      // btnClass={{
      //   // backgroundColor: title ? "#124590" : "#f0ad4e",
      //   // color: "#fff",
      //   // fontSize: "12px",
      //   // borderRadius: "10 !important",
      //   marginRight: "20px",
      // }}
    />
  );
};
