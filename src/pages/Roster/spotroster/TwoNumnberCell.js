import { Box, Tooltip, Typography } from "@mui/material";

const StyledBox = (props) => {
  return (
    <Box
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: props.align || "left",
        backgroundColor: props.bgcolor,
      }}
    >
      {props.children}
    </Box>
  );
};

export const TwoNumberCell = ({ column, row }) => {
  let total = "Total Hrs";
  let value1 = "";
  let value2 = "";
  if (row?.parentTab === 0) {
    value1 = row[column.key]?.scheduledHour;

    value2 = row[column.key]?.demandHour;
    if (row?.label === total) {
      value1 = row[column.key]?.scheduledHour;
    }
  } else if (row?.parentTab === 1) {
    value1 = row[column.key]?.fte;
    value2 = row[column.key]?.demandFte;
  } else if (row?.parentTab === 2) {
    value1 = row[column.key]?.cost;
  }
  return total === column?.key || row?.label === total ? (
    <StyledBox align="right">
      <Tooltip title={value1}>
        <Typography
          style={{
            fontFamily: "Inter",
            fontSize: "14px",
            fontWeight: 600,
            overflow: "hidden",

            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {value1}
        </Typography>
      </Tooltip>
    </StyledBox>
  ) : (
    <StyledBox
      align="right"
      bgcolor={
        value1 < value2
          ? "#f2bba5"
          : value1 > value2
          ? "#E4D4E7"
          : value1 === value2
          ? "#fff"
          : ""
      }
    >
      <Tooltip title={value1}>
        <Typography
          style={{
            fontFamily: "Inter",
            fontSize: "14px",
            fontWeight: 600,
            overflow: "hidden",

            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {value1}
        </Typography>
      </Tooltip>
      <Tooltip title={value2}>
        <Typography
          style={{
            fontFamily: "Inter",
            fontSize: "12px",
            paddingLeft: 5,
            marginTop: 2,
            color: "#7F9CD1",
            overflow: "hidden",

            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {value2}
        </Typography>
      </Tooltip>
    </StyledBox>
  );
};
