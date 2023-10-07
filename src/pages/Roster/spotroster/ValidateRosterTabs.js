import React, { useState } from "react";

import EvoTab from "../../../components/EvoTab";
import JobValidation from "./JobValidation";
import DepartmentValidation from "./DepartmentValidation";
import LocationValidation from "./LocationValidation";
import { ValidateRostersContext } from "../../../components/CustomContent/context";
import { TwoNumberCell } from "./TwoNumnberCell";

const tabsData = [
  {
    title: "Job Validations",
    Content: JobValidation,
    label: "Job Title",
  },
  {
    title: "Department Validations",
    Content: DepartmentValidation,
    label: "Department",
  },
  {
    title: "Location Validations",
    Content: LocationValidation,
    label: "Location",
  },
];
const ValidateRosterTabs = ({ validateRosterData, select }) => {
  const [activeTab, setActiveTab] = useState(0);

  const getTableColumns = (arr) => {
    let res = [];

    arr?.map((item, index) => {
      let tableColumns = {
        name: item,
      };
      if (index === 0) {
        tableColumns["key"] = "label";
        tableColumns["width"] = 180;
      } else {
        tableColumns["key"] = item;
        tableColumns["renderCell"] = TwoNumberCell;
        tableColumns["width"] = 105;
      }

      res.push(tableColumns);
    });
    return res;
  };

  const handleChangeFirstRowLabel = (arr, label) => {
    if (arr.length) {
      arr[0].name = label;
      return arr;
    } else {
      return [];
    }
  };
  let columns = validateRosterData ? validateRosterData?.header : [];
  const handlePopColumn = (arr) => {
    if (select !== 0) {
      let copyArr = [...arr];
      copyArr.pop();
      return copyArr;
    } else {
      return arr;
    }
  };
  columns = handlePopColumn(columns);
  columns = getTableColumns(columns);

  let label = tabsData[activeTab].label;

  columns = handleChangeFirstRowLabel(columns, label);
  let rowKey = tabsData[activeTab]?.title;
  let rows = validateRosterData ? validateRosterData?.masterMap[rowKey] : {};

  const getRows = (obj) => {
    if (obj === undefined || Object.keys(obj).length === 0) {
      return [];
    }
    let tableRows = Object.keys(obj)?.map((key, index) => {
      return {
        label: key,
        ...obj[key],
        parentTab: select,
        index: index,
      };
    });
    return tableRows;
  };
  const handlePopRow = (row) => {
    if (select !== 0) {
      let copyArr = { ...row };
      delete copyArr["Total Hrs"];
      return copyArr;
    } else {
      return row;
    }
  };
  rows = handlePopRow(rows);
  let rowData = getRows(rows);
  return (
    <ValidateRostersContext.Provider value={{ columns, rowData }}>
      <EvoTab tabsData={tabsData} value={activeTab} setValue={setActiveTab} />
    </ValidateRostersContext.Provider>
  );
};

export default ValidateRosterTabs;
