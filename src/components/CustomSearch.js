import { Typography } from "@mui/material";
import { useState } from "react";
import { EvoHBox } from "./EvoBox";
import { EvoButton } from "./EvoButton";
import { CustomTextField } from "./TextField";
import { EvoDataForm } from "./EvoDataForm";

const CustomSearch = (props) => {
  let { columns, data, setFilterData, setSnakeBarProps } = props;
  const characterLimit = 50;
  var queryStates = {};
  columns.map((item) => {
    queryStates[item.key] = "";
    if (item.type === "lookup") {
      let {
        editorProps: { selectItem, columnKey },
      } = item;
      let onChange = (obj) => {
        selectItem(obj);
        let value = columnKey in obj ? obj[columnKey] : "";

        handleSearchQueries(item.key, value);
      };
      item.editorProps.selectItem = onChange;
      item.editorProps.reset = () => selectItem({});
    }
  });
  const [queries, setQueries] = useState(queryStates);
  const handleSearchQueries = (id, value) => {
    if (value.length <= characterLimit) {
      setQueries({ ...queries, [id]: value });
    } else {
      setSnakeBarProps({
        msz: "Character Limit Exceeded.",
        type: "error",
      });
    }
  };

  const filterQuery = (item, queryValue, key) => {
    if (queryValue != "") {
      if (key in item && item[key]) {
        if (
          item[key].toString().toLowerCase().includes(queryValue.toLowerCase())
        ) {
          return item;
        }
      }
    } else {
      return item;
    }
  };

  const searchFilter = () => {
    var dumm = [];
    dumm = [...data];
    columns.map((field) => {
      const { key } = field;
      dumm = dumm.filter((item) => filterQuery(item, queries[key], key));
    });
    setFilterData(dumm);
  };

  const resetAllLookupStates = () => {
    columns?.map((item) => {
      item?.editorProps?.reset();
    });
  };
  const resetFilter = () => {
    setFilterData(data);
    setQueries(queryStates);
    resetAllLookupStates();
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      searchFilter();
    }
  };

  return (
    <EvoHBox divider style={{ padding: "0px 10px" }}>
      {columns.map((item, index) => {
        return (
          <EvoHBox key={index}>
            <Typography
              style={{
                fontSize: "14px",
                fontFamily: "Inter",
                whiteSpace: "nowrap",
                textAlign: "right",
                fontWeight: "bold",
                textOverflow: "ellipsis",
              }}
            >
              {item.name}
            </Typography>
            {item.type === "lookup" ? (
              <EvoDataForm
                formData={{
                  item: item,
                }}
              />
            ) : (
              <CustomTextField
                value={queries[item.key]}
                onChange={(e) => handleSearchQueries(item.key, e.target.value)}
                onKeyDown={onKeyDown}
                style={{}}
                maxLength={item.maxLength}
              />
            )}
          </EvoHBox>
        );
      })}

      <EvoHBox>
        <EvoButton btnText="Search" onClick={searchFilter} />
        <EvoButton btnText="Reset" variant="outlined" onClick={resetFilter} />
      </EvoHBox>
    </EvoHBox>
  );
};
CustomSearch.defaultProps = { isVisible: true };
export default CustomSearch;
