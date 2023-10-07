import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import SelectSearch from "../../Roster/spotroster/SelectSearch";
// import SelectSearch from "./SelectSearch";

const DepatmentPopup = (props) => {
  const {
    toggleHandler,
    departmentLov,
    handleChangeDepartment,
    resetChangeDepartment,
    state1,
    setState1,
    curIndex,
    enterDep,
    setenterDep,
  } = props;
  const [staffdup, setStaff] = useState(departmentLov);
  const [empname, setEmpname] = useState("");

  const searchStaff = () => {
    setStaff(departmentLov.filter(filterStaff));
  };

  const resetStaff = () => {
    setEmpname("");
    setStaff(departmentLov);
  };

  const filterStaff = (item) => {
    if (empname != "") {
      if (item?.departmentName.toLowerCase().includes(empname.toLowerCase())) {
        return item;
      }
    } else if (enterDep != "") {
      if (item?.departmentName.toLowerCase().includes(enterDep.toLowerCase())) {
        return item;
      }
    } else {
      return item;
    }
  };

  const empChange = (e) => {
    setEmpname(e.target.value);
  };

  const handleClose = () => {
    handleChangeDepartment(state1, iitem, currIndex);
    setState1(-1);
    toggleHandler(0);
  };

  const handleClose1 = () => {
    setState1(-1);
    toggleHandler(0);
  };

  const [iitem, setItem] = useState();
  const [currIndex, setCurIndex] = useState(-1);

  const setChange = (index, item, curIndex) => {
    setState1(index);
    setItem(item);
    setCurIndex(curIndex);
  };

  const [expanded, setExpanded] = React.useState("panel1");
  const classes = useStyles();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    if (!enterDep && enterDep != "") {
      setEmpname(enterDep);
      searchStaff();
    }
  }, []);

  // provide either key or method
  const tableColumns = [
    {
      xs: "12",
      name: "Department",
      key: "departmentName",
    },
  ];
  const data = {
    classes,
    customDialogProps: {
      maxWidth: "sm",
      title: "Search & Select : Department",
      open: "true",
      handleClose: handleClose1,
    },
    accordianProps: {
      expanded: expanded === "panel1",
      onChange: handleChange("panel1"),
    },
    summaryProps: {
      "aria-controls": "panel1d-content",
      id: "panel1d-header",
    },
    summaryFirstChildProps: {
      style: {
        fontSize: "14px",
        fontFamily: "Inter",
        marginLeft: "5px",
        fontWeight: "bolder",
      },
    },
    summaryValue: "Search",
    customTextFieldContainer: {
      style: { marginTop: "10px" },
      rowSpacing: 1,
    },
    customTextFieldArr: [
      {
        fieldName: "Department",
        mainContainerProps: {
          className: `${classes.maincontainer}`,
        },
        mainContentBoxProps: {
          className: `${classes.maincontentBox}`,
          style: {
            marginLeft: "30px",
          },
        },
        formFieldParentProps: {},
        formFieldProps: {
          style: {
            fontSize: "12px",
            fontFamily: "Inter",
            fontWeight: "bolder",
          },
        },
        customTextFieldParentProps: {
          style: {
            marginLeft: "10px",
          },
        },
        customTextFieldProps: {
          type: "text",
          style: {
            width: "100%",
          },
          value: empname,
          onChange: empChange,
        },
      },
    ],
    customButtonsArr: [
      {
        btnText: "Search",
        variant: "contained",
        btnClass: { backgroundColor: "#124590", color: "#fff" },
        onClick: searchStaff,
      },
      {
        btnText: "Reset",
        variant: "contained",
        btnClass: { backgroundColor: "#124590", color: "#fff" },
        onClick: resetStaff,
      },
    ],
    columns: tableColumns,
    columnProps: {
      style: {
        marginLeft: "20px",
      },
    },
    columnContainerProps: {
      className: `${classes.headermanage}`,
    },
    columnCellProps: {
      style: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "clip",
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: "Inter",
      },
    },
    rows: staffdup,
    rowContainerProps: {
      className: `${classes.bordermanage}`,
    },
    rowCellProps: {
      style: {
        fontSize: "14px",
        fontFamily: "Inter",
      },
    },
    handleChange: setChange,
    curIndex: curIndex,
    state: state1,
    customButtonProps: {
      btnText: "Select",
      variant: "contained",
      btnClass: {
        backgroundColor: "#124590",
        color: "#fff",
        fontSize: "12px",
      },
      onClick: handleClose,
    },
  };

  return <SelectSearch {...data} />;
};

export default DepatmentPopup;

const useStyles = makeStyles(() => ({
  maincontainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  maincontentBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  bordermanage: {
    borderBottom: "1px solid #E9E9E9",
    cursor: "pointer",
  },
  selectbutton: {
    display: "flex !important",
    justifyContent: "flex-end !important",
    // margin: "100px 0px 0px 0px !important"
  },
  headermanage: {
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#D6DFE6",
    alignItems: "center",
  },
}));
