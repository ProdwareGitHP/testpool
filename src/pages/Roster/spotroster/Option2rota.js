import AddIcon from "@mui/icons-material/Add";
import React, { useContext, useEffect, useState } from "react";
import { EvoButton } from "../../../components/EvoButton";
import EvoDataGrid from "../../../components/EvoDataGrid";
import { EvoVBox } from "../../../components/EvoBox";
import { EvoDataForm } from "../../../components/EvoDataForm";
import getTemplate from "../../../components/getTemplate";
import moment from "moment";
import CustomStaffPage from "./CustomStaffPage";
import { RotaContext } from "../../../components/CustomContent/context";

const Option2rota = (props) => {
  const {
    startFrom,
    setStartFrom,
    flexRotaName,
    setFlexRotaName,
    flexarr,
    setFlexArr,
    foreverFlag,
    setForeverFlag,
    setSelectedRowsFlexRota,
    selectedRowsFlexRota,
  } = useContext(RotaContext);

  const updateArr = (index, arr) => {
    var newArr = [...flexarr];
    if (newArr && newArr.length) {
      arr.map((item) => {
        newArr[index][item.key] = item.newValue ? item.newValue : "";
      });

      setFlexArr(newArr);
    }
  };
  const handleChangeSequence = (item, index) => {
    const arr = [{ key: "sequence", newValue: item }];
    updateArr(index, arr);
  };
  const handleChangeIteration = (item, index) => {
    const arr = [{ key: "iteration", newValue: item }];
    updateArr(index, arr);
  };

  const workDurationTemplate = () => {
    return getTemplate(
      "WORK_DURATION_TEMPLATE",
      {},
      workDurationTemplateSelector
    );
  };
  const handleChangeSunWorkDuration = (item, index) => {
    const arr = [
      {
        key: "Sun",
        newValue: Object.keys(item).length ? item["workDurationCode"] : "",
      },
      {
        key: "sun",
        newValue: Object.keys(item).length ? item["workDurationId"] : "",
      },
    ];

    updateArr(index, arr);
  };
  const handleChangeMonWorkDuration = (item, index) => {
    const arr = [
      {
        key: "Mon",
        newValue: Object.keys(item).length ? item["workDurationCode"] : "",
      },
      {
        key: "mon",
        newValue: Object.keys(item).length ? item["workDurationId"] : "",
      },
    ];

    updateArr(index, arr);
  };
  const handleChangeTueWorkDuration = (item, index) => {
    const arr = [
      {
        key: "Tue",
        newValue: Object.keys(item).length ? item["workDurationCode"] : "",
      },
      {
        key: "tue",
        newValue: Object.keys(item).length ? item["workDurationId"] : "",
      },
    ];

    updateArr(index, arr);
  };
  const handleChangeWedWorkDuration = (item, index) => {
    const arr = [
      {
        key: "Wed",
        newValue: Object.keys(item).length ? item["workDurationCode"] : "",
      },
      {
        key: "wed",
        newValue: Object.keys(item).length ? item["workDurationId"] : "",
      },
    ];

    updateArr(index, arr);
  };
  const handleChangeThuWorkDuration = (item, index) => {
    const arr = [
      {
        key: "Thu",
        newValue: Object.keys(item).length ? item["workDurationCode"] : "",
      },
      {
        key: "thu",
        newValue: Object.keys(item).length ? item["workDurationId"] : "",
      },
    ];

    updateArr(index, arr);
  };
  const handleChangeFriWorkDuration = (item, index) => {
    const arr = [
      {
        key: "Fri",
        newValue: Object.keys(item).length ? item["workDurationCode"] : "",
      },
      {
        key: "fri",
        newValue: Object.keys(item).length ? item["workDurationId"] : "",
      },
    ];

    updateArr(index, arr);
  };
  const handleChangeSatWorkDuration = (item, index) => {
    const arr = [
      {
        key: "Sat",
        newValue: Object.keys(item).length ? item["workDurationCode"] : "",
      },
      {
        key: "sat",
        newValue: Object.keys(item).length ? item["workDurationId"] : "",
      },
    ];

    updateArr(index, arr);
  };
  const getTimeFormat = (value) => {
    return moment(value).format("hh:mm A");
  };

  const workDurationTemplateSelector = (arr) => {
    return arr?.map((item, index) => {
      return {
        ...item,
        index,
        workDurationId: parseInt(item.workDurationId),
        time: `${getTimeFormat(item.timeStart)} - ${getTimeFormat(
          item.timeEnd
        )}`,
      };
    });
  };

  const handleAddWeek = () => {
    const abc = [...flexarr];
    abc.push({
      index: flexarr?.length,
      iteration: "1",
      sun: "",
      Sun: "",
      Mon: "",
      mon: "",
      Tue: "",
      tue: "",
      Wed: "",
      wed: "",
      Thu: "",
      thu: "",
      Fri: "",
      fri: "",
      Sat: "",
      sat: "",
      sequence: "1",
    });
    setFlexArr(abc);
  };

  useEffect(() => {
    if (flexarr.length === 0) {
      handleAddWeek();
    }
  }, []);

  const deleteAddWeek = (i) => {
    if (i >= 0) {
      var deleteval = [];
      if (flexarr.length) {
        deleteval = [...flexarr];
      }
      deleteval?.splice(i, 1);
      deleteval = deleteval.map((item, index) => {
        return { ...item, index: index };
      });
      setFlexArr(deleteval);
    }
  };

  const tableColumns = [
    {
      key: "sequence",
      name: "*Seq",
      width: 60,
      type: "text",
      onChange: handleChangeSequence,
    },
    {
      key: "iteration",
      name: "*Iteration",
      width: 80,
      type: "text",

      onChange: handleChangeIteration,
    },
    {
      key: "Sun",
      name: "Sun",
      width: 220,
      type: "lookup",
      templateMethod: workDurationTemplate,
      selectItem: handleChangeSunWorkDuration,
    },
    {
      key: "Mon",
      name: "Mon",
      width: 220,
      type: "lookup",
      templateMethod: workDurationTemplate,
      selectItem: handleChangeMonWorkDuration,
    },
    {
      key: "Tue",
      name: "Tue",
      width: 220,
      type: "lookup",
      templateMethod: workDurationTemplate,
      selectItem: handleChangeTueWorkDuration,
    },
    {
      key: "Wed",
      name: "Wed",
      width: 220,
      type: "lookup",
      templateMethod: workDurationTemplate,
      selectItem: handleChangeWedWorkDuration,
    },
    {
      key: "Thu",
      name: "Thu",
      width: 220,
      type: "lookup",
      templateMethod: workDurationTemplate,
      selectItem: handleChangeThuWorkDuration,
    },
    {
      key: "Fri",
      name: "Fri",
      width: 220,
      type: "lookup",
      templateMethod: workDurationTemplate,
      selectItem: handleChangeFriWorkDuration,
    },
    {
      key: "Sat",
      name: "Sat",
      width: 220,
      type: "lookup",
      templateMethod: workDurationTemplate,
      selectItem: handleChangeSatWorkDuration,
    },
    {
      key: "action",
      name: "Action",
      width: 60,
      type: "delete",
      onDeleted: deleteAddWeek,
    },
  ];

  const formData = {
    gap: 3,
    direction: "row",
    items: [
      {
        label: "Start From",
        value: startFrom,
        required: true,
        type: "date",
        onChange: (date) => setStartFrom(date),
        styles: { width: 130, justifyContent: "end" },
      },
      {
        label: "Flex Rota Name",
        value: flexRotaName,
        required: true,
        onChange: (e) => setFlexRotaName(e.target.value),
      },
      {
        label: "Forever Flag",
        value: foreverFlag,
        type: "checkbox",
        onChangeCheck: () => setForeverFlag(true),
      },
    ],
  };

  return (
    <>
      <EvoVBox>
        <EvoDataForm formData={formData} />
        <EvoDataGrid
          rows={flexarr}
          columns={tableColumns}
          HeaderComponent={() => (
            <EvoButton
              btnText="Add Week"
              startIcon={<AddIcon />}
              onClick={handleAddWeek}
            />
          )}
        />
      </EvoVBox>
      <CustomStaffPage
        setSelectedRows={setSelectedRowsFlexRota}
        selectedRows={selectedRowsFlexRota}
      />
    </>
  );
};

export default Option2rota;
