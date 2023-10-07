import { Box, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomSearch from "../../../components/CustomSearch";
import EvoDataGrid from "../../../components/EvoDataGrid";
import { useMutation } from "react-query";
import { getallStaffData } from "../../../services/api";
import { useSelector } from "react-redux";
import { EvoVBox } from "../../../components/EvoBox";

const CustomStaffPage = (props) => {
  const commonReducer = useSelector((state) => state.commonReducer);

  const [staffData, setStaffData] = useState([]);

  const [filterData, setFilterData] = useState(staffData);

  const { mutate: staffListMutate } = useMutation(getallStaffData, {
    onSuccess: (data, context, variables) =>
      onSuccessProfileList1(data, context, variables),
    onError: (data, context, variables) =>
      onErrorProfileList1(data, context, variables),
  });

  const onSuccessProfileList1 = (data) => {
    setStaffData(data?.data?.data);
    setFilterData(data?.data?.data);
  };

  const onErrorProfileList1 = (data) => {};
  useEffect(() => {
    Object.keys(commonReducer.selectedProjectObj)?.length > 0 &&
      staffListMutate({
        asc: true,
        pageNo: "0",
        pageSize: "1000",
        sortingField: "fullName",
        userId: commonReducer.userId,
      });
  }, []);

  const staffDataColumns = [
    {
      key: "staffName",
      name: "Employee",
      width: 400,
      type: "person",
    },
    {
      key: "department",
      name: "Department",
      width: 250,
    },
    {
      key: "jobTitle",
      name: "JobTitle",
      width: 200,
    },
    {
      key: "BusinessUnit",
      name: "Bussiness Unit",
      width: 200,
    },
  ];

  return (
    <EvoVBox>
      <CustomSearch
        columns={staffDataColumns}
        data={staffData}
        setFilterData={setFilterData}
      />

      <EvoDataGrid
        filterId="personId"
        columns={staffDataColumns}
        rows={filterData}
        height={250}
        selectedRows={props.selectedRows}
        setSelectedRows={props.setSelectedRows}
        addSelectColumn
        multiFilterSelection={false}
        isSingleSelection={false}
      />
    </EvoVBox>
  );
};

export default CustomStaffPage;
