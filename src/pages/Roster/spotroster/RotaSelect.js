import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { CustomDialog } from "../../../components/CustomDialog";
import { EvoVBox } from "../../../components/EvoBox";
import EvoTab from "../../../components/EvoTab";
import { CreateFlexRota, GenerateRotaShifts } from "../../../services/api";
import { dateConverter } from "../../../utils/commonService";
import Option1rota from "./Option1rota";
import Option2rota from "./Option2rota";
import { RotaContext } from "../../../components/CustomContent/context";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  // const classes2= useStyles2();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const RotaSelect = (props) => {
  const {
    setStatus1,
    setSnakeBarProps,
    changeDelete,
    setChangeDelete,
    refetchEmployeeList,
  } = props;
  const [selectedRows, setSelectedRows] = useState();
  const [selectedRowsFlexRota, setSelectedRowsFlexRota] = useState();
  const [workRotation, setWorkRotation] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [startFrom, setStartFrom] = useState("");
  const [errorProps, setErrorProps] = useState({});
  const [foreverFlag, setForeverFlag] = useState(false);
  const [flexRotaName, setFlexRotaName] = useState("");
  const commonReducer = useSelector((state) => state.commonReducer);
  const [flexarr, setFlexArr] = useState([]);
  const [checked, setChecked] = useState([]);
  const [checked1, setChecked1] = useState([]);
  const handleClose = () => {
    setStatus1(0);
  };
  useEffect(() => {
    var arr = selectedRows != undefined && Array.from(selectedRows);
    if (arr.length) {
      setChecked(arr.toString().split(","));
    }
  }, [selectedRows]);

  useEffect(() => {
    var arr =
      selectedRowsFlexRota != undefined && Array.from(selectedRowsFlexRota);
    if (arr.length) {
      setChecked1(arr.toString().split(","));
    }
  }, [selectedRowsFlexRota]);

  const CloseForm = (e) => {
    setStatus1(0);
  };

  const [value, setValue] = React.useState(0);

  const { mutate: CreateRotaShift, isLoading: isLoadingOnSave } = useMutation(
    GenerateRotaShifts,
    {
      onSuccess: (data, context, variables) =>
        onCreateRequest(data, context, variables),
      onError: (data, context, variables) =>
        onErrorRequest(data, context, variables),
    }
  );

  const onCreateRequest = (data) => {
    setSnakeBarProps({
      msz: "Rota Submitted.",
      type: "success",
    });
    refetchEmployeeList();

    CloseForm();
  };

  const onErrorRequest = (data) => {
    setErrorProps({
      msz: data.response.data.status.description,
      type: "error",
    });
  };

  const genRotaShift = () => {
    if (workRotation === null) {
      return setErrorProps({
        msz: "Work Rotation is required.",
        type: "error",
      });
    }
    if (startDate === "") {
      return setErrorProps({
        msz: "Rota Start Date is required.",
        type: "error",
      });
    }
    if (checked.length === 0) {
      return setErrorProps({
        msz: "Please select at least one employee.",
        type: "error",
      });
    }

    let pdata = {
      personId: checked,
      rotaStartDate: dateConverter(startDate),
      userId: commonReducer.userId,
      workRotationId: [workRotation?.workRotationId],
    };
    CreateRotaShift(pdata);
  };

  const { mutate: CreateRota, isLoading: LoadingOnOption2 } = useMutation(
    CreateFlexRota,
    {
      onSuccess: (data, context, variables) =>
        onCreateOption2Request(data, context, variables),
      onError: (data, context, variables) =>
        onErrorOption2Request(data, context, variables),
    }
  );

  const onCreateOption2Request = (data) => {
    setSnakeBarProps({
      msz: "Flex Rota Saved",
      type: "success",
    });
    refetchEmployeeList();
    setSelectedRowsFlexRota(new Set());
    CloseForm();
  };

  const onErrorOption2Request = (data) => {
    setErrorProps({
      msz: data.response.data.status.description,
      type: "error",
    });
  };
  const createRotaShift = () => {
    if (startFrom === "") {
      return setErrorProps({
        msz: "Start From is Required.",
        type: "error",
      });
    }
    if (flexRotaName === "") {
      return setErrorProps({
        msz: "Flex Rota Name is Required..",
        type: "error",
      });
    }
    if (checked1.length === 0) {
      return setErrorProps({
        msz: "Please select at least one employee.",
        type: "error",
      });
    }
    const isEmptyField = flexarr.find(
      (fn) =>
        !fn.Sun &&
        !fn.Mon &&
        !fn.Tue &&
        !fn.Wed &&
        !fn.Thu &&
        !fn.Fri &&
        !fn.Sat
    );
    if (isEmptyField) {
      return setErrorProps({
        msz: "Please Select Work Duration.",
        type: "error",
      });
    }
    const pdata = {
      flexRotaLines: flexarr,
      flexRotaName: flexRotaName,
      forverFlag: foreverFlag == true ? "Y" : "N",
      personIds: Array.from(selectedRowsFlexRota),
      startFrom: dateConverter(startFrom),
      userId: commonReducer.userId,
    };
    CreateRota(pdata);
  };

  const tabsData = [
    {
      title: "Rota",

      Content: Option1rota,
    },
    {
      title: "Flex Rota",

      Content: Option2rota,
    },
  ];

  return (
    <CustomDialog
      maxWidth="xl"
      title="Rota"
      isLoading={isLoadingOnSave || LoadingOnOption2}
      open="true"
      handleClose={handleClose}
      snakeBarProps={errorProps}
      setSnakeBarProps={setErrorProps}
      actions={
        value === 0 ? { onSave: genRotaShift } : { onSave: createRotaShift }
      }
    >
      <RotaContext.Provider
        value={{
          setSelectedRows,
          selectedRows,
          workRotation,
          setWorkRotation,
          setStartDate,
          startDate,
          flexRotaName,
          setFlexRotaName,
          startFrom,
          setStartFrom,
          foreverFlag,
          setForeverFlag,
          flexarr,
          setFlexArr,
          setSelectedRowsFlexRota,
          selectedRowsFlexRota,
        }}
      >
        <EvoVBox divider gap={3}>
          <EvoTab tabsData={tabsData} value={value} setValue={setValue} />
        </EvoVBox>
      </RotaContext.Provider>
    </CustomDialog>
  );
};

export default RotaSelect;
