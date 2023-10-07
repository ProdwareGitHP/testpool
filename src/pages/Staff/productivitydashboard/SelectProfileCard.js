import React, { useEffect, useState } from "react";

import { productivityDateWidgetOption, uniqueArrByKey } from "../../contants";
import { DateWidget } from "../shared/datewidget";

import CustomFilterList from "../../../components/CustomFilterList";
import { EvoHBox } from "../../../components/EvoBox";

export const SelectProfileCard = (props) => {
  const { dashboardData, setTabledata, TableData } = props;
  const [oriPagedata, setOriPagedata] = useState(dashboardData);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    if (TableData) {
      const newArray = [];
      TableData.forEach((item) => {
        if (item.data && item.data.length > 0) {
          item.data.forEach((dataItem) => {
            const { departmentName, roleName } = dataItem;
            const { employeeNumber, fullName } = item;

            newArray.push({
              departmentName,
              roleName,
              employeeNumber,
              fullName,
            });
          });
        }
      });
      setOriPagedata(newArray);
    }
  }, [TableData]);

  const filterButtons = [
    {
      btnName: "Employee",
      filterKey: "employeeNumber",
      oriPagedataKeys: ["employeeNumber", "fullName"],
      oriPagedata: oriPagedata,
      type: "Employee",
      columns: [
        {
          name: "Employee Number",
          key: "employeeNumber",
          width: 200,
        },
        {
          name: "Employee",
          key: "fullName",
          width: 200,
        },
      ],
    },
    {
      btnName: "Department",
      filterKey: "departmentName",
      oriPagedataKeys: ["departmentName"],
      oriPagedata: oriPagedata,
      type: "Department",
      columns: [
        {
          name: "Department",
          key: "departmentName",
          width: 300,
        },
      ],
    },
    {
      btnName: "Job Title",
      filterKey: "roleName",
      oriPagedataKeys: ["roleName"],
      oriPagedata: oriPagedata,
      type: "Job Titles",
      columns: [
        {
          name: "Job Title",
          key: "roleName",
          width: 300,
        },
      ],
    },
  ];

  return (
    <EvoHBox divider>
      <DateWidget
        durationFilter={true}
        {...props}
        dateWidgetOption={productivityDateWidgetOption}
      />

      <CustomFilterList
        filterButtons={filterButtons}
        oriPagedata={oriPagedata}
        filter={filter}
        setFilter={setFilter}
      />
    </EvoHBox>
  );
};
