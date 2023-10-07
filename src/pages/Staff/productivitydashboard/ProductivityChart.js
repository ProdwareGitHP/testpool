import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const DepartmentChart = (props) => {
  const { dashboardData, setTabledata } = props;
  const [data01, setdata01] = useState([]);

  const getChartData = (name) => {
    const departmentNames = [];
    for (let i = 0; i < dashboardData.length; i++) {
      for (let j = 0; j < dashboardData[i].data.length; j++) {
        const departmentName = dashboardData[i].data[j][name];
        if (!departmentNames.includes(departmentName)) {
          departmentNames.push(departmentName);
        }
      }
    }

    const objList = departmentNames.map((name) => ({ name, value: 0 }));

    for (let i = 0; i < dashboardData.length; i++) {
      for (let j = 0; j < dashboardData[i].data.length; j++) {
        const departmentName = dashboardData[i].data[j][name];
        if (departmentNames.includes(departmentName)) {
          let obj = dashboardData[i].data[j].weeklyData[0];
          let sum = 0;
          for (let prop in obj) {
            if (typeof obj[prop] === "number") {
              sum += obj[prop];
            }
          }
          const foundObject = objList.find(
            (obj) => obj.name === departmentName
          );
          if (foundObject) {
            foundObject.value += sum;
          }
        }
      }
    }
    const filteredData = objList.filter((item) => item.value !== 0);

    if (filteredData.length > 0) {
      let chartData = [[name, "value"]];
      for (const element of filteredData) {
        chartData.push([element.name, parseFloat(element.value.toFixed(2))]);
      }
      return chartData;
    } else {
      return [];
    }
  };

  useEffect(() => {
    let filteredData1 = getChartData("departmentName");
    setdata01(filteredData1);
  }, [dashboardData]);
  const classes = useStyles();

  const filterChart = (e) => {
    let originalArray = [...dashboardData];
    const filteredData = originalArray.map((obj) => {
      const filteredDepartments = obj.data.filter((dept) => {
        return (
          dept.departmentName === e[0] &&
          Object.keys(dept.weeklyData[0]).length > 1
        );
      });
      if (filteredDepartments.some(Boolean)) {
        return { ...obj, data: filteredDepartments };
      }
    });
    const filteredArr = filteredData.filter((item) => item !== undefined);

    setTabledata(filteredArr);
  };

  const chartEvents = [
    {
      eventName: "select",
      callback({ chartWrapper }) {
        let g = chartWrapper.getChart().getSelection();
        filterChart(data01[g[0].row + 1]);
      },
    },
  ];

  return (
    <Box className={classes.chart_body}>
      {data01.length > 0 ? (
        <Chart
          chartType="PieChart"
          data={data01}
          width={"600px"}
          height={"250px"}
          options={{
            title: "Department",
            legend: { position: "labeled" },
            pieSliceText: "value",
            sliceVisibilityThreshold: 0.001,
            is3D: true,
          }}
          chartEvents={chartEvents}
        />
      ) : (
        <Box className={classes.nodata}>
          <Typography>No Data to Display</Typography>
        </Box>
      )}
    </Box>
  );
};

const JobTitleChart = (props) => {
  const { dashboardData, setTabledata } = props;
  const [data02, setdata02] = useState([]);

  const getChartData = (name) => {
    const departmentNames = [];
    for (let i = 0; i < dashboardData.length; i++) {
      for (let j = 0; j < dashboardData[i].data.length; j++) {
        const departmentName = dashboardData[i].data[j][name];
        if (!departmentNames.includes(departmentName)) {
          departmentNames.push(departmentName);
        }
      }
    }

    const objList = departmentNames.map((name) => ({ name, value: 0 }));

    for (let i = 0; i < dashboardData.length; i++) {
      for (let j = 0; j < dashboardData[i].data.length; j++) {
        const departmentName = dashboardData[i].data[j][name];
        if (departmentNames.includes(departmentName)) {
          let obj = dashboardData[i].data[j].weeklyData[0];
          let sum = 0;
          for (let prop in obj) {
            if (typeof obj[prop] === "number") {
              sum += obj[prop];
            }
          }
          const foundObject = objList.find(
            (obj) => obj.name === departmentName
          );
          if (foundObject) {
            foundObject.value += sum;
          }
        }
      }
    }
    const filteredData = objList.filter((item) => item.value !== 0);

    if (filteredData.length > 0) {
      let chartData = [[name, "value"]];
      for (const element of filteredData) {
        chartData.push([element.name, parseFloat(element.value.toFixed(2))]);
      }
      return chartData;
    } else {
      return [];
    }
  };

  useEffect(() => {
    let filteredData2 = getChartData("roleName");
    setdata02(filteredData2);
  }, [dashboardData]);
  const classes = useStyles();

  const filterChart2 = (e) => {
    let originalArray = [...dashboardData];
    const filteredData = originalArray.map((obj) => {
      const filteredDepartments = obj.data.filter((dept) => {
        return (
          dept.roleName === e[0] && Object.keys(dept.weeklyData[0]).length > 1
        );
      });
      if (filteredDepartments.some(Boolean)) {
        return { ...obj, data: filteredDepartments };
      }
    });
    const filteredArr = filteredData.filter((item) => item !== undefined);
    setTabledata(filteredArr);
  };

  const chartEvents = [
    {
      eventName: "select",
      callback({ chartWrapper }) {
        let g = chartWrapper.getChart().getSelection();
        filterChart2(data02[g[0].row + 1]);
      },
    },
  ];

  return (
    <Box className={classes.chart_body}>
      {data02.length > 0 ? (
        <Chart
          chartType="PieChart"
          data={data02}
          width={"600px"}
          height={"250px"}
          options={{
            title: "Job Title",
            is3D: true,
            pieSliceText: "value",
            sliceVisibilityThreshold: 0.001,
            legend: { position: "labeled" },
          }}
          chartEvents={chartEvents}
        />
      ) : (
        <Box className={classes.nodata}>
          <Typography>No Data to Display</Typography>
        </Box>
      )}
    </Box>
  );
};

const ProductivityChart = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.main_chart}>
      <DepartmentChart {...props} />
      <JobTitleChart {...props} />
    </Box>
  );
};

export default ProductivityChart;

const useStyles = makeStyles(() => ({
  mainBox: {
    border: "1px solid #EDEDED",
    margin: "10px",
  },

  headerBox: {
    margin: "10px",
  },

  btnBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: "10px",
  },
  nodata: {
    width: "225px",
    height: "225px",
    border: "1px solid grey",
    borderRadius: "50%",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    //marginBottom: 25,
    marginLeft: 200,
    marginRight: 150,
  },
  main_chart: {
    display: "flex",
    //backgroundColor: "gray",
    flexDirection: "row",
    //marginTop: "20px",
    //marginBottom: "20px",
  },
  chart_body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.75em",
    marginLeft: "20px",
  },
}));
