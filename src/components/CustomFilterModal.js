import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { uniqueArrByKey } from "../pages/contants";
import * as hooksApi from "../services/api.hooks";
import * as servicesApi from "../services/api";
import * as selfServicesApi from "../services/selfservice";
import * as rostersApi from "../services/roster";
import * as rostersApi1 from "../services/rosterapi";
import * as rosterSettingsApi from "../services/rostersettings";
import * as accessControlApi from "../services/accesscontrol";

import EvoDataGrid from "./EvoDataGrid";
import { CustomDialog } from "./CustomDialog";
import CustomSearch from "./CustomSearch";
import { EvoVBox } from "./EvoBox";

const api = {
  ...hooksApi,
  ...selfServicesApi,
  ...servicesApi,
  ...rostersApi,
  ...rostersApi1,
  ...rosterSettingsApi,
  ...accessControlApi,
};
const useLocalQuery = (modalData, oriPagedata) => {
  const { methodName, rows, filterKey, params, select, disable } = modalData;

  if (methodName && api[methodName]) {
    return api[methodName](params, select, disable); //TODO -params
  }

  if (rows) {
    return { data: rows, isLoading: false };
  }

  if (oriPagedata) {
    return { data: uniqueArrByKey(oriPagedata, filterKey), isLoading: false };
  }
};

const CustomSearchDataGrid = ({
  modalData,
  oriPagedata,
  isSingleSelection,
  selectedRows,
  setSelectedRows,
  data,
  setSnakeBarProps,
}) => {
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    if (data) {
      setFilterData(data);
    }
  }, [data]);

  const searchColumns = modalData.columns.filter((c) => !c.excludeFromSearch);
  const gridColumns = modalData.columns.filter((c) => !c.excludeFromColumns);
  return (
    <EvoVBox>
      <CustomSearch
        columns={searchColumns}
        data={data}
        setFilterData={setFilterData}
        filterData={filterData}
        setSnakeBarProps={setSnakeBarProps}
      />

      <EvoDataGrid
        isSingleSelection={isSingleSelection}
        filterId={modalData.filterKey}
        columns={gridColumns}
        rows={filterData}
        height={250}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        addSelectColumn
      />
    </EvoVBox>
  );
};

export const CustomFilterModal = (props) => {
  const {
    togglerhandler,
    onFilter = () => {},
    modalData,
    oriPagedata,
    onSelect,
    type,
    filter = [],
  } = props;

  const { data, isLoading } = useLocalQuery(modalData, oriPagedata);
  const [selectedRows, setSelectedRows] = useState(
    new Set(filter[modalData.filterKey])
  );
  const [snakeBarProps, setSnakeBarProps] = useState({});
  const handleClose = () => {
    togglerhandler(false);
  };
  const filterclickhandler = () => {
    if (selectedRows && selectedRows.size > 0) {
      let filterData = {};
      filterData[modalData.filterKey] = selectedRows;
      onFilter({ ...filter, ...filterData });
    } else {
      let dupFilter = { ...filter };
      delete dupFilter[modalData.filterKey];
      onFilter(dupFilter);
    }
    togglerhandler(false);
  };

  var actions = {};
  actions =
    type === "searchBox"
      ? {
          onSelect: () => {
            var arr = Array.from(selectedRows);
            var key = modalData.filterKey;
            var id = arr.length == 1 ? arr[0] : "";
            var selectedItem = data?.find((item) => item[key] === id);
            onSelect(selectedItem ? selectedItem : {});
            filterclickhandler();
          },
        }
      : { onFilter: filterclickhandler };
  return (
    <CustomDialog
      maxWidth="md"
      title={`${modalData.btnName}`}
      open="true"
      handleClose={handleClose}
      actions={actions}
      isLoading={isLoading}
      snakeBarProps={snakeBarProps}
      setSnakeBarProps={setSnakeBarProps}
    >
      <CustomSearchDataGrid
        modalData={modalData}
        oriPagedata={oriPagedata}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        isSingleSelection={type}
        data={data}
        setSnakeBarProps={setSnakeBarProps}
      />
    </CustomDialog>
  );
};
CustomFilterModal.defaultProps = {
  isCustomDialog: true,
};
