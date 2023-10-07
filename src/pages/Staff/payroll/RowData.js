import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import React from "react";
import CustomCheckBox from "../../../components/CustomCheckBox";
import { HourCell } from "../productivitydashboard/HourCell";

export default function RowData({
  item,
  auditData,
  setAuditData,
  columns1,
  columns2,
  pageData,
  index,
  setViewOpen,
  setViewIndex,
  setHistoryPopup,
  setHistoryIndex,
}) {
  const classes = useStyles2();
  return (
    <Box key={item.payrollAuditId} className={classes.pagedatamainbox}>
      <Box
        style={{
          width: 42,
          marginLeft: "7px",
          marginTop: 5,
          alignItems: "center",
          justifyContent: "center",
          borderRight: "1px solid rgb(194 187 187)",
        }}
      >
        <CustomCheckBox
          onChangeCheck={() => {
            let newData = [...auditData];
            if (newData[index]) {
              newData[index] = false;
            } else {
              newData[index] = true;
            }
            setAuditData(newData);
          }}
          check={auditData[index]}
        />
      </Box>
      {columns1.map((col) => {
        return (
          <HourCell key={col.field} hour={item[col.field]} width={col.width} />
        );
      })}
      {Object.keys(pageData.hours).map((hourCol) => {
        return (
          <HourCell
            key={hourCol}
            hour={item["oldHours"][hourCol] || 0}
            numeric
          />
        );
      })}
      {Object.keys(pageData.hours).map((hourCol) => {
        return (
          <HourCell
            key={hourCol}
            hour={item["newHours"][hourCol] || 0}
            numeric
          />
        );
      })}
      {columns2.map((col) => {
        return (
          <HourCell key={col.field} hour={item[col.field]} width={col.width} />
        );
      })}
      <Box
        style={{
          width: 45,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRight: "1px solid #b8b5b5",
        }}
      >
        <EditIcon
          style={{ cursor: "pointer" }}
          onClick={() => {
            setViewOpen(true);
            setViewIndex(index);
          }}
        />
      </Box>

      <Box
        style={{
          width: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRight: "1px solid #b8b5b5",
        }}
      >
        <HistoryIcon
          style={{ cursor: "pointer" }}
          onClick={() => {
            setHistoryPopup(true);
            setHistoryIndex(index);
          }}
        />
      </Box>
    </Box>
  );
}

const useStyles2 = makeStyles(() => ({
  pagedatamainbox: {
    display: "flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
    //backgroundColor: "#fff",
    "&:hover": {
      //backgroundColor: "#ededed",
    },
    width: "100%",
    // height: "60px"
  },
}));
