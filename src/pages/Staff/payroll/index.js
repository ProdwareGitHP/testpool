import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CustomPage } from "../../../components/CustomPage";
import CustomSummaryList from "../../../components/CustomSummaryList";
import EvoDataGrid from "../../../components/EvoDataGrid";
import { useGetPayrollAudit } from "../../../services/payroll";
import { payrollAuditWidgetOption } from "../../contants";
import { DateWidget } from "../shared/datewidget";
import Actions from "./Actions";
import ApprovePopUp from "./ApprovePopUp";
import PaycodeDropdown from "../shared/PaycodeDropdown";

import { EvoHBox } from "../../../components/EvoBox";
import getSummaryList from "./summaryList";
import getTableColumns from "./tableColumns";
import { Typography } from "@mui/material";
import CustomSearch from "../../../components/CustomSearch";
import { EvoDataForm } from "../../../components/EvoDataForm";

import { paycodes } from "../../contants";

const allPaycode = [
  { code: "all", npayCodeName: "All PayCode", payCodeId: 1 },
  ...paycodes,
];

export default function IndexPR(props) {
  const [approvePopUp, setApprovePopUp] = useState(false);
  const [submitData, setSubmitData] = useState([]);
  const [dupdata, setDupdata] = React.useState([]);
  const [errorProps, setErrorProps] = useState({});
  const [subButton, setSubButton] = useState("");
  const [selectedRows, setSelectedRows] = useState(new Set());
  const { userId, startDate, endDate } = useSelector(
    (state) => state.commonReducer
  );

  const [currentPaycode, setCurrentPaycode] = useState();
  const [selectedFilter, setSelectedFilter] = useState({
    mappedKey: "pendingToSubmit",
    api: "Draft",
  });

  const {
    data: payrollData,
    isFetching,
    refetch,
  } = useGetPayrollAudit({
    userId: userId,
    startDate: startDate,
    endDate: endDate,
    payCode: currentPaycode?.npayCodeName,
    status: selectedFilter.api,
  });
  useEffect(() => {
    if (payrollData?.list) {
      setDupdata(payrollData?.list);
    }
  }, [payrollData?.list]);

  const SubmitAuditData = (e) => {
    setSubButton(e);
    setApprovePopUp(true);

    var arr = Array.from(selectedRows);
    setSubmitData(arr);
  };

  const onApproveSuccess = () => {
    refetch();
    setApprovePopUp(false);
    setErrorProps({
      msz: "Record Submitted Succesfully!",
      type: "success",
    });
    setSelectedRows(new Set());
  };
  const filterQuery = (item, queryValue) => {
    console.log(item, "item");
    if (queryValue != "") {
      if (
        item?.fullName
          ?.toString()
          .toLowerCase()
          .includes(queryValue.toLowerCase())
      ) {
        return item;
      }
    } else {
      return item;
    }
  };
  return (
    <CustomPage
      title={props.title}
      isLoading={isFetching}
      snakeBarProps={errorProps}
    >
      <EvoHBox divider>
        <DateWidget {...props} dateWidgetOption={payrollAuditWidgetOption} />

        <EvoDataForm
          formData={{
            item: {
              label: "Paycode",
              type: "dropdown",
              editorProps: {
                width: 120,
                data: allPaycode,
                caller: setCurrentPaycode,
                selectIndex: 0,
                getoptionlabelkey: "npayCodeName",
              },
            },
          }}
        />
      </EvoHBox>

      <CustomSummaryList
        summaryList={getSummaryList(payrollData)}
        onClick={setSelectedFilter}
        scrollable={true}
        selectedFilter={selectedFilter}
      />

      <>
        <CustomSearch
          columns={[
            {
              key: "fullName",
              name: "Employee",
              width: 200,
              filterQuery: filterQuery,
            },
          ]}
          data={payrollData?.list}
          setFilterData={setDupdata}
        />

        <EvoDataGrid
          addSelectColumn
          headerRowHeight={70}
          exportOptions={{ fileName: "payrolls" }}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          filterId="payrollAuditId"
          columns={getTableColumns(payrollData)}
          rows={dupdata}
          HeaderComponent={() => (
            <Actions
              rowData={dupdata}
              SubmitAuditData={SubmitAuditData}
              setDupdata={setDupdata}
              currentPaycode={currentPaycode}
              selectedFilter={selectedFilter}
            />
          )}
        />
      </>

      {approvePopUp && (
        <ApprovePopUp
          open={approvePopUp}
          handleClose={() => setApprovePopUp(false)}
          onSuccess={onApproveSuccess}
          submitData={submitData}
          subButton={subButton}
          setErrorProps={setErrorProps}
          selectedFilter={selectedFilter}
          //handleFilterClick={refresh}
          // setAllChecked={setAllChecked}
        />
      )}
    </CustomPage>
  );
}
