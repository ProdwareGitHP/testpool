import { Box, Typography } from "@mui/material";
import { EvoHBox } from "../../../components/EvoBox";
import { parseFloatValue } from "../../../utils/commonService";

const HoursCell = ({ row, column }) => {
  let hourCell = row[column.key];

  return (
    <EvoHBox divider gap={0.5}>
      {column.cells.map((cell, index) => {
        return (
          <Box
            style={{
              width: column.cellWidth,
              height: "35px",
              display: "flex",
              alignItems: "center ",
              justifyContent: "right",
            }}
          >
            <Typography noWrap style={{ fontSize: "14px", textAlign: "right" }}>
              {hourCell[cell]}
            </Typography>
          </Box>
        );
      })}
    </EvoHBox>
  );
};

export default HoursCell;
