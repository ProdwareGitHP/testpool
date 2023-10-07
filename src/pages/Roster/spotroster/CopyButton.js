import { useEffect, useState } from "react";
import { CustomDialog } from "../../../components/CustomDialog";
import { EvoHBox, EvoVBox } from "../../../components/EvoBox";
import { EvoDataForm } from "../../../components/EvoDataForm";
import { EvoButton } from "../../../components/EvoButton";
import getTemplate from "../../../components/getTemplate";
import EvoDataGrid from "../../../components/EvoDataGrid";
import { useSelector } from "react-redux";
import { dateConverter } from "../../../utils/commonService";
import {
  useGetEmployeeDetails,
  useGetPersonRosterData,
} from "../../../services/roster";
import moment from "moment";
import { Box, Typography } from "@mui/material";
import TransferList from "./TransferList";

const CopyButtonDialog = (props) => {
  const { handleClose, data, selectedEmployee, onSuccess } = props;
  const commonReducer = useSelector((state) => state.commonReducer);
  const { startDate, endDate } = commonReducer;
  const [snakeBarProps, setSnakeBarProps] = useState({});
  const [fromDate, setFromDate] = useState(
    startDate ? new Date(startDate) : null
  );
  const [toDate, setToDate] = useState(endDate ? new Date(endDate) : null);
  const [employee, setEmployee] = useState(selectedEmployee);
  const [detailsFlag, setDetailsFlag] = useState(true);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  useEffect(() => {
    if (employee) {
      setLeft(data?.filter((item) => item.personId !== employee.personId));
    }
  }, [employee]);

  const disableDetailsFlag = () => {
    setDetailsFlag(false);
  };

  const formData = {
    gap: 1,
    labelWidth: 100,
    direction: "column",
    items: [
      {
        label: "Copy From",
        value: employee,
        type: "lookup",
        editorProps: {
          selectItem: setEmployee,
          template: getTemplate(
            "ROSTER_SINGLE_EMPLOYEE_TEMPLATE",
            null,
            null,
            null,
            null,
            data
          ),
          columnKey: "fullName",
        },
      },
      {
        label: "From",
        value: fromDate,
        type: "date",
        onChange: (value) => setFromDate(value),
        styles: { width: 130, justifyContent: "end" },
      },
      {
        label: "To",
        value: toDate,
        type: "date",
        onChange: (value) => setToDate(value),
        styles: { width: 130, justifyContent: "end" },
      },
    ],
  };
  const singleEmployeeDetailsSelector = (obj) => {
    var res = {};
    var arr = Object.keys(obj);
    arr?.map((keys) => {
      var value = obj[keys];
      res = { ...res, [keys.toLocaleLowerCase()]: value };
    });
    return arr.length ? [res] : [];
  };
  const getRowHeight = (arr) => {
    var maxHeight = 0;
    arr?.map((item) => {
      maxHeight = Object.values(item).reduce((height, value) => {
        if (value.length > height) {
          height = value.length;
        }
        return height;
      }, maxHeight);
    });
    maxHeight = maxHeight > 0 ? (maxHeight + 1) * 25 : -1;
    return maxHeight;
  };

  const {
    data: singleEmployeeDetails,
    isLoading,
    isRefetching,
    refetch,
  } = useGetEmployeeDetails(
    {
      fromPersonId: employee.personId,
      fromDate: dateConverter(fromDate),
      toDate: dateConverter(toDate),
    },
    singleEmployeeDetailsSelector,
    detailsFlag === false
  );
  const handleGoButton = () => {
    refetch();
  };
  useEffect(() => {
    disableDetailsFlag();
    setRows(singleEmployeeDetails);
    setColumns(generateColumns(fromDate, toDate));
  }, [singleEmployeeDetails]);

  const {
    data: personRosterData,
    refetch: copyShiftApi,
    isRefetching: isRefetching1,
    isLoading: isLoading2,
  } = useGetPersonRosterData(
    {
      userId: commonReducer.userId,
      fromPersonId: employee.personId,
      fromDate: dateConverter(fromDate),
      toDate: dateConverter(toDate),
      toPersonIds: right.map((item) => item.personId),
    },
    null,
    true
  );

  useEffect(() => {
    if (personRosterData) {
      console.log("onSuccess:----->");
      handleClose();
      onSuccess();
    }
  }, [personRosterData]);
  const generateColumns = (startDate, endDate) => {
    var start_date = moment(startDate);
    var end_date = moment(endDate);
    var columns = [];
    const renderCell = ({ row, column }) => {
      const list = row[column.key];
      return (
        <EvoVBox>
          {list?.map((item, index) => {
            var { startTime, endTime, duration } = item;
            duration = parseFloat(duration).toFixed(2);
            return (
              <EvoHBox style={{ padding: "0px 5px" }}>
                {duration ? (
                  <Typography sx={{ fontWeight: "bold" }}>
                    {duration}
                  </Typography>
                ) : (
                  ""
                )}
                {startTime && endTime ? (
                  <Typography>{`${startTime}-${endTime}`}</Typography>
                ) : (
                  ""
                )}
              </EvoHBox>
            );
          })}
        </EvoVBox>
      );
    };

    while (start_date.isBefore(end_date) || start_date.isSame(end_date)) {
      columns.push({
        name: start_date.format("DD MMM (ddd)"),
        key: start_date.format("DD-MMM (ddd)").toLocaleLowerCase(),
        width: 145,
        renderCell: renderCell,
      });

      start_date = moment(start_date).add(1, "day");
    }

    return columns;
  };
  const onCopy = () => {
    if (right.length === 0) {
      setSnakeBarProps({
        msz: "Information",
        details: ["Please select employee to copy shift(s)."],
        type: "info",
      });
      return;
    }
    copyShiftApi();
  };
  var rowHeight = getRowHeight(rows);
  return (
    <CustomDialog
      maxWidth="lg"
      width={1000}
      title="Copy Shift"
      open={true}
      isLoading={isLoading || isRefetching || isLoading2 || isRefetching1}
      handleClose={handleClose}
      snakeBarProps={snakeBarProps}
      setSnakeBarProps={setSnakeBarProps}
      actions={{ onCopy: onCopy, onCancel: handleClose }}
    >
      <EvoVBox divider={false} gap={1}>
        <Typography sx={{ color: "red" }}>
          *Overlapped shifts will be replaced.
        </Typography>
        <EvoDataForm formData={formData} />
        <EvoButton
          btnText="Go"
          onClick={handleGoButton}
          styles={{ width: "fit-content", marginLeft: 110 }}
        />
      </EvoVBox>
      <EvoDataGrid rowHeight={rowHeight} columns={columns} rows={rows} />
      <EvoVBox divider={false} style={{ marginBottom: "30px" }}>
        <Typography sx={{ color: "#d57659" }}>
          Select Employee(s) to whome these shifts need to copy
        </Typography>
        <TransferList
          left={left}
          setLeft={setLeft}
          right={right}
          setRight={setRight}
        />
      </EvoVBox>
    </CustomDialog>
  );
};
export default CopyButtonDialog;
