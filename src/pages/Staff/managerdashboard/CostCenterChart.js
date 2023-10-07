import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { Link } from "react-router-dom";
import { DataTable } from "../../../components/DataTable";
import ViewDetailModal from "./ViewDetailModal";
import BalanceDetails from "./balancesDetails";
import { PersonButton } from "../../../components/PersonButton";

const CostCenterChart = (props) => {
  const { selectedMonth, status, costCenterData } = props;
  const [costCenterChart2, setcostCenterChart2] = useState([]);
  console.log(costCenterChart2, "costCenterChart2");
  const [openViewDetail, setOpenViewDetail] = useState(false);

  const [barData, setBarData] = useState();

  const openDetailModal = (item) => {
    setOpenViewDetail(true);
    setBarData(item);
  };

  const getTwoPrevMonth = (str) => {
    const date = new Date(str.payPeriodName + "-01"); // convert string to Date object
    date.setMonth(date.getMonth() - 1); // set to one month before
    const previousMonth1 = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    }); // format first previous month

    date.setMonth(date.getMonth() - 1); // set to two months before
    const previousMonth2 = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    }); // format second previous month
    console.log(previousMonth1, previousMonth2, "date");

    return [previousMonth1, previousMonth2]; // return array of two previous months
  };

  useEffect(() => {
    if (costCenterData) {
      if (status === "cost/center") {
        let [str1, str2] = getTwoPrevMonth(selectedMonth);
        const array1 = costCenterData[0];
        const array2 = costCenterData[1];
        const array3 = costCenterData[2];

        for (let i = 0; i < array1?.length; i++) {
          array1[i].chartData = [];
          array1[i].chartData.push({
            name: selectedMonth.payPeriodName,
            Scheduled: array1[i]?.schHrs,
            Actual: array1[i]?.actHrs,
          });
        }

        for (let i = 0; i < array2?.length; i++) {
          const obj2 = array2[i];
          for (let j = 0; j < array1?.length; j++) {
            const obj1 = array1[j];
            if (obj1?.costCenterName === obj2?.costCenterName) {
              if (!obj1?.chartData) {
                obj1.chartData = [];
              }

              let dta = {
                name: str1,
                Scheduled: obj2?.schHrs,
                Actual: obj2?.actHrs,
              };
              obj1?.chartData.push(dta);
            }
          }
        }
        for (let i = 0; i < array3?.length; i++) {
          const obj2 = array3[i];
          for (let j = 0; j < array1.length; j++) {
            const obj1 = array1[j];
            if (obj1.costCenterName === obj2.costCenterName) {
              if (!obj1.chartData) {
                obj1.chartData = [];
              }

              let dta = {
                name: str2,
                Scheduled: obj2.schHrs,
                Actual: obj2.actHrs,
              };
              obj1.chartData.push(dta);
            }
          }
        }
        setcostCenterChart2(array1?.map((option) => option));
      }
      if (status === "person") {
        let [str1, str2] = getTwoPrevMonth(selectedMonth);
        let array1 = costCenterData[0];
        let array2 = costCenterData[1];
        let array3 = costCenterData[2];

        for (let i = 0; i < array1?.length; i++) {
          array1[i].chartData = [];
          array1[i].chartData.push({
            name: selectedMonth.payPeriodName,
            Scheduled: array1[i].schHrs,
            Actual: array1[i].actHrs,
          });
        }

        for (let i = 0; i < array2.length; i++) {
          const obj2 = array2[i];
          for (let j = 0; j < array1.length; j++) {
            const obj1 = array1[j];
            if (obj1.fullName === obj2.fullName) {
              if (!obj1.chartData) {
                obj1.chartData = [];
              }

              let dta = {
                name: str1,
                Scheduled: obj2.schHrs,
                Actual: obj2.actHrs,
              };
              obj1.chartData.push(dta);
            }
          }
        }
        for (let i = 0; i < array3.length; i++) {
          const obj2 = array3[i];
          for (let j = 0; j < array1.length; j++) {
            const obj1 = array1[j];
            if (obj1.fullName === obj2.fullName) {
              if (!obj1.chartData) {
                obj1.chartData = [];
              }

              let dta = {
                name: str2,
                Scheduled: obj2.schHrs,
                Actual: obj2.actHrs,
              };
              obj1.chartData.push(dta);
            }
          }
        }

        const mergeDuplicates = (arr) => {
          let key = "employeeNumber";
          let dupObj = {};

          arr.map((item) => {
            let dupId = item[key];

            if (!(dupId in dupObj)) {
              dupObj[dupId] = item;
            } else {
              let oldItem = { ...dupObj[dupId] };
              let newItem = { ...item };
              oldItem.actHrs += newItem.actHrs;
              oldItem.schHrs += newItem.schHrs;
              oldItem.chartData[0].Scheduled = oldItem.schHrs;

              oldItem.chartData[0].Actual = oldItem.actHrs;

              dupObj[dupId] = oldItem;
            }
          });
          return Object.values(dupObj)
            .slice()
            .sort((a, b) => {
              return a.fullName.localeCompare(b.fullName);
            });
        };
        let newArray1 = mergeDuplicates(array1);
        setcostCenterChart2(
          newArray1?.map((option) => {
            return {
              costCenterName: option.employeeNumber + " - " + option.fullName,
              employeeName: option?.fullName,
              ...option,
            };
          })
        );
      }
    }
  }, [costCenterData]);

  return (
    <>
      <DataTable
        data={costCenterChart2}
        DataItemComponent={(item) => {
          let data = [];
          data.push(["Month", "Scheduled", "Actual"]);
          item.chartData.forEach((it, index) => {
            let arr = [];
            arr.push(it.name);
            arr.push(it.Scheduled);
            arr.push(it.Actual);
            data.push(arr);
          });
          return (
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                borderBottom: "1px solid lightgrey",
                padding: "15px",
              }}
            >
              <Box style={{ width: "200px" }}>
                <PersonButton
                  personId={item?.empPersonId}
                  displayName={item?.costCenterName}
                  status={status === "person" ? true : false}
                />
              </Box>
              <Box style={{}}>
                <Chart
                  data={data}
                  chartType="ColumnChart"
                  width="600px"
                  height="300px"
                  options={{
                    tooltip: { trigger: "hover" }, // Display tooltip on selection (click)
                  }}
                />

                {status === "person" && (
                  <Link
                    style={{
                      fontSize: "14px",
                      fontWeight: "bolder",
                      fontFamily: "Inter",
                      color: "#788DC9",
                      textOverflow: "ellipsis",
                      textAlign: "center",
                      cursor: "pointer",
                      textDecoration: "none",
                    }}
                    onClick={() => openDetailModal(item)}
                  >
                    View Details
                  </Link>
                )}
              </Box>
              <BalanceDetails item={item} />
            </Box>
          );
        }}
      />

      {/* {employeeOpen && (
        <EmployeeModal setEmployeeOpen={setEmployeeOpen} personId={personId} />
      )} */}

      {openViewDetail && (
        <ViewDetailModal
          toggleHandler={setOpenViewDetail}
          item={barData}
          selectMonth={selectedMonth.payPeriodName}
        />
      )}
    </>
  );
};

export default CostCenterChart;
