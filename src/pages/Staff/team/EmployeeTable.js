import { Box, Tooltip } from "@mui/material";
import React, { useState } from "react";

import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";

import { updateState } from "../../../redux/commonSlice";
import { RequestListModal } from "./RequestListModal";
import EvoDataGrid from "../../../components/EvoDataGrid";

export const EmployeeTable = (props) => {
  const { pagedata, oriPagedata, filterData, setIsLoading,title } = props;
  const classes = useStyles();

  const [project2, setProject2] = useState(false);
  const [selectedItem, setItem] = useState();
  const dispatch = new useDispatch();

  const requestclickhandler = (item) => {
    dispatch(updateState({ personId: item?.personId }));
    setProject2(true);
    setItem(item);
  };

  const tableColumns = [
    {
      key: "personName",
      name: "Employee Name",
      type: "person",
      frozen: true,
    },
    {
      key: "effectiveDate",
      name: "Effective Date",
      frozen: true,
      type: "date",
    },
    {
      key: "request",
      name: "Request",
      type: "icon",
      width: 80,
      frozen: true,
      renderCell: ({ row }) => {
        return (
          <Box className={classes.checkboxParent}>
            <Tooltip title="View/Add Requests">
              <MarkunreadMailboxIcon
                className={classes.checkboxicon}
                onClick={() => requestclickhandler(row)}
              />
            </Tooltip>
          </Box>
        );
      },
    },
    { key: "departmentName", name: "Department", width: 200, frozen: true },
    { key: "jobTitle", name: "Job Title", width: 180, frozen: true },
    { key: "schTimeStart", name: "Sch In", type: "time" },
    { key: "schTimeEnd", name: "Sch Out", type: "time" },
    {
      key: "schHrs",
      name: "Sch Hrs",
      width: 100,
      type: "float",
    },
    { key: "onCall", name: "On Call", width: 150 },
    { key: "punchTimes", name: "Punch Times(s)", width: 280 },
    {
      key: "actHrs",
      name: "Act Hrs",
      width: 100,
      type: "float",
    },
    { key: "violationCode", name: "Violation Code", width: 200 },
    { key: "requestName", name: "Request", width: 200 },
    {
      key: "absenseHrs",
      name: "Absence(s)",
      width: 200,
    },
    {
      key: "holidayHours",
      name: "Holiday",
      width: 150,
    },
  ];

  return (
    <>
      <EvoDataGrid
        columns={tableColumns}
        exportOptions={{ fileName: props.title }}
        rows={filterData}
        // allowExport={true}
      />

      {project2 && (
        <RequestListModal
          togglerHandler={setProject2}
          oriPagedata={oriPagedata}
          person={selectedItem}
        />
      )}
    </>
  );
};

