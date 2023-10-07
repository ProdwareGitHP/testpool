import { Box, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {
  Add as AddIcon,
  ContentCopyOutlined as ContentCopyIcon,
  RemoveCircle as RemoveCircleIcon,
} from "@mui/icons-material";
import { parseFloatValue } from "../../../utils/commonService";

export default function getTableData(params) {
  const {
    setSelectedEmployee,
    isApprover,
    viewBy,
    data,
    setEmployeeNumber,
    setStatus1,
    btnClick,
    getFormattedDate,
    selectAssign,
    classes,
    result,
    workDurationArr,
    jobtitlesArr,
  } = params;
  console.log("isApprover", isApprover);
  let Days = data?.header?.days;

  const getFinalRows = (arr) => {
    let filteredData = [...arr];

    if (!(viewBy.value === "Employee")) {
      let obj = {};
      let key = "";
      for (var i = 0; i < filteredData.length; i++) {
        var item = filteredData[i];

        let fullName = item.fullName;
        if ("personId" in item) {
          obj[key].push(item);
        } else {
          obj[fullName] = [item];
          key = fullName;
        }
      }
      const { NoSchedule, ...others } = obj;
      filteredData = [];
      let finalObject = {};

      if (others && Object.keys(others).length > 0) {
        finalObject = { ...others };
      }
      if (NoSchedule && NoSchedule.length > 0) {
        finalObject = { ...finalObject, NoSchedule: [...NoSchedule] };
      }
      Object.values(finalObject).map((items) => {
        filteredData = [...filteredData, ...items];
      });
    }
    return filteredData;
  };

  const getEmpTableData = (data) => {
    var firstColumnSet = [
      {
        key: "fullName",
        name: "Employee",
        frozen: true,
        type: "person",
      },
      {
        key: "jobTitle",
        name: "Job Title",
        width: 200,
        frozen: true,
        colLength: Days?.length,
        type: "summaryColumn",
        styleProps: {
          fontWeight: 600,
          textAlign: "right",
          fontFamily: "Inter",
        },
      },

      { key: "shiftType", name: "Shift Type", width: 100, frozen: true },

      { key: "band", name: "Band", width: 80, frozen: true },
      {
        key: "actionRemove",
        name: "",
        type: "icon",
        frozen: true,
        title: "Delete All Shift",
        width: 80,
        renderCell: (props) => {
          const { row } = props;
          if (Days?.length + 2 === Object.keys(row)?.length) {
            return "";
          } else {
            return (
              <>
                <Tooltip title="Copy Shift">
                  <ContentCopyIcon
                    fontSize="small"
                    className={classes.FileCopyIcon}
                    onClick={() => {
                      setSelectedEmployee(row);
                      setStatus1(2);
                    }}
                  />
                </Tooltip>
                <Tooltip title="Delete All Shift">
                  <RemoveCircleIcon
                    fontSize="small"
                    className={classes.deleteCopyIcon}
                    onClick={() => {
                      setEmployeeNumber([row.employeeNumber]);
                      setStatus1(1);
                    }}
                  />
                </Tooltip>
              </>
            );
          }
        },
      },
    ];
    if (isApprover) {
      firstColumnSet.splice(4);
    }
    var secondColumnSet = [];
    if (data?.header?.days.length) {
      secondColumnSet = data?.header?.days.map((item) => {
        return {
          key: item,
          name: item,
          width: 100,
          renderCell: (props) => {
            const {
              row,
              column: { key },
            } = props;
            let shiftList = row[key];
            if (typeof shiftList === "object") {
              var shiftInfoList =
                shiftList && shiftList["shiftInfoList"]?.length
                  ? shiftList["shiftInfoList"]
                  : [];
              return (
                <Box
                  onClick={() => {
                    if (!isApprover && shiftInfoList.length === 0) {
                      selectAssign(row.personId);
                      getFormattedDate(key);
                    }
                  }}
                  style={{
                    height: "50px",
                    cursor:
                      !isApprover && shiftInfoList.length === 0
                        ? "pointer"
                        : "",
                  }}
                >
                  <Typography
                    title={"Cumulative Schedule"}
                    style={{
                      fontSize: "13px",
                      fontFamily: "Inter",
                      padding: "0px 4px",
                      backgroundColor: "#124590",
                      color: "#fff",
                      width: "100%",
                    }}
                  >
                    {parseFloatValue(row[key]?.["cumulativeHours"]) || ""}
                  </Typography>
                  {shiftInfoList?.map((item, index) => {
                    return (
                      <Link
                        key={index}
                        className={`${classes.body_text} ${classes.link_text}`}
                        onClick={() => {
                          btnClick(item.personRosterId, row);
                          getFormattedDate(key);
                        }}
                      >
                        <Typography
                          style={{
                            lineHeight: "initial",
                            fontSize: "12px",
                            fontFamily: "Inter",
                            textAlign: "center",
                          }}
                        >
                          {item.workDurationCode}
                        </Typography>
                      </Link>
                    );
                  })}
                </Box>
              );
            } else {
              return (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    style={{
                      fontSize: "12px",
                      fontFamily: "Inter",
                      color: "#000",
                      width: "100%",
                      textAlign: "right",
                      fontWeight: 600,
                    }}
                  >
                    {shiftList}
                  </Typography>
                </Box>
              );
            }
          },
        };
      });
    }
    var thirdColumnSet = [];
    if (data?.header?.dynamicColoums.length) {
      thirdColumnSet = data?.header?.dynamicColoums.map((item) => {
        return { key: item, name: item, width: 150 };
      });
    }

    const tableColumns = [
      ...firstColumnSet,
      ...secondColumnSet,
      ...thirdColumnSet,
    ];
    var tableRows = [];
    if (result.length) {
      result[0].value.map((item) => {
        var workDurationCounts = {};

        Object.keys(item?.workDurationCount || {}).map((durationKeys) => {
          var value = item?.workDurationCount[durationKeys];
          workDurationCounts[durationKeys] = value > 0 ? value : "";
        });

        tableRows.push({
          ...item,
          ...item.shiftInformation,
          ...workDurationCounts,
        });
      });
    }
    workDurationArr.map((workDurationcode) => {
      let shifts = {};
      Days?.map((day) => {
        let shiftCount = data?.eachDayShiftCount?.[day]?.[workDurationcode];
        shiftCount = shiftCount ? shiftCount : 0;
        shifts[day] = shiftCount;
      });

      tableRows.push({
        jobTitle: workDurationcode,
        ...shifts,
        backgroundColor: "#E4D1E8",
      });
    });
    // console.log(tableRows, "table rows");
    jobtitlesArr.map((jobtTitle) => {
      let shifts = {};
      Days?.map((day) => {
        let shiftCount = data?.eachDayShiftCount?.[day]?.[jobtTitle];
        shiftCount = shiftCount ? shiftCount : 0;
        shifts[day] = shiftCount;
      });
      tableRows.push({
        jobTitle: jobtTitle,
        ...shifts,
        backgroundColor: "#BAFFC9",
      });
    });

    let total = { jobTitle: "Total", backgroundColor: "#BABFFF" };
    Days?.map((day) => {
      let count = 0;
      tableRows?.map((item) => {
        if (
          Days?.length + 2 === Object.keys(item)?.length &&
          item.backgroundColor === "#BAFFC9"
        ) {
          count = count + item[day];
        }
        total[day] = count;
      });
    });
    tableRows.push(total);
    var rows = getFinalRows(tableRows) || [];
    if (rows.length === 1 && rows[0].jobTitle === "Total") {
      rows = [];
    }
    return {
      columns: tableColumns,
      rows: data && Object.keys(data).length ? rows : [],
    };
  };

  const getDepartmentTableData = (data) => {
    const list = [...result];
    const getCumalativeHours = ({ day, arr }) => {
      var totalHours = 0;
      if (Array.isArray(arr)) {
        arr.map((item) => {
          var hrs = item.shiftInformation[day]?.shiftInfoList[0]?.shiftHours;
          if (hrs) {
            totalHours += parseFloat(hrs);
          }
        });
      }
      return parseFloat(totalHours).toFixed(2);
    };
    const firstColumnSet = [
      {
        key: "fullName",
        name: viewBy.value,
        frozen: true,
        type: "person",
        width: 300,
      },
      {
        key: "jobTitle",
        name: "Job Title",
        width: 200,
        frozen: true,
      },

      { key: "shiftType", name: "Shift Type", width: 100, frozen: true },
      { key: "band", name: "Band", width: 80, frozen: true },
      // {
      //   key: "actionCopy",
      //   name: "Action",
      //   type: "icon",
      //   frozen: true,
      //   colSpan(args) {
      //     if (args.type === "HEADER") {
      //       return 2;
      //     }
      //     return undefined;
      //   },
      //   renderCell: (props) => {
      //     const { row } = props;
      //     if (!("totalSchHrs" in row)) {
      //       return (
      //         <ContentCopyIcon
      //           fontSize="small"
      //           className={classes.FileCopyIcon}
      //         />
      //       );
      //     }
      //   },
      // },
      {
        key: "actionRemove",
        name: "",
        type: "icon",
        frozen: true,
        tooltip: "Delete All Shift",
        renderCell: (props) => {
          const { row } = props;
          if (!("totalSchHrs" in row)) {
            return (
              <RemoveCircleIcon
                fontSize="small"
                className={classes.deleteCopyIcon}
                onClick={() => {
                  setStatus1(1);
                  setEmployeeNumber([row.personId]);
                }}
              />
            );
          }
        },
      },
      { key: "totalSchHrs", name: "Total Sch Hrs", width: 130, frozen: true },
    ];
    var secondColumnSet = [];
    if (data?.header?.days.length) {
      secondColumnSet = data?.header?.days.map((item) => {
        return {
          key: item,
          name: item,
          width: 100,
          renderCell: (props) => {
            const {
              row,
              column: { key },
            } = props;
            let shiftList = row[key];
            if (typeof shiftList === "object") {
              var shiftInfoList =
                shiftList && shiftList["shiftInfoList"].length > 0
                  ? shiftList["shiftInfoList"]
                  : [];

              return (
                <Box>
                  {shiftInfoList?.map((item, index) => {
                    return (
                      <Link
                        key={index}
                        className={`${classes.body_text} ${classes.link_text}`}
                        onClick={() => {
                          btnClick(item.personRosterId, row);
                          getFormattedDate(key);
                        }}
                      >
                        <Typography
                          style={{
                            lineHeight: "initial",
                            fontSize: "12px",
                            fontFamily: "Inter",
                            textAlign: "center",
                          }}
                        >
                          {item.workDurationCode}
                        </Typography>
                      </Link>
                    );
                  })}
                </Box>
              );
            } else {
              var hrs = parseInt(shiftList);
              return (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: hrs > 0 ? 0 : "5px",
                  }}
                >
                  {hrs > 0 ? shiftList : ""}
                  <AddIcon
                    color="primary"
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      selectAssign();
                      getFormattedDate(key);
                    }}
                  />
                </Box>
              );
            }
          },
        };
      });
    }

    const tableColumns = [...firstColumnSet, ...secondColumnSet];
    var tableRows = [];
    if (list?.length) {
      list?.map((item) => {
        var shifts = {};

        Days?.map((day) => {
          shifts[day] = getCumalativeHours({ day: day, arr: item.value });
        });
        var totalSchHrs = 0;
        Object.keys(shifts).map((day) => {
          totalSchHrs += parseFloat(shifts[day]);
        });
        console.log(shifts, "totalSchHrs", totalSchHrs);

        tableRows.push({
          fullName: item.label,
          ...shifts,
          totalSchHrs: parseFloat(totalSchHrs).toFixed(2),
        });

        item.value.map((item) => {
          tableRows.push({
            ...item,
            ...item.shiftInformation,
          });
        });
      });
    }
    var rows = getFinalRows(tableRows) || [];

    return {
      columns: tableColumns,
      rows: rows, //rows,
    };
  };

  const MapFilter = {
    Employee: getEmpTableData,
    Department: getDepartmentTableData,
    "Job Title": getDepartmentTableData,
    "Work Location": getDepartmentTableData,
    "Shift Time": getDepartmentTableData,
  };
  return viewBy.value in MapFilter
    ? MapFilter[viewBy.value](data)
    : { rows: [], column: [] };
}
