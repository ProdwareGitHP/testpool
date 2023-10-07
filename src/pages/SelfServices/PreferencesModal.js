import { makeStyles } from "@mui/styles";
import React from "react";
import { useState } from "react";
import SelectSearch from "../Roster/spotroster/SelectSearch";

const PreferencesModal = ({
  timeZoneData,
  toggleHandler,
  handelTimechange,
}) => {
  const [state1, setState1] = useState(-1);
  const [curIndex, setCurIndex2] = useState(-1);
  const [expanded, setExpanded] = React.useState("panel1");
  const [timeZoneDataDup, setTimeZoneDataDup] = useState(timeZoneData);
  const [userVisibleName, setUserVisibleName] = useState("");

  const searchWorkPlan = () => {
    setTimeZoneDataDup(timeZoneData.filter(filterStaff));
  };

  const resetWorkPlan = () => {
    setUserVisibleName("");
    setTimeZoneDataDup(timeZoneData);
  };
  const filterStaff = (item) => {
    if (userVisibleName != "") {
      if (
        item?.userVisibleName
          .toLowerCase()
          .includes(userVisibleName.toLowerCase())
      ) {
        return item;
      }
    } else {
      return item;
    }
  };
  const empChange = (e) => {
    setUserVisibleName(e.target.value);
  };
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleSelect = () => {
    if (iitem) {
      handelTimechange(iitem);
      setState1(-1);
      toggleHandler(false);
    }
  };

  const handleClose1 = () => {
    setState1(-1);
    toggleHandler(false);
  };

  const [iitem, setItem] = useState();
  const [currIndex, setCurIndex] = useState(-1);

  const setChange = (index, item, curIndex) => {
    setState1(index);
    setItem(item);
    setCurIndex(curIndex);
  };

  const classes = useStyles();
  const tableColumns = [
    {
      xs: "12",
      name: "Time Zone",
      key: "userVisibleName",
    },
  ];
  const data = {
    classes,
    customDialogProps: {
      maxWidth: "sm",
      title: "Search & Select : TzVisibleName",
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
        fieldName: "Time Zone",
        mainContainerProps: {
          xs: "12",
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
            width: "70%",
          },
          value: userVisibleName,
          onChange: empChange,
        },
      },
    ],
    customButtonsArr: [
      {
        btnText: "Search",
        variant: "contained",
        btnClass: { backgroundColor: "#124590", color: "#fff" },
        onClick: searchWorkPlan,
      },
      {
        btnText: "Reset",
        variant: "contained",
        btnClass: { backgroundColor: "#124590", color: "#fff" },
        onClick: resetWorkPlan,
      },
    ],
    columns: tableColumns,
    columnProps: {
      style: {
        overflow: "hidden",
        textOverflow: "clip",
        maxWidth: "25ch",
        whiteSpace: "nowrap",
        marginLeft: "0px",
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
    rows: timeZoneDataDup,

    rowContainerProps: {
      className: `${classes.bordermanage}`,
    },
    rowCellProps: {
      style: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        maxWidth: "23ch",
        textOverflow: "ellipsis",
        fontSize: "14px",
        fontFamily: "Inter",
      },
    },
    handleChange: setChange,
    curIndex: curIndex,
    state: state1,
    // state: state1,
    customButtonProps: {
      btnText: "Select",
      variant: "contained",
      btnClass: {
        backgroundColor: "#124590",
        color: "#fff",
        fontSize: "12px",
      },
      onClick: handleSelect,
    },
  };
  return <SelectSearch {...data} />;
};

export default PreferencesModal;
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
