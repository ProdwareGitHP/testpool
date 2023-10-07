import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import HistoryIcon from "@mui/icons-material/History";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import LegendsTimeHour from "./LegendsTimeHour.json";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { CustomDialog } from "../../../components/CustomDialog";
import { EvoHBox, EvoHNavBox } from "../../../components/EvoBox";
import { EvoDataForm } from "../../../components/EvoDataForm";
import ReadOnlyElement from "../../../components/EvoDataForm/readOnly";
import EvoDataGrid from "../../../components/EvoDataGrid";
import CellIcon from "../../../components/EvoDataGrid/CellIcon";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import EvoTimeRangePicker from "../../../components/EvoDateTime/timerange";
import EvoDropDown from "../../../components/EvoDropDown";
import { CustomTextField } from "../../../components/TextField";
import {
  deletePersonTimesheet,
  savePersonTimesheet,
} from "../../../services/api";
import {
  useAllTimesheetMaster,
  usePayrollTtimehseetById,
} from "../../../services/timesheetsubmission";
import { Stack } from "@mui/system";
import EvoLegends from "../../../components/EvoLegends";
import { EvoButton } from "../../../components/EvoButton";
import { ApprovalHistory } from "./ApprovalHistory";
import moment from "moment";

const ReadWriteElement = ({ readOnly, value, type, children }) => {
  return (
    <Box
      style={{
        height: 35,
        display: "flex",
        alignItems: "center",
        paddingLeft: 6,
      }}
    >
      {readOnly === "Y" ? (
        <ReadOnlyElement value={value} type={type} />
      ) : (
        children
      )}
    </Box>
  );
};

const SummaryList = ({ oriPagedata }) => {
  const formData = {
    readOnly: true,
    direction: "row",
    gap: 3,
    type: "float",
    items: oriPagedata.reduce((acc, entry) => {
      if (entry.payCode) {
        const existingEntry = acc.find(
          (item) => item.label === entry.payCodeName
        );
        if (existingEntry) {
          existingEntry.value += parseFloat(entry.hours);
        } else {
          acc.push({
            label: entry.payCodeName,
            value: parseFloat(entry.hours),
          });
        }
      }
      return acc;
    }, []),
  };

  return <EvoDataForm formData={formData} />;
};

