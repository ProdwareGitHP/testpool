import React from "react";
import Select from "@mui/material/Select";
import { Box } from "@mui/material";

const titles = ["Dr.", "Mr.", "Mrs.", "Miss", "Ms."];

function Dropdown({ row, onRowChange }) {
  return (
    <Box style={{ margin: "0px 10px" }}>
      <Select
        //   className={textEditorClassname}
        value={row?.title}
        onChange={(event) =>
          onRowChange({ ...row, title: event.target.value }, true)
        }
        autoFocus
      >
        {titles.map((title) => (
          <option key={title} value={title}>
            {title}
          </option>
        ))}
      </Select>
    </Box>
  );
}

export default Dropdown;
