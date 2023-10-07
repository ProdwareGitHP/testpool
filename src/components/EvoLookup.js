import { useState } from "react";
import { CustomFilterModal } from "./CustomFilterModal";
import { SearchTextField } from "./TextField/search";
import { Box } from "@mui/system";

const EvoLookup = ({
  template,
  item,
  selectItem,
  columnKey,
  oriPagedata,
  readOnlyValue,
  width,
}) => {
  const [toggle, setToggle] = useState(false);
  let selectedValue = new Set();
  if (item != undefined) {
    selectedValue.add(item[template?.filterKey]);
  }
  const [filter, setFilter] = useState({
    [template?.filterKey]: selectedValue,
  });
  const onFilter = (newFilter) => {
    setFilter({
      ...filter,
      ...newFilter,
    });
  };
  const generateReadOnlyBoolean = () => {
    if (!readOnlyValue) return false;

    if (typeof readOnlyValue === "function") {
      const bool = readOnlyValue(item);

      return bool;
    }

    return readOnlyValue;
  };
  return (
    <>
      <Box >
        <SearchTextField
          width={width}
          readOnlyValue={generateReadOnlyBoolean()}
          value={
            item && Object.keys(item)?.length != 0 && columnKey in item
              ? item[columnKey]
              : ""
          }
          onSearch={() => setToggle(true)}
        />
      </Box>
      {toggle && (
        <CustomFilterModal
          modalData={template}
          onSelect={selectItem}
          togglerhandler={setToggle}
          type={"searchBox"}
          oriPagedata={oriPagedata}
          onFilter={onFilter}
          filter={filter}
        />
      )}
    </>
  );
};
export default EvoLookup;
