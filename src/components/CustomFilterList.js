import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import { CustomFilterModal } from "./CustomFilterModal";
import { FilterToggleButton } from "./FilterToggleButton";
import { EvoHBox } from "./EvoBox";

const CustomFilterList = (props) => {
  const { filterButtons, oriPagedata, setFilter, filter, onClearFilter } =
    props;

  const [modalData, setModelData] = useState(null);
  const [toggle, setToggle] = useState(false);

  const onClear = () => {
    setFilter({});
    onClearFilter();
  };

  const onFilter = (newFilter) => {
    setFilter({
      ...newFilter,
    });
  };
  return (
    <Box>
      <EvoHBox>
        {filterButtons.map((item, index) => (
          <FilterToggleButton
            key={index}
            title={item.btnName}
            onClick={() => {
              setModelData(item);
              setToggle(true);
            }}
            isClear={filter?.hasOwnProperty(item.filterKey)}
          />
        ))}
        <FilterToggleButton
          onClick={onClear}
          isClear={Object.keys(filter || {}).length > 0}
        />
      </EvoHBox>
      {toggle && (
        <CustomFilterModal
          modalData={modalData}
          oriPagedata={oriPagedata}
          togglerhandler={setToggle}
          onFilter={onFilter}
          filter={filter}
        />
      )}
    </Box>
  );
};

export default CustomFilterList;