export const EmployeeDetailModal = (props) => {
  const { onAction } = props;
  const [approvalHistoryModal, setApprovalHistoryModal] = useState(false);
  const { handleClose, refetchPersonTimesheet, data: selectedEmployee } = props;
  const [snakeBarProps, setSnakeBarProps] = useState({});
  const [isSavedChanges, setSavedChanges] = useState(false);

  const commonReducer = useSelector((state) => state.commonReducer);
  const [expandFlag, setExpandFlag] = useState(false);
  const [expandPanel, setExpandPanel] = useState(null);
  const [pageArr, setPageArr] = useState([]);
  // const [shiftDetailArr, setShiftDetailArr] = useState([]);
  const [enableFlag, setEnableFlag] = useState(true);
  const [blurFlag, setBlurFlag] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [paycodeArr, setPaycodeArr] = useState([]);
  const [deptpartmentJobArr, setDeptpartmentJobArr] = useState([]);
  const [paycodeEnableFlag, setPaycodeEnableFlag] = useState(true);
  const [newStateData, setNewStateData] = useState([]);
  const [validations, setValidations] = useState([]);
  const handleValidations = (value) => {
    setValidations(value);
  };

  const [timeSheetMasterEnableFlag, setTimeSheetMasterEnableFlag] =
    useState(true);
  const [payCodes, setPayCodes] = useState({});
  const handlePayCodes = (value) => {
    setPayCodes(value);
  };
  const [totalHours, setTotalHours] = useState(0);
  const saveTotalHours = (value) => {
    setTotalHours(value);
  };

  const [isLoading1, setLoading1] = useState(false);
  const [isLoading2, setLoading2] = useState(true);

  const handleLoading1 = (value) => {
    setLoading1(value);
  };
  const handleLoading2 = (value) => {
    setLoading2(value);
  };
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [saveFlag, setSaveFlag] = useState(false);
  const handleDeleteFlag = (value) => {
    setDeleteFlag(value);
  };
  const handleSaveFlag = (value) => {
    setSaveFlag(value);
  };
  const resetFlags = () => {
    handleDeleteFlag(false);
    handleSaveFlag(false);
  };
  const [errorMsg, setErrorMsg] = useState([]);

  const resetErrorMsg = () => {
    setErrorMsg([]);
  };
  const handleErrorMsg = (value) => {
    setErrorMsg(value);
  };

  const handleNewStateData = (value) => {
    setNewStateData(value);
  };

  const handleSavedChanges = () => {
    setSavedChanges(true);
  };

  // const handleClose = () => {
  //   togglerHandler(false);
  //   if (isSavedChanges) {
  //     refetchPersonTimesheet();
  //   }
  // };
  const handleOpenApprovalHistory = () => {
    setApprovalHistoryModal(true);
  };
  const handleCloseApprovalHistory = () => {
    setApprovalHistoryModal(false);
  };

  const [expandedGroupIds, setExpandedGroupIds] = useState(new Set([]));

  const [oriPagedata, setOriPagedata] = useState([]);
  const [deletedArr, setDeletedArr] = useState([]);

  function flattenData(data) {
    return data.reduce((acc, curr) => {
      let shiftDetailArr =
        curr.shiftDetails.length > 0
          ? curr.shiftDetails.map((sd) => ({
              ...sd,
              date: curr.date,
              shiftTiming: curr.shiftTiming,
            }))
          : [
              {
                date: curr.date,
                shiftTiming: curr.shiftTiming,
              },
            ];

      return acc.concat(shiftDetailArr);
    }, []);
  }

  const onSuccess = (data) => setOriPagedata(flattenData(data));

  const { isFetching } = usePayrollTtimehseetById(
    {
      personId: selectedEmployee.personId,
      startDate: commonReducer.startDate,
      endDate: commonReducer.endDate,
    },
    onSuccess
  );

  const { data: masterData, isLoading: isLoadingMasterData } =
    useAllTimesheetMaster();

  const { mutate: savePersonTimesheetMutate, isLoading: isSaving } =
    useMutation(savePersonTimesheet, {
      onSuccess: (data) => {
        setDeletedArr([]);
        setSnakeBarProps({
          msz: "Record(s) Saved",
          type: "success",
        });
        onAction(data);
      },
      onError: (data) => {
        setSnakeBarProps({
          msz: "Record(s) Save Failed",
          type: "error",
        });
      },
    });

  const { mutate: deletePersonTimesheetMutate, isLoading: isDeleting } =
    useMutation(deletePersonTimesheet, {
      onSuccess: (data) => {
        setDeletedArr([]);
        setSnakeBarProps({
          msz: "Record(s) Deleted",
          type: "success",
        });
        onAction(data);
      },
      onError: (data) => {
        setSnakeBarProps({
          msz: "Record(s) Delete Failed",
          type: "error",
        });
      },
    });

  // useEffect(() => {
  //   if (stateData) {
  //     setTimeout(() => {
  //       var newState = getNewStateData();
  //       handleNewStateData(newState);
  //       var newPayCodes = {};
  //       var sum = 0;
  //       newState.map((parent_value) => {
  //         parent_value.shiftDetails.map((child_value) => {
  //           if (child_value.timeSheetId) {
  //             sum += child_value.hours;
  //             if (child_value.payCodeName in newPayCodes) {
  //               newPayCodes[child_value.payCodeName] += child_value.hours;
  //             } else {
  //               newPayCodes[child_value.payCodeName] = child_value.hours;
  //             }
  //           }
  //         });
  //       });
  //       handlePayCodes(newPayCodes);
  //       saveTotalHours(parseFloat(sum).toFixed(2));
  //     }, 500);
  //   }
  //   // else {
  //   // console.log("statedata", stateData);
  //   // if(stateData===undefined){
  //   //   setSnakeBarProps({
  //   //
  //   //     msz: "Error",
  //   //     details: ["Some Technical Error."],
  //   //     type: "error",
  //   //   });
  //   // }
  //   // }
  //   handleLoading1(false);
  //   setEnableFlag(false);
  // }, [stateData]);

  const copyRecord = (parentIndex, childIndex) => {
    var localNewStateData = [...newStateData];
    var localShiftDetailArr = [...localNewStateData[parentIndex].shiftDetails];

    var pdata = {
      ...localShiftDetailArr[childIndex],
      date: localNewStateData[parentIndex].date,
      hours: "",
      startTime: "",
      endTime: "",
      previousHours: 0,
      isReadOnly: "N",
      isDeleted: false,
      isSaved: true,
      comment: "",
    };
    delete pdata.timeSheetId;
    console.log(
      "before push:",
      localShiftDetailArr,
      "childIndex :",
      childIndex
    );
    localShiftDetailArr.unshift(pdata);
    console.log("after push:", localShiftDetailArr, "childIndex :", childIndex);
    localNewStateData[parentIndex].shiftDetails = localShiftDetailArr;
    handleNewStateData(localNewStateData);
  };

  const removeRecord = (parentIndex, childIndex) => {
    var localNewStateData = [...newStateData];
    var localShiftDetailArr = [...localNewStateData[parentIndex].shiftDetails];
    localShiftDetailArr[childIndex].isDeleted = true;
    // removing specific hours on deletion

    var sum = localShiftDetailArr
      .filter((item) => !item.isDeleted)
      .reduce((sum, item) => sum + item.hours, 0);

    localNewStateData[parentIndex].totalHours = parseFloat(sum).toFixed(2);
    localNewStateData[parentIndex].shiftDetails = localShiftDetailArr;
    handleNewStateData(localNewStateData);
  };
  const checkoverlap = (timesegments) => {
    if (timesegments.length === 1) return false;

    timesegments.sort((timesegment1, timesegment2) =>
      timesegment1[0].localeCompare(timesegment2[0])
    );

    for (let i = 0; i < timesegments.length - 1; i++) {
      const currentendtime = timesegments[i][1];
      const nextstarttime = timesegments[i + 1][0];

      if (currentendtime > nextstarttime) {
        return true;
      }
    }

    return false;
  };

  const saveAllPayroll = async () => {
    let savedArr = oriPagedata.filter((d) => d.status);

    var exitFlag = true;
    var emptyValues = [undefined, null, ""];
    var detailsArr = [];
    for (var i = 0; i < oriPagedata.length; i++) {
      const item = oriPagedata[i];

      if (
        emptyValues.includes(item.hours) ||
        emptyValues.includes(item.departmentId) ||
        emptyValues.includes(item.jobId)
      ) {
        detailsArr.push("Hours, Department and Job Title are required");
        exitFlag = false;
        break;
      }
    }
    var uniqueDays = new Set();
    oriPagedata.map((item) => uniqueDays.add(item.date));
    const daysArr = Array.from(uniqueDays);
    for (let index = 0; index < daysArr.length; index++) {
      let oldArr = oriPagedata
        .filter((d) => d.isHours === false && d.date === daysArr[index])
        .map((item) => {
          return [
            moment(item.startTime).format("h:mm"),
            moment(item.endTime).format("h:mm"),
          ];
        });
      var result = checkoverlap(oldArr);
      if (result) {
        detailsArr.push("Time overlaps for the lines");
        exitFlag = false;
        break;
      }
    }
    if (detailsArr.length) {
      setSnakeBarProps({
        msz: "Error",
        details: detailsArr,
        type: "error",
      });
    } else if (!deletedArr.length && !savedArr.length) {
      setSnakeBarProps({
        msz: "Information",
        details: ["Nothing to save or delete"],
        type: "info",
      });
      return;
    } else if (exitFlag) {
      setSnakeBarProps(null);

      if (deletedArr.length > 0) {
        deletePersonTimesheetMutate(deletedArr);
      }

      if (savedArr.length > 0) {
        let mapped = savedArr.map((s) => payloadObj(s));
        savePersonTimesheetMutate(mapped);
      }
    }

    // setSnakeBarProps(null);
    // deletePersonTimesheetMutate(deletedArr);
    // savePersonTimesheetMutate();

    // if (!isLoading1) {
    //   var deletedArr = [];
    //   var savedArr = [];
    //   var validationArr = [];
    //   newStateData.map((parent, parentIndex) => {
    //     parent.shiftDetails.map((item, childIndex) => {
    //       if (item.isSaved && !item.isDeleted) {
    //         var msg = [];
    //         if (item.hours === "") {
    //           msg.push("Hours");
    //         }
    //         if (item.departmentId === "") {
    //           msg.push("Department");
    //         }
    //         if (item.jobId === "") {
    //           msg.push("Job");
    //         }
    //         if (msg.length) {
    //           validationArr.push({
    //             parentIndex: parentIndex,
    //             childIndex: childIndex,
    //             msg: msg,
    //           });
    //         }
    //       }
    //     });
    //   });

    //   var errorFields = 0;
    //   var errorMessage = [];
    //   newStateData.map((parent, parentIndex) => {
    //     errorFields += parseInt(
    //       parent.shiftDetails.filter((item, childIndex) => {
    //         var result = _formatTimeHour(item.hours).errorMsz != "";
    //         if (result) {
    //           errorMessage.push(_formatTimeHour(item.hours).errorMsz);
    //         }
    //         return result;
    //       }).length
    //     );
    //   });
    //   if (errorFields) {
    //     setSnakeBarProps({
    //       msz: "Information",
    //       details: [errorMessage[0]],
    //       type: "error",
    //     });
    //   } else {
    //     if (validationArr.length === 0) {
    //       newStateData.map((parent) => {
    //         parent.shiftDetails.map((item) => {
    //           if (item.isDeleted && item.timeSheetId) {
    //             deletedArr.push(item.timeSheetId);
    //           }
    //           if (!item.isDeleted && item.isSaved) {
    //             savedArr.push(payloadObj(item));
    //           }
    //         });
    //       });

    //       if (!deletedArr.length && !savedArr.length) {
    //         setSnakeBarProps({
    //           msz: "Information",
    //           details: ["Nothing to save or delete"],
    //           type: "info",
    //         });
    //       } else if (deletedArr.length > 0 && savedArr.length > 0) {
    //         handleLoading1(true);
    //         deletePersonTimesheetMutate(deletedArr);
    //         savePersonTimesheetMutate(savedArr);
    //       } else if (savedArr.length > 0 && deletedArr.length === 0) {
    //         handleLoading1(true);
    //         handleDeleteFlag(true);
    //         savePersonTimesheetMutate(savedArr);
    //       } else if (deletedArr.length > 0 && savedArr.length === 0) {
    //         handleLoading1(true);
    //         handleSaveFlag(true);
    //         deletePersonTimesheetMutate(deletedArr);
    //       }
    //       // console.log("SaveAllPayroll", deletedArr, savedArr);
    //     } else {
    //       handleValidations(validationArr);
    //     }
    //   }
    // }
  };

  const payloadObj = (item) => {
    var payload = {
      effectiveDate: item.date,
      userId: commonReducer.userId,
      regularHours: item.hours,
      personId: selectedEmployee.personId,
      departmentId: item.departmentId,
      jobId: item.jobId,
      paycodeId: item.payCodeId,
      paycodeName: item.payCodeName,
      isTime: !item.startTime === "",
      isHours: item.startTime === "",
      startTime: item.startTime,
      endTime: item.endTime,
      hoursValue: item.hours,
      comment: item.comment,
    };
    if (item?.timeSheetId > 0) {
      payload.timeSheetId = item.timeSheetId;
    }
    return payload;
  };
  console.log("oriPagedata", oriPagedata, expandedGroupIds);
  const addRow = (row) => {
    let draftRow = {
      date: row.id,
      isHours: true,
      isReadOnly: "N",
      timeSheetId: -1 * Math.floor(Math.random() * 1000),
      departmentId: "300000003162807",
      departmentName: "B//07:Clinical Operations",
      jobId: "300000003088648",
      jobTitle: "Executive Director-J648",
      payCode: "REG",
      payCodeName: "Overtime 125",
      comments: "",
    };

    let cloned = [...oriPagedata];
    const index = cloned.findIndex((item) => item.date === row.id);
    cloned.splice(index, 0, draftRow);
    setOriPagedata(cloned);
  };
  const onCopy = (row) => {
    let draftRow = {
      ...row,
      startTime: "",
      endTime: "",
      hours: "0",
      isHours: true,
      isReadOnly: "N",
      timeSheetId: -1 * Math.floor(Math.random() * 1000),
      comments: "",
    };

    let cloned = [...oriPagedata];
    const index = cloned.findIndex((item) => item.date === row.date || row.id);
    cloned.splice(index, 0, draftRow);
    setOriPagedata(cloned);
  };
  const handleExpandGroups = (row) => {
    expandedGroupIds.add(row.id);
    setExpandedGroupIds(expandedGroupIds);
  };
  function onAddDraft(row) {
    addRow(row);
    handleExpandGroups(row);
  }

  function onRemove(row) {
    let cloned = [...oriPagedata];
    const index = cloned.findIndex(
      (item) => item.timeSheetId === row.timeSheetId
    );
    cloned.splice(index, 1);
    if (row.timeSheetId > 0) {
      let deleted = [...deletedArr];
      deleted.push(row.timeSheetId);
      setDeletedArr(deleted);
    }
    setOriPagedata(cloned);
  }

  function getDepartments() {
    return masterData?.departments;
  }

  function getDepartmentSelected(depId) {
    return masterData?.departments.find((d) => d.id + "" === depId + "");
  }

  function getJobs(depId) {
    const department = masterData?.departments.find(
      (dep) => dep.id + "" === depId + ""
    );

    if (department) {
      return department.jobs;
    } else {
      return [];
    }
  }

  function getJobSelected(departmentId, jobId) {
    var res = masterData?.departments
      .find((department) =>
        department.jobs.some((job) => job.id + "" === jobId + "")
      )
      ?.jobs.find((job) => job.id + "" === jobId + "");
    return res;
  }

  const tableColumns = [
    {
      key: "date",
      name: "Effective Date",
      type: "dateday",
      width: 120,
    },
    {
      key: "add",
      type: "icon",
      width: 80,
      renderCell: ({ row }) => {
        return row.isReadOnly === "Y" ? (
          row.hours ? (
            <Stack direction="row">
              <CellIcon
                Icon={ContentCopyIcon}
                tooltip={"Copy Timesheet"}
                onClick={() => onCopy(row)}
              />
              <CellIcon
                Icon={HistoryIcon}
                tooltip={"View Approval History"}
                onClick={handleOpenApprovalHistory}
              />
            </Stack>
          ) : null
        ) : (
          <Stack direction="row">
            <CellIcon
              Icon={RemoveCircleIcon}
              color="red"
              onClick={() => onRemove(row)}
            />
            <CellIcon
              Icon={ContentCopyIcon}
              tooltip={"Copy Timesheet"}
              onClick={() => onCopy(row)}
            />
          </Stack>
        );
      },
      renderGroupCell: ({ row }) => (
        <CellIcon Icon={AddCircleOutlineIcon} onClick={() => onAddDraft(row)} />
      ),
    },
    {
      key: "timHours",
      name: "Time or Hours",
      width: 150,
      renderCell: ({ row, column, onRowChange }) => {
        return (
          <ReadWriteElement
            readOnly={row.isReadOnly}
            value={row}
            type="timerange"
          >
            <EvoTimeRangePicker
              value={row}
              onChange={(newValue) => {
                onRowChange({
                  ...row,
                  ...newValue,
                  isHours:
                    newValue.startTime && newValue.endTime ? false : true,
                  status: newValue.hours != row.hours ? "updated" : null,
                });
              }}
            />
          </ReadWriteElement>
        );
      },
      renderGroupCell({ childRows }) {
        var scheduledHours = childRows[0].shiftTiming?.schedule;
        var actualHours = childRows[0].shiftTiming?.actual;
        scheduledHours = scheduledHours
          ? scheduledHours?.split(" ").filter((list) => list)
          : [];
        actualHours = actualHours
          ? actualHours?.split(" ").filter((list) => list)
          : [];
        var arr = [
          { hours: scheduledHours, color: "#0a8a4b" },
          { hours: actualHours, color: "#c11414" },
        ];
        return (
          <>
            {arr?.map((hoursList, index) => {
              const { hours, color } = hoursList;
              return hours?.map((item, index) => {
                return (
                  <Typography color={color} fontSize={11} key={index}>
                    {item}
                  </Typography>
                );
              });
            })}
          </>
        );
      },
    },
    {
      key: "departmentName",
      name: "Department",
      width: 200,
      renderCell: ({ row, column, onRowChange }) => (
        <ReadWriteElement readOnly={row.isReadOnly} value={row.departmentName}>
          <EvoDropDown
            data={getDepartments() || []}
            getoptionlabelkey="name"
            width={column.width - 17}
            caller={(newValue) => {
              onRowChange({
                ...row,
                departmentId: newValue.id,
                departmentName: newValue.name,
                status: newValue.id != row.departmentId ? "updated" : null,
              });
            }}
            month={getDepartmentSelected(row.departmentId)}
          />
        </ReadWriteElement>
      ),
    },
    {
      key: "jobTitle",
      name: "Job",
      width: 180,
      renderCell: ({ row, column, onRowChange }) => (
        <ReadWriteElement readOnly={row.isReadOnly} value={row.jobTitle}>
          <EvoDropDown
            data={getJobs(row.departmentId) || []}
            getoptionlabelkey="jobTitle"
            width={column.width - 17}
            caller={(newValue) => {
              let newRow = {
                ...row,
                jobId: newValue.id,
                jobTitle: newValue.jobTitle,
                status: newValue.id != row.jobId ? "updated" : null,
              };
              onRowChange(newRow);
            }}
            month={getJobSelected(row.departmentId, row.jobId)}
          />
        </ReadWriteElement>
      ),
    },
    {
      key: "payCodeName",
      name: "Paycode",
      width: 140,
      renderCell: ({ row, column, onRowChange }) => (
        <ReadWriteElement readOnly={row.isReadOnly} value={row.payCodeName}>
          <EvoDropDown
            data={masterData?.paycodes}
            getoptionlabelkey="name"
            width={column.width - 17}
            caller={(newValue) =>
              onRowChange({
                ...row,
                payCodeId: newValue.id,
                payCodeName: newValue.name,
                status: newValue.name != row.payCodeName ? "updated" : null,
              })
            }
            month={masterData?.paycodes.find((p) => p.name === row.payCodeName)}
          />
        </ReadWriteElement>
      ),
    },
    {
      key: "comment",
      name: "Comments",
      width: 180,
      renderCell: ({ row, column, onRowChange }) => {
        return (
          <ReadWriteElement readOnly={row.isReadOnly} value={row.comment}>
            <CustomTextField
              value={row.comment}
              onChange={(e) => {
                onRowChange({
                  ...row,
                  comment: e.target.value,
                  status: e.target.value != row.comment ? "updated" : null,
                });
              }}
            />
          </ReadWriteElement>
        );
      },
      renderGroupCell({ childRows }) {
        var commentsArr = childRows[0].shiftTiming?.comments;
        commentsArr = commentsArr
          ? commentsArr?.split(",").filter((list) => list)
          : [];
        return (
          <>
            {commentsArr?.map((item, index) => {
              return (
                <Typography fontSize={11} key={index}>
                  {item}
                </Typography>
              );
            })}
          </>
        );
      },
    },
    {
      key: "hours",
      name: "Hrs",
      type: "float",
      renderGroupCell({ childRows }) {
        return (
          <EvoHBox justifyContent="right">
            <Typography style={{ fontWeight: "bold" }}>
              {childRows
                .reduce((sum, item) => (sum += parseFloat(item.hours || 0)), 0)
                .toFixed(2)}
            </Typography>
          </EvoHBox>
        );
      },
      renderSummaryCell({ row }) {
        return 100;
      },
    },
  ];
  const FooterComponent = () => (
    <EvoHNavBox
      Right={
        <Typography sx={{ fontWeight: 700, pr: 0.5 }}>
          {oriPagedata
            .reduce((sum, item) => (sum += parseFloat(item.hours || 0)), 0)
            .toFixed(2)}
        </Typography>
      }
    ></EvoHNavBox>
  );
  const expandAll = () => {
    var uniqueDates = new Set();
    oriPagedata.map((currentValue) => {
      uniqueDates.add(currentValue.date);
    });
    setExpandedGroupIds(uniqueDates);
  };
  const collapseAll = () => {
    setExpandedGroupIds(new Set());
  };

  return (
    <CustomDialog
      title={`Timesheet of ${selectedEmployee.fullName} from ${commonReducer.startDate} To ${commonReducer.endDate}`}
      handleClose={handleClose}
      snakeBarProps={snakeBarProps}
      isLoading={isFetching || isLoadingMasterData}
      actions={{
        onSave: saveAllPayroll,
        isSaving: isDeleting || isSaving,
        onCancel: handleClose,
      }}
    >
      <EvoHNavBox Right={<SummaryList oriPagedata={oriPagedata} />} />

      <EvoDataGrid
        columns={tableColumns}
        rows={oriPagedata}
        setRows={(rows) => {
          setOriPagedata(rows);
        }}
        HeaderComponent={() => (
          <EvoHNavBox
            Left={
              <EvoHBox>
                {[
                  {
                    btnText: "Expand All",
                    startIcon: <AddIcon />,
                    onClick: expandAll,
                  },
                  {
                    btnText: "Collapse All",
                    startIcon: <RemoveIcon />,
                    onClick: collapseAll,
                  },
                ].map((item) => {
                  return <EvoButton {...item} />;
                })}
              </EvoHBox>
            }
            Right={<EvoLegends statuses={LegendsTimeHour} />}
          />
        )}
        FooterComponent={FooterComponent}
        expandedGroupIds={expandedGroupIds}
        setExpandedGroupIds={setExpandedGroupIds}
        // filterId="taskId"

        groupByColumns={["date"]}
        // bottomSummaryRows={[
        //   {
        //     totalCount: 100,
        //   },
        // ]}
      />
      {approvalHistoryModal ? (
        <ApprovalHistory togglerHandler={handleCloseApprovalHistory} />
      ) : (
        ""
      )}
    </CustomDialog>
  );
};
