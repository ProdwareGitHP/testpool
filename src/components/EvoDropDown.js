import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import EvoErrorBoundary from "./EvoErrorBoundary";

const Dropdown = ({
  data,
  caller,
  month,
  getoptionlabelkey,
  width,
  disabled,
  selectIndex,
  showEmpty,
  autoFocus,
}) => {
  // const data = showEmpty
  //   ? [{ id: 0, label: "select", value: "0" }, ...data]
  //   : [...data];

  const [selectedItem, setSelected] = useState(
    data && data.length && selectIndex > -1 ? data[selectIndex] : {}
  );

  useEffect(() => {
    if (data && data.length > 0 && selectIndex > -1) {
      onChange(data[selectIndex]);
    }
  }, [data]);

  useEffect(() => {
    if (month) {
      if (month != selectedItem) {
        setSelected(month);
      }
    } else {
      setSelected(null);
    }
  }, [month]);

  function onChange(item) {
    setSelected(item);
    caller(item);
  }
  // data = [{}, ...data];
  return (
    <EvoErrorBoundary>
      <Select
        style={{ height: 28, width: width }}
        size="small"
        disabled={disabled}
        value={selectedItem}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
      >
        {data?.map((item) => {
          let isDisabled = item?.disabled;
          return (
            <MenuItem
              key={getoptionlabelkey ? item[getoptionlabelkey] : item}
              value={item}
              disabled={isDisabled}
              sx={isDisabled ? { color: "red", fontWeight: "bold" } : {}}
            >
              {getoptionlabelkey ? item[getoptionlabelkey] : item}
            </MenuItem>
          );
        })}
      </Select>
    </EvoErrorBoundary>
  );
};
Dropdown.defaultProps = {
  disabled: false,
  showEmpty: false,
};
export default Dropdown;
