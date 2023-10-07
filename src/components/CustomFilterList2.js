import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import { CustomFilterModal } from "./CustomFilterModal";
import { FilterToggleButton } from "./FilterToggleButton";
import { EvoHBox } from "./EvoBox";

const CustomFilterList = (props) => {
  const { filterButtons, oriPagedata, setFilter, filter, isTab } = props;
  console.log("oriPagedata", props);

  const [modalData, setModelData] = useState(null);

  const [toggle, setToggle] = useState(false);

  const onClear = () => setFilter({});
  const onFilter = (newFilter) => setFilter({ ...filter, ...newFilter });

  return (
    <Box>
      <Grid container>
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
      </Grid>
      {toggle && (
        <CustomFilterModal
          modalData={modalData}
          oriPagedata={oriPagedata}
          togglerhandler={setToggle}
          onFilter={onFilter}
        />
      )}
    </Box>
  );
};

export default CustomFilterList;
