import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getLineData, saveViewData } from "../../../services/api";

import React, { useEffect, useState } from "react";
import { HourCell, LabelCell } from "../productivitydashboard/HourCell";
import { paycodes } from "../../contants";
import { useGetLineData } from "../../../services/staff";

const LineData = ({ data, setSaveList }) => {
  const editable = data?.status === "Draft" || data?.status === "RMI";

  const classes = useStyles();
  const [lineData, setLineData] = useState([]);
  const [fetchLineData, setFetchLineData] = useState(true);

  const { userId, startDate, endDate } = useSelector(
    (state) => state.commonReducer
  );

  const monthNameFormat = (date) => {
    return moment(date, "YYYY-MM-DD").format("DD-MMM-YYYY");
  };
  const { data: getLineDataArr, refetch: getAllRefetch } = useGetLineData({
    payrollAuditId: data?.payrollAuditId,
    startDate: startDate,
    endDate: endDate,
  });

  useEffect(() => {
    if (getLineDataArr) {
      setLineData(getLineDataArr);
      setFetchLineData(false);
    }
  }, [getLineDataArr]);

  return (
    <Box className={classes.mainbox}>
      <Box className={classes.innermainbox}>
        <Box className={classes.innerboxworkduration}>
          <LabelCell label={"Effective Date"} />

          <Box
            style={
              {
                //width: "40%",
                //marginLeft: "10px",
              }
            }
          >
            <Grid
              style={{
                width: "100%",

                borderBottom: "1px solid rgb(194 187 187)",
                borderRight: "1px solid rgb(194 187 187)",
              }}
            >
              <Typography
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "bold",
                  textAlign: "start",
                  padding: 5,
                }}
              >
                Timesheet
              </Typography>
            </Grid>
            <Grid container>
              <LabelCell label={"Hours"} numeric />
              <LabelCell label={"Pay Code"} width={150} />
              <LabelCell label={"Comments"} width={200} />
            </Grid>
          </Box>
          <Box>
            <Grid
              style={{
                width: "100%",
                borderBottom: "1px solid rgb(194 187 187)",
                borderRight: "1px solid rgb(194 187 187)",
              }}
            >
              <Typography
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "bold",
                  textAlign: "start",
                  padding: 5,
                }}
              >
                New Hours
              </Typography>
            </Grid>
            <Grid container>
              <LabelCell label={"Hours"} numeric />
              <LabelCell label={"Pay Code"} width={250} />
              <LabelCell label={"Comments"} width={200} />
            </Grid>
          </Box>
        </Box>
        <Grid style={{}}>
          {lineData?.length > 0 &&
            lineData?.map((item, index) => {
              const onHoursChange = (e) => {
                let nHrs = e.target.value;
                setSaveList((prev) => {
                  let temp = [...prev];
                  let filter = temp.findIndex(
                    (it) => it.payrollAuditLineId === item.payrollAuditLineId
                  );
                  if (filter > -1) {
                    temp[filter].nhours = Number(nHrs);
                    return temp;
                  }
                  temp.push({
                    payrollAuditLineId: item.payrollAuditLineId,
                    nhours: Number(nHrs),
                    lastUpdateBy: userId,
                    lastUpdatedOn: moment().format("DD-MM-YY"),
                  });
                  return temp;
                });
              };

              const onPayCodeChange = (newData) => {
                let lineDataTemp = [...lineData];
                let foundValue = lineDataTemp.filter(
                  (ld) => ld.payrollAuditLineId === item.payrollAuditLineId
                )[0];
                foundValue.npayCodeName = newData.npayCodeName;
                foundValue.npayCodeId = newData.payCodeId;
                setLineData(lineDataTemp);

                setSaveList((prev) => {
                  let temp = [...prev];
                  let filter = temp.findIndex(
                    (it) => it.payrollAuditLineId === item.payrollAuditLineId
                  );
                  if (filter > -1) {
                    temp[filter].npayCodeId = newData.payCodeId;
                    return temp;
                  }
                  temp.push({
                    payrollAuditLineId: item.payrollAuditLineId,
                    nPayCodeId: newData.payCodeId,
                    lastUpdateBy: userId,
                    lastUpdatedOn: moment().format("DD-MM-YY"),
                  });
                  return temp;
                });
              };

              const onCommentsChange = (e) => {
                let nComments = e.target.value;
                setSaveList((prev) => {
                  let temp = [...prev];
                  let filter = temp.findIndex(
                    (it) => it.payrollAuditLineId === item.payrollAuditLineId
                  );
                  if (filter > -1) {
                    temp[filter].nComments = nComments;
                    return temp;
                  }
                  temp.push({
                    payrollAuditLineId: item.payrollAuditLineId,
                    comments: item.comments,
                    lastUpdateBy: userId,
                    lastUpdatedOn: moment().format("DD-MM-YY"),
                  });
                  return temp;
                });
              };

              return (
                <Box
                  key={item.itempayrollAuditLineId}
                  style={{ dispaly: "flex" }}
                  className={classes.pagedatamainbox}
                >
                  <HourCell hour={monthNameFormat(item?.effectiveDate)} />

                  <Box
                    style={
                      {
                        //width: "40%",
                        //marginLeft: "10px",
                      }
                    }
                  >
                    <Grid container style={{ height: "100%" }}>
                      <HourCell
                        hour={(Math.floor(item.hours * 100) / 100).toFixed(2)}
                        numeric
                      />
                      <HourCell hour={item.payCodeName} width={150} editable />
                      <HourCell hour={item.comments} width={200} editable />
                    </Grid>
                  </Box>

                  <Box>
                    <Grid container>
                      <HourCell
                        hour={(Math.floor(item.nhours * 100) / 100).toFixed(2)}
                        numeric
                        onChange={editable ? onHoursChange : null}
                      />
                      <HourCell
                        hour={editable ? item : item.npayCodeName}
                        width={250}
                        options={paycodes}
                        class={classes.payCodeData}
                        onSelect={editable ? onPayCodeChange : null}
                        selectIndex={item.npayCodeName}
                      />
                      <HourCell
                        hour={item.ncomments}
                        width={200}
                        onChange={editable ? onCommentsChange : null}
                      />
                    </Grid>
                  </Box>
                </Box>
              );
            })}
        </Grid>
      </Box>
    </Box>
  );
};

export default LineData;
const useStyles = makeStyles((theme) => ({
  pagedatamainbox: {
    display: "flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#fff",
    //height: "46px",
    // "&:hover": {
    //   backgroundColor: "#ededed",
    // },
  },
  payCodeData: {
    marginLeft: "10px !important",
  },

  mainbox: {
    border: "1px solid #E9E9E9 !important",
    // minWidth: "150%",
    minHeight: "fit-content",
  },
  innermainbox: {
    display: "inline-block",
    minWidth: "100%",
    verticalAlign: "top",
  },
  innerboxworkduration: {
    display: "flex !important",
    //padding: "5px 0px",
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#F1F1F1",
  },
  selectButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px",
  },
  align: {
    display: "flex",
    alignItems: "center",
  },
}));
