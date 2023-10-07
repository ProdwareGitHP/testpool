import { Done, FileCopy } from "@mui/icons-material";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { dateConverter } from "../../../utils/commonService";

import { EvoHBox } from "../../../components/EvoBox";
import { EvoButton } from "../../../components/EvoButton";
import { exportData } from "../../../services/api";

const Actions = ({
  rowData,
  SubmitAuditData,
  selectedFilter,
  setDupdata,
  currentPaycode,
}) => {
  const [query, setQuery] = useState("");

  const commonReducer = useSelector((state) => state.commonReducer);

  const searchFilter = () => {
    setDupdata(rowData?.filter(filterQuery));
  };

  const resetFilter = () => {
    setDupdata(rowData);
    setQuery("");
  };

  const changeWork = (e) => {
    setQuery(e.target.value);
  };

  const filterQuery = (item) => {
    if (query != "") {
      if (
        item?.fullName.toString().toLowerCase().includes(query.toLowerCase())
      ) {
        return item;
      }
    } else {
      return item;
    }
  };

  const onSuccessExport = (data, context, variables) => {
    const element = document.createElement("a");
    element.href = URL.createObjectURL(
      new Blob([data.data], { type: "text/plain" })
    );
    element.download = "PayrollAudit_DateWise.csv";
    document.body.appendChild(element);
    element.click();
  };

  const onError = (data) => {};

  const { mutate: exportDataCall, isLoading: isLoadExport } = useMutation(
    exportData,
    {
      onSuccess: (data, context, variables) =>
        onSuccessExport(data, context, variables),
      onError: (data, context, variables) => onError(data, context, variables),
    }
  );

  const onExportClick = () => {
    exportDataCall({
      userId: commonReducer.userId,
      startDate: dateConverter(commonReducer.startDate),
      endDate: dateConverter(commonReducer.endDate),
      payCode: currentPaycode,
      status: selectedFilter.api,
    });
  };

  return (
    <EvoHBox divider>
      {rowData.length > 0 && (
        <EvoHBox>
          {(selectedFilter.mappedKey === "pendingToSubmit" ||
            selectedFilter.mappedKey === "needCorrection") && (
            <EvoButton
              btnText="Submit"
              onClick={() => SubmitAuditData("Submit")}
              startIcon={<Done />}
            />
          )}
          {selectedFilter.mappedKey === "underAudit" && (
            <>
              <EvoButton
                btnText="Ready For Payroll"
                onClick={() => SubmitAuditData("ReadyForPayroll")}
                startIcon={<Done />}
              />

              <EvoButton
                btnText="Request For Correction"
                onClick={() => SubmitAuditData("RequestForCorrection")}
                startIcon={<Done />}
              />
            </>
          )}
          {selectedFilter.mappedKey === "readyForPayroll" && (
            <EvoButton
              btnText="Transfer To Payroll"
              onClick={() => SubmitAuditData("Transferred")}
              startIcon={<Done />}
            />
          )}
        </EvoHBox>
      )}

      <EvoButton
        btnText="Date Wise Export"
        onClick={onExportClick}
        startIcon={<FileCopy />}
      />

      {/* <EvoHBox>
        <CustomTextField
          placeholder="Enter Text"
          style={{ width: 150 }}
          value={query}
          onChange={(e) => changeWork(e)}
        />

        <EvoButton
          btnText="Filter By Employee"
          onClick={searchFilter}
          startIcon={<FilterAltIcon />}
        />

        <EvoButton
          variant="outlined"
          btnText="Clear Employee Filter"
          onClick={resetFilter}
          startIcon={<FilterAltOffIcon />}
        />
      </EvoHBox> */}
    </EvoHBox>
  );
};

export default Actions;