const useStyles = makeStyles(() => ({
  font: {
    fontSize: "14px !important",
    // minHeight: 42,
  },
  jobtitleboxparent: {
    width: 150,
    justifyContent: "left",
    display: "flex",
    alignItems: "center",
    padding: "0 0px",
  },
  personParent_h: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    width: 180,
  },
  personParent: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    width: 180,
  },
  effectiveParent: {
    width: 115,
    justifyContent: "left",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  requestParent: {
    width: 70,
    justifyContent: "left",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  departmentParent: {
    width: 200,
    justifyContent: "left",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  floating_cell: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  header_text: {
    fontSize: "14px !important",
  },
  body_text: {
    fontSize: "14px !important",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  mainbox: {
    border: "1px solid #E9E9E9 !important",
    height: "calc(100vh - 350px)",
    //overflow: "auto",
  },
  innermainbox: {
    display: "inline-block",
    width: "715px",
    verticalAlign: "top",
  },
  innerboxemployee: {
    display: "flex !important",
    padding: "15px 0px",
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#F1F1F1",
    alignItems: "center",
  },
  employeeboxparent: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    width: 200,
  },
  employeetext: {
    fontSize: "14px !important",
  },
  jobtitletext: {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    fontSize: "14px !important",
  },
  shifttypeboxparent: {
    width: 80,
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  bandboxparent: {
    width: 50,
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  pagedatamainbox: {
    display: "flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
  },
  checkboxparent: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    width: 200,
    display: "flex !important",
    alignItems: "center !important",
    padding: "0 0 0 15px !important",
  },
  itemfullname: {
    fontSize: "14px !important",
    // textOverflow: "ellipsis",
    // overflow: "hidden",
    // whiteSpace: "nowrap",
    width: "100% !important",
    fontSize: "14px !important",
  },
  dept: {
    fontSize: "14px !important",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  checkboxicon: {
    color: "#124590 !important",
    fontSize: "large !important",
    cursor: "pointer !important",
  },
  checkboxParent: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  itemjobtitleparent: {
    width: 150,
    justifyContent: "flex-start !important",
    textAlign: "left !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    minHeight: 42,
  },
  requestparent: {
    width: 70,
    justifyContent: "flex-start !important",
    textAlign: "left !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  itemshifttypeparent: {
    width: 200,
    justifyContent: "left !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  itembandparent: {
    width: 50,
    justifyContent: "left !important",
    alignItems: "center !important",
    paddingLeft: 10,
    display: "flex !important",
  },
  iconparent: {
    width: 80,
    justifyContent: "lef !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  FileCopyIcon: {
    color: "#124590 !important",
    fontSize: "small !important",
    marginLeft: "15px !important",
  },
  deleteCopyIcon: {
    color: "#D90000 !important",
    fontSize: "small !important",
    marginLeft: "15px !important",
  },
  dayArrmainbox: {
    width: "calc(100% - 715px) !important",
    overflow: "hidden !important",
    display: "inline-block !important",
  },
  dayarrboxparent: {
    display: "inline-flex !important",
    padding: "1px 0 !important",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#F1F1F1 !important",
    minHeight: 52,
    textAlign: "right",
  },
  optionboxparent: {
    width: 60,
    justifyContent: "flex-end !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  optiontext: {
    color: "black !important",
    fontWeight: "bold !important",
    fontSize: "12px !important",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  wrkhrsbox: {
    width: 65,
    justifyContent: "flex-end !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  floating_celltext: {
    color: "black !important",
    fontWeight: "bold !important",
    fontSize: "14px !important",
  },
  floating_cellbox: {
    width: 100,
    justifyContent: "flex-end !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  floating_cellbox_punchTime: {
    width: 130,
    justifyContent: "flex-end !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  floating_cellbox_violation: {
    width: 200,
    justifyContent: "flex-end !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  pagedataarraymainbox: {
    display: "inline-flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
  },
  pagedataoptionmainbox: {
    width: 60,
    justifyContent: "flex-end !important",
    borderLeft: "1px solid rgb(233, 233, 233) !important",
    minHeight: 42,
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  itemparent: {
    width: 65,
    justifyContent: "flex-end",
    borderLeft: "1px solid rgb(233, 233, 233)",
    minHeight: 42,
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  itemparent: {
    width: 65,
    justifyContent: "flex-end",
    borderLeft: "1px solid rgb(233, 233, 233)",
    minHeight: 42,
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  itemprojecthrsparent: {
    width: 78,
    justifyContent: "flex-end",
    borderLeft: "1px solid rgb(233, 233, 233)",
    minHeight: 42,
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  commonitemparent: {
    width: 100,
    justifyContent: "flex-end",
    borderLeft: "1px solid rgb(233, 233, 233)",
    minHeight: 42,
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  commonitemparent_violation: {
    width: 200,
    justifyContent: "flex-end",
    borderLeft: "1px solid rgb(233, 233, 233)",
    minHeight: 42,
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  commonitemparent_punchTime: {
    width: 130,
    justifyContent: "flex-end",
    borderLeft: "1px solid rgb(233, 233, 233)",
    minHeight: 42,
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
}));
