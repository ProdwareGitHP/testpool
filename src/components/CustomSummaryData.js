import { useState } from "react";

import { Box, Typography, Grid } from "@mui/material";

function MapComponent(props) {
  const {
    children,
    scrollable,
    classes,
    isClickable,
    isSelectable,
    isSelected,
  } = props;
  const className = `${classes.boxClassName} ${
    isClickable && isSelectable && isSelected ? classes.activeClass : ""
  }`;

  return scrollable ? (
    <Box className={className}>{children}</Box>
  ) : (
    <Grid item xs={1} className={className}>
      {children}
    </Grid>
  );
}
function CustomSummaryData(props) {
  const {
    item,
    scrollable,
    isClickable,
    onClick,
    isSelected,
    label,
    value,
    classes,
  } = props;
  return (
    <MapComponent scrollable={scrollable} {...props}>
      <Box style={{}}>
        <Typography
          className={classes.valueClassName}
          style={item.color ? { color: item.color } : {}}
        >
          {value}
        </Typography>
        <Typography
          style={{ fontSize: 14, lineHeight: 1.1 }}
          className={isClickable ? classes.linkClass : classes.labelClassName}
          onClick={isClickable ? () => onClick(item) : () => {}}
        >
          {label}
        </Typography>
      </Box>
    </MapComponent>
  );
}
CustomSummaryData.defaultProps = {};

export default CustomSummaryData;
