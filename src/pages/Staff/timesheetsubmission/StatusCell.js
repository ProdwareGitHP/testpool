import { Box, Typography } from "@mui/material";
import { EvoHBox } from "../../../components/EvoBox";

const apprColors = {
  N: "rgb(255, 205, 210)",
  P: "rgb(255, 224, 130)",
  A: "rgb(200, 230, 201)",
};

const StatusCell = ({ row, column }) => {
  return (
    <EvoHBox divider gap={0.1}>
      {row.days.map((day) => (
        <>
          <Box
            style={{
              width: column.cellWidth,
              height: "35px",
              display: "flex",
              alignItems: "center ",
              justifyContent: "right",
              paddingRight: "4px",
              backgroundColor: apprColors[day.status],
            }}
          >
            <Typography noWrap style={{ fontSize: "14px", textAlign: "right" }}>
              {day.value || ""}
            </Typography>
          </Box>
        </>
      ))}
    </EvoHBox>
  );
};

export default StatusCell;
