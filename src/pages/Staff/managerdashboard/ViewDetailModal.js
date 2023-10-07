import React, { useEffect, useState } from "react";
import { CustomDialog } from "../../../components/CustomDialog";
import { Grid, Typography } from "@mui/material";
import { Chart } from "react-google-charts";
import { EvoButton } from "../../../components/EvoButton";

const ViewDetailModal = (props) => {
  const { toggleHandler, item, selectMonth } = props;
  const [data, setData] = useState([]);
  console.log(data, "data");
  const handleClose1 = () => {
    toggleHandler(false);
  };
  useEffect(() => {
    let data = [];
    data.push(["Month", "Scheduled", "Actual"]);
    item?.chartData?.forEach((it, index) => {
      let arr = [];
      arr.push(it.name);
      arr.push(it.Scheduled);
      arr.push(it.Actual);
      data.push(arr);
    });
    setData(data);
  }, [item?.chartData]);

  return (
    <CustomDialog
      title={
        "Detail Charts for " + item.employeeName + " of month " + selectMonth
      }
      maxWidth="sm"
      open="true"
      actions={{ onOK: handleClose1 }}
      handleClose={handleClose1}
    >
      <Grid>
        <Typography
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            fontFamily: "Inter",
            margin: 10,
          }}
        >
          {item?.departmentName}
        </Typography>
        <Chart
          data={data}
          chartType="ColumnChart"
          width="600px"
          height="300px"
        />
      </Grid>
    </CustomDialog>
  );
};

export default ViewDetailModal;
