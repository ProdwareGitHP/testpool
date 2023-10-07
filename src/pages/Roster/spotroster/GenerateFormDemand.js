import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { CustomDialog } from "../../../components/CustomDialog";
import { EvoHBox, EvoVBox } from "../../../components/EvoBox";
import { EvoDataForm } from "../../../components/EvoDataForm";
import EvoDataGrid from "../../../components/EvoDataGrid";
import getTemplate from "../../../components/getTemplate";
import { CreateEmployeeSuggestions } from "../../../services/api";
import {
  useGetDemandData,
  useGetEmployeeSuggestion,
} from "../../../services/roster";
import { dateConverter } from "../../../utils/commonService";

const GenerateFormDemand = (props) => {
  const commonReducer = useSelector((state) => state.commonReducer);
  const {
    setStatus1,
    setSnakeBarProps,

    refetchEmployeeList,
  } = props;

  const [demandTemplate, setDemandTemplate] = useState(null);
  const [selectDemand, setSelectDemand] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errorProps, setErrorProps] = useState({});
  const [gridData, setGridData] = useState({});
  const [loading, setLoading] = useState(true);

  const handleClose = () => {
    setSelectDemand({});
    setStatus1(0);
  };

  const { data: demandID } = useGetDemandData({
    demandId: demandTemplate?.demandTemplateId,
  });

  const { data: employeeSuggestions, isLoading: isLoad } =
    useGetEmployeeSuggestion(
      demandID?.length > 0 &&
        startDate != "" &&
        endDate != "" && {
          demandTemplateDetailsDto: demandID,
          startDate: dateConverter(startDate),
          endDate: dateConverter(endDate),
          profileId: demandTemplate?.profileId,
          userId: commonReducer.userId,
        },
      null,
      demandTemplate?.demandTemplateId === undefined
    );
  const { mutate: CreateSuggestions, isLoading: isLoadingSug } = useMutation(
    CreateEmployeeSuggestions,
    {
      onSuccess: (data, context, variables) =>
        onCreateSuggestions(data, context, variables),
      onError: (data, context, variables) =>
        onErrCreateSuggestions(data, context, variables),
    }
  );

  const onCreateSuggestions = (data) => {
    if (data) {
      setSnakeBarProps({
        msz: "Succesfully submitted Employee Suggestions",
        type: "success",
      });
      setSelectDemand({});
      refetchEmployeeList();
      setStatus1(0);
    }
  };
  const onErrCreateSuggestions = (data) => {
    if (data) {
      setErrorProps({
        msz: data.response.data.status.description,
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (isLoad) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoad]);

  const handleSubmitSuggestions = (e) => {
    if (employeeSuggestions === undefined) {
      setErrorProps({
        msz: "Nothing to Submit.",
        type: "error",
      });
      return;
    }
    let newgridData = {};
    Object.keys(gridData).map((key) => {
      let copyGridData = [...gridData[key]];
      let newArr = [];
      copyGridData.map((item) => {
        delete item.index;
        let employee = item.Employee;
        delete item.Employee;

        newArr.push({
          employee: employee,
          dateSuggestion: item,
        });
      });
      newgridData[key] = newArr;
    });
    let pdata = {
      endDate: dateConverter(endDate),
      startDate: dateConverter(startDate),
      userId: commonReducer.userId,
      empSuggetionMap: newgridData,
    };
    CreateSuggestions(pdata);
  };

  useEffect(() => {
    let localGridData = {};

    employeeSuggestions &&
      Object.keys(employeeSuggestions?.empSuggetionMap)?.map((item) => {
        let tableRows = employeeSuggestions?.empSuggetionMap[item]?.map(
          (value, index) => {
            return {
              Employee: value.employee,
              ...value.dateSuggestion,
              index: index,
            };
          }
        );
        localGridData[item] = tableRows;
      });
    setGridData(localGridData);
  }, [employeeSuggestions]);

  const tableColumns = [
    {
      key: "department",
      name: "Department",
      width: 200,
    },
    {
      key: "jobTitle",
      name: "Job Title",
      width: 200,
    },
    {
      key: "specialized_department",
      name: "Specialized Department",
      width: 200,
    },
    {
      key: "splitShift",
      name: "Split Shift",
      width: 200,
    },
    {
      key: "workduration",
      name: "Work Duration",
      width: 200,
    },
    {
      key: "timeStart",
      name: "Time Start",
      width: 100,
    },
    {
      key: "timeEnd",
      name: "Time End",
      width: 100,
    },
    {
      key: "skill",
      name: "Skill",
      width: 150,
    },
    {
      key: "fte",
      name: "Fte",
      width: 120,
      type: "number",
    },
    {
      key: "employeeType",
      name: "Employee Type",
      width: 200,
    },
    {
      key: "sun",
      name: "Sun",
      width: 60,
    },
    {
      key: "mon",
      name: "Mon",
      width: 60,
    },
    {
      key: "tue",
      name: "Tue",
      width: 60,
    },
    {
      key: "wed",
      name: "Wed",
      width: 60,
    },
    {
      key: "thu",
      name: "Thu",
      width: 60,
    },
    {
      key: "fri",
      name: "Fri",
      width: 60,
    },
    {
      key: "sat",
      name: "Sat",
      width: 60,
    },
    {
      key: "gender",
      name: "Gender",
      width: 100,
    },
    {
      key: "nationality",
      name: "Nationality",
      width: 100,
    },
  ];

  let suggestionsColumns = employeeSuggestions
    ? employeeSuggestions?.header?.map((item, index) => {
        if (index > 0) {
          return {
            name: item,
            key: item,
            type: "checkBox",
            width: 100,
          };
        } else {
          return {
            name: item,
            key: item,
            frozen: true,
            width: 200,
          };
        }
      })
    : [];

  const handleChangeCheck = (label, index, key, value) => {
    let localGridData = { ...gridData };
    localGridData[label][index][key] = value;

    setGridData(localGridData);
  };

  const formData = {
    gap: 3,
    direction: "row",
    items: [
      {
        label: "Demand Template",
        value: demandTemplate,
        required: true,
        type: "lookup",
        editorProps: {
          selectItem: (item) => setDemandTemplate(item),
          template: getTemplate("DEMAND_TEMPLATE", {
            userId: commonReducer.userId,
          }),
          columnKey: "demandTemplateName",
        },
      },
      {
        label: "Start Date",
        value: startDate,
        required: true,
        type: "date",
        onChange: (date) => setStartDate(date),
        styles: { width: 130, justifyContent: "end" },
      },
      {
        label: "End Date",
        value: endDate,
        required: true,
        type: "date",
        onChange: (date) => setEndDate(date),
        styles: { width: 130, justifyContent: "end" },
      },
    ],
  };
  const formDataTime = {
    gap: 3,
    direction: "row",
    items: [
      {
        label: "Valid From",
        value: demandTemplate?.validFrom ? demandTemplate?.validFrom : "",
        required: true,
        type: "text",
      },
      {
        label: "Valid To",
        value: demandTemplate?.validTo ? demandTemplate?.validTo : "",
        required: true,
        type: "text",
      },
      {
        label: "Profile",
        value: demandTemplate?.profile,
        required: true,
        type: "text",
      },
    ],
  };
  return (
    <CustomDialog
      maxWidth="xl"
      title="Generate From Demand"
      open="true"
      snakeBarProps={errorProps}
      setSnakeBarProps={setErrorProps}
      handleClose={handleClose}
      actions={{ onSubmit: handleSubmitSuggestions }}
      isLoading={loading || isLoadingSug}
    >
      <EvoDataForm formData={formData} />

      <EvoDataForm formData={formDataTime} />

      <EvoDataGrid columns={tableColumns} rows={demandID} />

      <EvoVBox style={{ width: "100%" }}>
        {Object.keys(gridData || [])?.map((item) => {
          return (
            <EvoDataGrid
              columns={suggestionsColumns}
              rows={gridData[item]}
              title={item}
              tableLabel={item}
              handleChangeCheck={handleChangeCheck}
            />
          );
        })}
      </EvoVBox>
    </CustomDialog>
  );
};

export default GenerateFormDemand;
