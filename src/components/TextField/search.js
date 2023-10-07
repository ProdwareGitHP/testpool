import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { CustomTextField } from ".";
import { IconButton } from "@mui/material";

export const SearchTextField = (props) => {
  const { onSearch, onChange, value, readOnlyValue } = props;
  const generateButton = () => {
    if (readOnlyValue) {
      return (
        <IconButton disabled sx={{ padding: 0 }}>
          <SearchIcon onClick={onSearch} />
        </IconButton>
      );
    } else {
      return <SearchIcon onClick={onSearch} />;
    }
  };

  return (
    <CustomTextField
      width="200px"
      {...props}
      value={value}
      onChange={onChange}
      endIconButton={generateButton()}
    />
  );
};
