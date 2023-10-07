import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EvoDataGrid from "../../../components/EvoDataGrid";
import AssignRoster from "./AssignRoster";
import RoasterFilterbtns from "./RoasterFilterbtns";
import UpdateRoster from "./UpdateRoster";
import getTableData from "./getTableData";
import EvoLegends from "../../../components/EvoLegends";
import LegendsRoaster from "./LegendsRoaster.json";
import { EvoHNavBox } from "../../../components/EvoBox";
import { updateState } from "../../../redux/commonSlice";
import DeleteModal from "./DeleteModal";
import { PersonRosterDataWithDate } from "../../../services/api";
import { useMutation } from "react-query";
import {
  filterEmployeeNumber,
  getPersonIdsArr,
  isEmptyShifts,
  sort,
} from "../utils";
import CopyButtonDialog from "./CopyButton";

const RoasterPersonDetailTable = (props) => {
  const commonReducer = useSelector((state) => state.commonReducer);
  const {
    oriPagedata,
    data,
    viewBy,
    checked,
    setChecked,
    resetChecked,
    setSnakeBarRosterProps,
    refetchEmployeeList,
    apprStatus,
    sendApprovalMutate,
    markApprovedMutate,
  } = props;
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const classes = useStyles();

  const [result, setResult] = useState([]);
  const [row, setRow] = useState();
  const [assignAnotherRoster, setAssignAnotherRoster] = useState(false);
  const [personRosterId, setPersonRosterId] = useState("");
  const [onClickDefaultPerson, setOnClickDefaultPerson] = useState({});
  const [workDurationArr, setWorkDurationArr] = useState([]);
  const [jobtitlesArr, setJobTitlesArr] = useState([]);

  const [Assign, setAssign] = useState(false);

  const selectAssign = (id) => {
    let index = result[0].value.findIndex((x) => x.personId === id);
    setAssign(true);
    var localemployee = { ...result[0].value[index] };

    setOnClickDefaultPerson(localemployee);
  };

  const getFormattedDate = (day) => {
    var str = day.split("(")[0].split("/");
    var current_day = str[0];
    var current_month = str[1];
    var current_year = commonReducer.endDate.split("-")[2];
    day = [current_month, current_day, current_year].join("-");
    dispatch(
      updateState({
        effectiveDate: day,
      })
    );
  };
  const btnClick = (personRosterId, row) => {
    setRow(row);
    setPersonRosterId(personRosterId);
    setToggle(true);
  };

  useEffect(() => {
    let localArr = [];
    for (let x in oriPagedata?.personRosterData) {
      let data1 = {
        label: x,
        value: sort((oriPagedata?.personRosterData)[x], "fullName", "asc"),
      };
      localArr.push(data1);
    }
    if (localArr.length != 0) {
      localArr[0].value = localArr[0].value.sort((a, b) =>
        a.fullName.localeCompare(b.fullName)
      );
    }
    localArr = sort(localArr, "label", "desc");
    setResult(localArr);

    var localWorkDurationArr = [],
      localJobTilesArr = [];
    let workDurationList =
      "header" in oriPagedata
        ? oriPagedata.header && "dynamicColoums" in oriPagedata.header
          ? oriPagedata.header.dynamicColoums
          : []
        : [];

    oriPagedata.eachDayShiftCount &&
      Object.keys(oriPagedata.eachDayShiftCount).forEach(function (key, index) {
        Object.keys(oriPagedata.eachDayShiftCount[key]).forEach(function (
          key2,
          index
        ) {
          if (workDurationList.includes(key2)) {
            console.log(oriPagedata.eachDayShiftCount[key], "key2");
            if (!localWorkDurationArr.includes(key2)) {
              localWorkDurationArr.push(key2);
            }
          } else {
            if (!localJobTilesArr.includes(key2)) {
              localJobTilesArr.push(key2);
            }
          }
        });
      });
    setWorkDurationArr(localWorkDurationArr);
    setJobTitlesArr(localJobTilesArr);
  }, [oriPagedata]);

  const [status1, setStatus1] = useState(0);
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const role = commonReducer.selectedProjectObj.role;
  const isApprover = role === "Approver";
  const isCreater = role === "Creater";

  let params = {
    setSelectedEmployee,
    isApprover,
    viewBy,
    data: oriPagedata,
    setEmployeeNumber,
    setStatus1,
    btnClick,
    getFormattedDate,
    selectAssign,
    classes,
    result,
    workDurationArr,
    jobtitlesArr,
  };

  let res = getTableData(params);

  const { mutate: DeletePersonData, isLoading } = useMutation(
    PersonRosterDataWithDate,
    {
      onSuccess: (data, context, variables) => onCreateRequest(data),
      onError: (data, context, variables) => onErrorRequest(data),
    }
  );

  const onCreateRequest = (data) => {
    setSnakeBarRosterProps({
      msz: "Shift(s) deleted successfully",
      type: "success",
    });
    setStatus1(0);
    refetchEmployeeList();
    if (resetChecked) {
      resetChecked();
    }
    setEmployeeNumber("");
  };

  const onErrorRequest = (data) => {
    setSnakeBarRosterProps({
      msz: "Unable to delete Shift(s)",
      type: "error",
    });
    setStatus1(0);
  };
  const getClassName = (row) => {
    var classNames = `${classes.Cell} `;
    if (viewBy?.value === "Employee") {
      if (!("personId" in row)) {
        classNames += classes.Employee;
      }
    } else if ("totalSchHrs" in row) {
      classNames += classes.root;
    }
    return classNames;
  };
  const getRowHeight = ({ row }) => {
    var shiftInformationList = row?.shiftInformation;
    var maxLength = 1;
    var defaultWorkDurationHeight = 0;

    if (shiftInformationList) {
      Object.keys(shiftInformationList).map((day) => {
        if (shiftInformationList[day]) var shiftObj = shiftInformationList[day];
        if (shiftObj) {
          var shiftInfoList = shiftObj.shiftInfoList;

          if (shiftInfoList.length > maxLength) {
            maxLength = shiftInfoList.length;
          }
        }
      });
    }
    defaultWorkDurationHeight =
      viewBy.value === "Employee" ? 20 : maxLength > 1 ? 0 : 15;
    return 15 * maxLength + defaultWorkDurationHeight;
  };
  const handleCloseCopyDialog = () => {
    setStatus1(0);
  };
  const onSuccessCopyShift = () => {
    setSnakeBarRosterProps({
      msz: "Shift(s) copied.",
      type: "success",
    });
    refetchEmployeeList();
  };

  return (
    <>
      <EvoDataGrid
        {...res}
        exportOptions={{ fileName: props.title }}
        HeaderComponent={() => (
          <EvoHNavBox
            Left={
              <RoasterFilterbtns
                apprStatus={apprStatus}
                setSnakeBarRosterProps={setSnakeBarRosterProps}
                checked={getPersonIdsArr(checked)}
                refetchEmployeeList={refetchEmployeeList}
                resetChecked={resetChecked}
                sendApprovalMutate={sendApprovalMutate}
                markApprovedMutate={markApprovedMutate}
              />
            }
            Right={<EvoLegends statuses={LegendsRoaster} />}
          />
        )}
        addSelectColumn={true}
        selectedRows={checked}
        setSelectedRows={setChecked}
        filterId={"employeeNumber"}
        rowClass={(row) => getClassName(row)}
        rowHeight={getRowHeight}
      />

      {toggle && (
        <UpdateRoster
          setAssign={setAssign}
          setOnClickDefaultPerson={setOnClickDefaultPerson}
          setAssignAnotherRoster={setAssignAnotherRoster}
          toggle={toggle}
          togglehandler={setToggle}
          selectedRow={row}
          data={data}
          personRosterId={personRosterId}
          setSnakeBarRosterProps={setSnakeBarRosterProps}
          refetchEmployeeList={refetchEmployeeList}
        />
      )}
      {status1 === 1 && (
        <DeleteModal
          setStatus1={setStatus1}
          DeletePersonData={DeletePersonData}
          checked={employeeNumber}
          resetChecked={resetChecked}
          isLoading={isLoading}
          setSnakeBarProps={setSnakeBarRosterProps}
          isEmptyShiftValues={isEmptyShifts(
            filterEmployeeNumber(employeeNumber, data)
          )}
        />
      )}
      {Assign && (
        <AssignRoster
          assignAnotherRoster={assignAnotherRoster}
          setAssignAnotherRoster={setAssignAnotherRoster}
          togglehandler={setAssign}
          data={data}
          defaultPerson={onClickDefaultPerson}
          refetchEmployeeList={refetchEmployeeList}
          setSnakeBarRosterProps={setSnakeBarRosterProps}
        />
      )}
      {status1 === 2 && (
        <CopyButtonDialog
          handleClose={handleCloseCopyDialog}
          data={data}
          selectedEmployee={selectedEmployee}
          onSuccess={onSuccessCopyShift}
        />
      )}
    </>
  );
};

export default RoasterPersonDetailTable;

const useStyles = makeStyles({
  root: {
    backgroundColor: "#EFEBF9",
    "& .rdg-checkbox-label": {
      display: "none",
    },
    "& .rdg-cell": {
      outline: "0",
      borderInlineEnd: "none",
    },
  },
  Employee: {
    "& .rdg-checkbox-label": {
      display: "none",
    },
    "& .rdg-cell": {
      outline: "0",
      paddingInline: 0,
    },
    "& .MuiBox-root": {
      padding: "0px 10px",
    },
  },

  body_text: {
    fontSize: "14px !important",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    width: "100%",
  },
  link_text: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },

  FileCopyIcon: {
    // color: "#124590 !important",
    fontSize: "medium !important",
    marginLeft: "15px !important",
    cursor: "pointer",
  },
  deleteCopyIcon: {
    color: "#D90000 !important",
    fontSize: "medium !important",
    marginLeft: "15px !important",
    cursor: "pointer",
  },
});
